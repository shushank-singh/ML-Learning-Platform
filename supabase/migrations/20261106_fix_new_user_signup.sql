-- ==============================================================================
-- AzurLearn — Fix Supabase New User Signup Database Error & Missing Profiles
-- Migration Version: 20261106_fix_new_user_signup
--
-- Verified Database State:
-- 1. public.user_entitlements exists (user_id, tier, status, valid_until, created_at, updated_at).
-- 2. public.profiles is missing.
-- 3. Only on_auth_user_created_entitlement was attached to auth.users.
-- 4. handle_new_user_entitlement() inserts default 'free' entitlement.
-- 5. prevent_entitlement_tampering() blocked non-service_role JWTs, rolling back
--    GoTrue's user signup transaction with: "Database error saving new user".
--
-- Actions in This Migration:
-- 1. Create public.profiles table matching application schema expectations.
-- 2. Enable RLS and configure policies for public.profiles and public.user_entitlements.
-- 3. Update prevent_entitlement_tampering() to permit initial 'free' active tier auto-provisioning.
-- 4. Attach handle_new_user_entitlement() with explicit search_path and clean trigger registration.
-- 5. Create handle_new_user() and attach missing on_auth_user_created trigger on auth.users.
-- 6. Attach prevent_role_tampering() trigger to prevent non-superusers from elevating roles.
-- 7. Define is_owner() and is_admin() security definer helper functions.
-- 8. Backfill any existing auth.users missing from public.profiles and public.user_entitlements.
-- 9. Explicit grants to anon, authenticated, and service_role.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Create public.profiles Table
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'owner', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure RLS is enabled
alter table public.profiles enable row level security;

-- ------------------------------------------------------------------------------
-- 2. Configure Profiles RLS Policies
-- ------------------------------------------------------------------------------
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 3. Verify public.user_entitlements Table & RLS
-- ------------------------------------------------------------------------------
create table if not exists public.user_entitlements (
  user_id uuid references auth.users(id) on delete cascade primary key,
  tier text not null default 'free' check (tier in ('free', 'premium', 'all_access', 'owner')),
  status text not null default 'active' check (status in ('active', 'canceled', 'expired', 'trialing')),
  valid_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_entitlements enable row level security;

drop policy if exists "Users can view own entitlements" on public.user_entitlements;
create policy "Users can view own entitlements"
  on public.user_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 4. Update Entitlement Anti-Tampering Trigger
--    Permits auto-provisioning the default 'free' active tier on initial signup,
--    while strictly forbidding client sessions from self-granting paid tiers or updating rows.
-- ------------------------------------------------------------------------------
create or replace function public.prevent_entitlement_tampering()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  -- Privileged database roles (postgres, supabase_admin, supabase_auth_admin) or service_role JWT
  if (current_user in ('postgres', 'supabase_admin', 'supabase_auth_admin') or (auth.jwt() ->> 'role') = 'service_role') then
    NEW.updated_at = timezone('utc'::text, now());
    return NEW;
  end if;

  -- Allow trusted auto-provisioning: default 'free' active tier on initial INSERT
  if (TG_OP = 'INSERT' and NEW.tier = 'free' and NEW.status in ('active', 'trialing')) then
    NEW.updated_at = timezone('utc'::text, now());
    return NEW;
  end if;

  -- Strictly forbid clients from self-granting paid tiers or modifying existing entitlement records
  raise exception 'Unauthorized: Entitlements cannot be modified directly by client sessions.';
end;
$$;

drop trigger if exists on_entitlement_tampering_protection on public.user_entitlements;
create trigger on_entitlement_tampering_protection
  before insert or update on public.user_entitlements
  for each row
  execute procedure public.prevent_entitlement_tampering();

-- ------------------------------------------------------------------------------
-- 5. Entitlement Auto-Provisioning on Signup Trigger Function
-- ------------------------------------------------------------------------------
create or replace function public.handle_new_user_entitlement()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  insert into public.user_entitlements (user_id, tier, status)
  values (new.id, 'free', 'active')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_entitlement on auth.users;
create trigger on_auth_user_created_entitlement
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_entitlement();

-- ------------------------------------------------------------------------------
-- 6. Profile Auto-Creation Trigger Function & Missing Trigger on auth.users
-- ------------------------------------------------------------------------------
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
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 7. Role Anti-Tampering Trigger for public.profiles
--    Prevents non-superusers from mutating their own or other users' roles
-- ------------------------------------------------------------------------------
create or replace function public.prevent_role_tampering()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  -- If role is being changed
  if (NEW.role is distinct from OLD.role) then
    -- Allow if called by postgres/supabase_admin (SQL Editor / migrations) or service_role
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

-- ------------------------------------------------------------------------------
-- 8. Helper Functions for Role Verification
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 9. Reliable Recovery & Backfill for Pre-Existing Users
--    Provisions missing profile and entitlement records for any users that
--    registered while public.profiles was missing or trigger was blocked.
-- ------------------------------------------------------------------------------
insert into public.profiles (id, full_name, email, avatar_url, role)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
  u.email,
  coalesce(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture', ''),
  'student'
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
)
on conflict (id) do nothing;

insert into public.user_entitlements (user_id, tier, status)
select
  u.id,
  'free',
  'active'
from auth.users u
where not exists (
  select 1 from public.user_entitlements e where e.user_id = u.id
)
on conflict (user_id) do nothing;

-- ------------------------------------------------------------------------------
-- 10. Explicit Grants for PostgREST & Application Roles
-- ------------------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;

grant select, update on table public.profiles to authenticated;
grant select on table public.profiles to anon;

grant select on table public.user_entitlements to authenticated;
