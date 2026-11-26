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
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  -- If role is being changed
  if (NEW.role is distinct from OLD.role) then
    -- Only allow if called by postgres/supabase_admin or service_role
    if (current_user not in ('postgres', 'supabase_admin') and auth.jwt() ->> 'role' is distinct from 'service_role') then
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

-- ==============================================================================
-- 8. Future Paid Plans & User Entitlements Schema
-- ==============================================================================

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

  -- Allow auto-provisioning the default 'free' active tier on initial user creation
  if (TG_OP = 'INSERT' and NEW.tier = 'free' and NEW.status in ('active', 'trialing')) then
    NEW.updated_at = timezone('utc'::text, now());
    return NEW;
  end if;

  -- Strictly forbid clients from self-granting paid tiers or updating entitlement rows
  raise exception 'Unauthorized: Entitlements cannot be modified directly by client sessions.';
end;
$$;

drop trigger if exists on_entitlement_tampering_protection on public.user_entitlements;
create trigger on_entitlement_tampering_protection
  before insert or update on public.user_entitlements
  for each row
  execute procedure public.prevent_entitlement_tampering();

-- Auto-provision free entitlement record upon new user signup
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
exception
  when others then
    raise warning 'Error auto-provisioning free entitlement for user %: %', new.id, sqlerrm;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created_entitlement on auth.users;
create trigger on_auth_user_created_entitlement
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_entitlement();

-- ==============================================================================
-- 9. Track Entitlements, Products & Razorpay Payments Schema
-- ==============================================================================

