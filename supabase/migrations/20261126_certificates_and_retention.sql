-- ==============================================================================
-- AzurLearn — Verifiable Completion Certificates & Public Verification RPC
-- Migration Version: 20261126_certificates_and_retention
-- ==============================================================================

create table if not exists public.user_certificates (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  recipient_name text not null,
  track_id text not null,
  track_title text not null,
  lessons_completed integer not null check (lessons_completed >= 0),
  total_lessons integer not null check (total_lessons > 0),
  score_pct integer not null default 100 check (score_pct >= 0 and score_pct <= 100),
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, track_id)
);

create index if not exists idx_user_certificates_user_id on public.user_certificates(user_id);

alter table public.user_certificates enable row level security;

drop policy if exists "Users can view own certificates" on public.user_certificates;
create policy "Users can view own certificates"
  on public.user_certificates
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own certificates" on public.user_certificates;
create policy "Users can insert own certificates"
  on public.user_certificates
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Public verification RPC returning strictly non-sensitive credential metadata (no user_id/email)
create or replace function public.verify_certificate_by_id(cert_id text)
returns table (
  id text,
  recipient_name text,
  track_id text,
  track_title text,
  lessons_completed integer,
  total_lessons integer,
  score_pct integer,
  issued_at timestamp with time zone
)
security definer
set search_path = public, pg_temp
language sql
stable
as $$
  select
    c.id,
    c.recipient_name,
    c.track_id,
    c.track_title,
    c.lessons_completed,
    c.total_lessons,
    c.score_pct,
    c.issued_at
  from public.user_certificates c
  where c.id = cert_id
  limit 1;
$$;

grant execute on function public.verify_certificate_by_id(text) to anon, authenticated;
