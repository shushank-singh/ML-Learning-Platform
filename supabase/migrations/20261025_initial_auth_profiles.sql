-- ==============================================================================
-- AzurLearn — Initial Auth & Profiles Schema Migration
-- Migration Version: 20261025_initial_auth_profiles
--
-- Establishes the foundational public.profiles table linked to auth.users,
-- Row-Level Security (RLS) policies, role protection trigger, and automatic
-- profile provisioning on auth.users registration.
-- ==============================================================================

-- 1. Create Profiles Table linked to auth.users
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'owner', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. RLS Policies
-- Users can only read their own profile row
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Users can update their own profile details (name, avatar), but NOT their role
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4. Security Trigger to Prevent Role Privilege Escalation
-- Prevents non-superusers from mutating their own or other users' roles
create or replace function public.prevent_role_tampering()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  -- If role is being changed
  if (NEW.role is distinct from OLD.role) then
    -- Allow if called by postgres/supabase_admin or service_role
    if (current_user not in ('postgres', 'supabase_admin', 'supabase_auth_admin') and auth.jwt() ->> 'role' is distinct from 'service_role') then
      raise exception 'Unauthorized: Users cannot modify their assigned role directly.';
    end if;
  end if;
  NEW.updated_at = timezone('utc'::text, now());
  return NEW;
end;
$$;

drop trigger if exists on_profile_role_protection on public.profiles;
create trigger on_profile_role_protection
  before update on public.profiles
  for each row
  execute procedure public.prevent_role_tampering();

-- 5. Auto-Create Profile on Signup Trigger
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
declare
  user_full_name text;
  user_avatar text;
begin
  user_full_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    ''
  );
  user_avatar := coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture',
    ''
  );

  insert into public.profiles (id, full_name, email, avatar_url, role)
  values (
    new.id,
    user_full_name,
    new.email,
    user_avatar,
    'student'
  )
  on conflict (id) do update
  set
    email = coalesce(excluded.email, public.profiles.email),
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    avatar_url = coalesce(nullif(excluded.avatar_url, ''), public.profiles.avatar_url),
    updated_at = timezone('utc'::text, now());

  return new;
exception
  when others then
    raise warning 'Error auto-creating profile for user %: %', new.id, sqlerrm;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- 6. Helper Functions for Role Verification
create or replace function public.is_owner()
returns boolean
security definer
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'owner'
  );
$$;

create or replace function public.is_admin()
returns boolean
security definer
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and (role = 'owner' or role = 'admin')
  );
$$;