-- 1. Create product_catalog table
create table if not exists public.product_catalog (
  id text primary key,
  track_id text not null,
  track_title text not null,
  billing_type text not null check (billing_type in ('one_time', 'monthly_subscription')),
  amount_paise integer,
  currency text not null default 'INR' check (currency = 'INR'),
  is_active boolean not null default false,
  razorpay_plan_id text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create payment_orders table (One-time Lifetime Orders)
create table if not exists public.payment_orders (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id text not null,
  product_id text not null references public.product_catalog(id) on delete restrict,
  amount_paise integer not null,
  currency text not null default 'INR' check (currency = 'INR'),
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  status text not null default 'created' check (status in ('created', 'attempted', 'paid', 'failed', 'refunded')),
  notes jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  verified_at timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create payment_subscriptions table (Monthly Renewable Subscriptions)
create table if not exists public.payment_subscriptions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id text not null,
  product_id text not null references public.product_catalog(id) on delete restrict,
  razorpay_subscription_id text unique not null,
  razorpay_plan_id text not null,
  status text not null default 'created' check (status in ('created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'completed', 'expired')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  cancelled_at timestamp with time zone,
  notes jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create payment_transactions table (Provider Capture / Refund Transactions)
create table if not exists public.payment_transactions (
  id text primary key,
  order_id text references public.payment_orders(id) on delete set null,
  subscription_id text references public.payment_subscriptions(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount_paise integer not null,
  currency text not null default 'INR' check (currency = 'INR'),
  status text not null check (status in ('captured', 'failed', 'refunded')),
  method text,
  error_code text,
  error_description text,
  raw_event jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create payment_webhook_events table (Idempotency Ledger)
create table if not exists public.payment_webhook_events (
  id text primary key,
  event_type text not null,
  status text not null default 'processed' check (status in ('received', 'processed', 'failed', 'ignored')),
  error_message text,
  payload jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  processed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create track_entitlements table (Per-Track Access Control Grants)
create table if not exists public.track_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id text not null,
  source_type text not null check (source_type in ('free_tier', 'lifetime_purchase', 'monthly_subscription', 'owner_grant')),
  order_id text references public.payment_orders(id) on delete set null,
  subscription_id text references public.payment_subscriptions(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'expired', 'cancelled')),
  valid_from timestamp with time zone default timezone('utc'::text, now()) not null,
  valid_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint uq_user_track_source unique (user_id, track_id, source_type)
);

-- 7. Performance & Query Indexes
create index if not exists idx_payment_orders_user_id on public.payment_orders(user_id);
create index if not exists idx_payment_orders_track_id on public.payment_orders(track_id);
create index if not exists idx_payment_orders_rzp_order on public.payment_orders(razorpay_order_id);

create index if not exists idx_payment_subscriptions_user_id on public.payment_subscriptions(user_id);
create index if not exists idx_payment_subscriptions_track_id on public.payment_subscriptions(track_id);
create index if not exists idx_payment_subscriptions_rzp_sub on public.payment_subscriptions(razorpay_subscription_id);

create index if not exists idx_payment_transactions_user_id on public.payment_transactions(user_id);
create index if not exists idx_payment_transactions_order_id on public.payment_transactions(order_id);

create index if not exists idx_track_entitlements_user_track on public.track_entitlements(user_id, track_id, status);
create index if not exists idx_track_entitlements_valid_until on public.track_entitlements(valid_until);

-- 8. Enable Row Level Security (RLS) on all tables
alter table public.product_catalog enable row level security;
alter table public.payment_orders enable row level security;
alter table public.payment_subscriptions enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.payment_webhook_events enable row level security;
alter table public.track_entitlements enable row level security;

-- 9. RLS Policies
-- product_catalog: Read-only for all authenticated & anonymous users
drop policy if exists "Anyone can view product catalog" on public.product_catalog;
create policy "Anyone can view product catalog"
  on public.product_catalog
  for select
  using (true);

-- payment_orders: Users can view own orders only
drop policy if exists "Users can view own payment orders" on public.payment_orders;
create policy "Users can view own payment orders"
  on public.payment_orders
  for select
  to authenticated
  using (auth.uid() = user_id);

-- payment_subscriptions: Users can view own subscriptions only
drop policy if exists "Users can view own payment subscriptions" on public.payment_subscriptions;
create policy "Users can view own payment subscriptions"
  on public.payment_subscriptions
  for select
  to authenticated
  using (auth.uid() = user_id);

-- payment_transactions: Users can view own transactions only
drop policy if exists "Users can view own payment transactions" on public.payment_transactions;
create policy "Users can view own payment transactions"
  on public.payment_transactions
  for select
  to authenticated
  using (auth.uid() = user_id);

-- track_entitlements: Users can view own entitlements only
drop policy if exists "Users can view own track entitlements" on public.track_entitlements;
create policy "Users can view own track entitlements"
  on public.track_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

-- 10. Anti-Tampering Trigger Function
create or replace function public.prevent_payment_tampering()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  if (current_user not in ('postgres', 'supabase_admin') and (auth.jwt() ->> 'role') is distinct from 'service_role') then
    raise exception 'Unauthorized: Payment and entitlement records can only be modified by secure server-side services.';
  end if;
  NEW.updated_at = timezone('utc'::text, now());
  return NEW;
end;
$$;

drop trigger if exists on_payment_orders_tamper on public.payment_orders;
create trigger on_payment_orders_tamper
  before insert or update or delete on public.payment_orders
  for each row
  execute procedure public.prevent_payment_tampering();

drop trigger if exists on_payment_subscriptions_tamper on public.payment_subscriptions;
create trigger on_payment_subscriptions_tamper
  before insert or update or delete on public.payment_subscriptions
  for each row
  execute procedure public.prevent_payment_tampering();

drop trigger if exists on_payment_transactions_tamper on public.payment_transactions;
create trigger on_payment_transactions_tamper
  before insert or update or delete on public.payment_transactions
  for each row
  execute procedure public.prevent_payment_tampering();

drop trigger if exists on_track_entitlements_tamper on public.track_entitlements;
create trigger on_track_entitlements_tamper
  before insert or update or delete on public.track_entitlements
  for each row
  execute procedure public.prevent_payment_tampering();

-- 11. Initial Product Catalog Seeding for All-Courses Plans (Safe Upsert)
insert into public.product_catalog (id, track_id, track_title, billing_type, amount_paise, currency, is_active, description)
values 
  ('all_courses_lifetime', 'all', 'All Courses (Lifetime Pass)', 'one_time', 39900, 'INR', true, 'Permanent lifetime access to all 13 curriculum tracks, 131 modules, 417 lessons, interactive visualizers, and AI Tutor.'),
  ('all_courses_monthly', 'all', 'All Courses (Monthly Plan)', 'monthly_subscription', 9900, 'INR', true, 'Flexible monthly subscription to all 13 curriculum tracks, 131 modules, 417 lessons, interactive visualizers, and AI Tutor.')
on conflict (id) do update set
  amount_paise = excluded.amount_paise,
  is_active = excluded.is_active,
  description = excluded.description,
  updated_at = timezone('utc'::text, now());

-- ==============================================================================
-- 12. Cross-Device User Learning Progress & Notes Sync
-- ==============================================================================

create table if not exists public.user_learning_progress (
  user_id uuid references auth.users(id) on delete cascade primary key,
  completed_lessons jsonb not null default '{}'::jsonb,
  bookmarks jsonb not null default '[]'::jsonb,
  notes jsonb not null default '{}'::jsonb,
  quiz_scores jsonb not null default '{}'::jsonb,
  streak jsonb not null default '{"currentStreak": 1, "longestStreak": 1, "lastActiveDate": ""}'::jsonb,
  total_minutes_learned integer not null default 0 check (total_minutes_learned >= 0),
  weak_topics jsonb not null default '[]'::jsonb,
  revision_state jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_learning_progress enable row level security;

drop policy if exists "Users can view own learning progress" on public.user_learning_progress;
create policy "Users can view own learning progress"
  on public.user_learning_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own learning progress" on public.user_learning_progress;
create policy "Users can insert own learning progress"
  on public.user_learning_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own learning progress" on public.user_learning_progress;
create policy "Users can update own learning progress"
  on public.user_learning_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.touch_user_learning_progress_updated_at()
returns trigger
security definer
set search_path = public, pg_temp
language plpgsql
as $$
begin
  NEW.updated_at = timezone('utc'::text, now());
  return NEW;
end;
$$;

drop trigger if exists on_user_learning_progress_updated on public.user_learning_progress;
create trigger on_user_learning_progress_updated
  before update on public.user_learning_progress
  for each row
  execute procedure public.touch_user_learning_progress_updated_at();





