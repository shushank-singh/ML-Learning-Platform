-- ==============================================================================
-- AzurLearn — Track Entitlements, Products & Razorpay Payments Migration
-- Version: 20261106
-- Safe, repeatable, non-destructive migration with Row-Level Security (RLS)
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

-- payment_webhook_events: strictly internal, no client RLS policy (accessible only by service_role)

-- 10. Anti-Tampering Trigger Function
-- Ensures browser/client sessions can NEVER insert or modify orders, subscriptions, or entitlements directly
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
