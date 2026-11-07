-- ==============================================================================
-- AzurLearn — Future Paid Plans & Curriculum Entitlements Migration
-- Safe, repeatable, non-destructive migration
-- ==============================================================================

-- 1. Create Entitlements Table linked to auth.users
create table if not exists public.user_entitlements (
  user_id uuid references auth.users(id) on delete cascade primary key,
  tier text not null default 'free' check (tier in ('free', 'premium', 'all_access', 'owner')),
  status text not null default 'active' check (status in ('active', 'canceled', 'expired', 'trialing')),
  valid_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.user_entitlements enable row level security;

-- 3. RLS Policies
-- Authenticated users can view their own entitlement row
drop policy if exists "Users can view own entitlements" on public.user_entitlements;
create policy "Users can view own entitlements"
  on public.user_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

-- 4. Anti-Tamper Security Trigger: Strictly prevent clients from self-granting paid tiers
create or replace function public.prevent_entitlement_tampering()
returns trigger
security definer
set search_path = public, auth, pg_temp
language plpgsql
as $$
begin
  -- Allow privileged database accounts or service_role
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

-- 5. Auto-provision free entitlement record upon new user signup
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
