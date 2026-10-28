-- ==============================================================================
-- ML Mastery Lab — Supabase Auth & Profile Schema with RLS
-- ==============================================================================
-- Run this in the Supabase Dashboard -> SQL Editor

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

-- 4. Security Trigger to Prevent Privilege Escalation
-- Prevents non-superusers from mutating their own or other users' roles
create or replace function public.prevent_role_tampering()
returns trigger
security definer
language plpgsql
as $$
begin
  -- If role is being changed
  if (NEW.role is distinct from OLD.role) then
    -- Only allow if called by service_role (privileged backend or SQL Editor)
    if (auth.jwt() ->> 'role' is distinct from 'service_role') then
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
    email = excluded.email,
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

-- ==============================================================================
-- OWNER ROLE ASSIGNMENT INSTRUCTIONS:
-- After you create your account and confirm your email, run this single query
-- in the Supabase SQL Editor to grant yourself the Owner role:
--
-- UPDATE public.profiles
-- SET role = 'owner', updated_at = now()
-- WHERE email = 'your-email@example.com';
-- ==============================================================================

-- ==============================================================================
-- 7. AI Tutor Conversations & Messages (Zero-Cost Free Tier AI Tutor)
-- ==============================================================================

create table if not exists public.tutor_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New Conversation',
  track text not null check (track in ('ml', 'dsa', 'python', 'java', 'general')),
  module_id text,
  lesson_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.tutor_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.tutor_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'model', 'system')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_tutor_conversations_user_id on public.tutor_conversations(user_id);
create index if not exists idx_tutor_conversations_updated_at on public.tutor_conversations(updated_at desc);
create index if not exists idx_tutor_messages_conversation_id on public.tutor_messages(conversation_id);
create index if not exists idx_tutor_messages_user_id on public.tutor_messages(user_id);

alter table public.tutor_conversations enable row level security;
alter table public.tutor_messages enable row level security;

-- Policies for tutor_conversations
drop policy if exists "Users can view own tutor conversations" on public.tutor_conversations;
create policy "Users can view own tutor conversations"
  on public.tutor_conversations
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own tutor conversations" on public.tutor_conversations;
create policy "Users can insert own tutor conversations"
  on public.tutor_conversations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own tutor conversations" on public.tutor_conversations;
create policy "Users can update own tutor conversations"
  on public.tutor_conversations
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own tutor conversations" on public.tutor_conversations;
create policy "Users can delete own tutor conversations"
  on public.tutor_conversations
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Policies for tutor_messages
drop policy if exists "Users can view own tutor messages" on public.tutor_messages;
create policy "Users can view own tutor messages"
  on public.tutor_messages
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own tutor messages" on public.tutor_messages;
create policy "Users can insert own tutor messages"
  on public.tutor_messages
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own tutor messages" on public.tutor_messages;
create policy "Users can delete own tutor messages"
  on public.tutor_messages
  for delete
  to authenticated
  using (auth.uid() = user_id);


