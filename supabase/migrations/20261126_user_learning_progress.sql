-- ==============================================================================
-- AzurLearn — Cross-Device Learning Progress & Notes Sync Migration
-- Migration Version: 20261126_user_learning_progress
--
-- Stores per-user completed lessons, bookmarks, personal notes, quiz scores,
-- study streak, total minutes learned, weak topics, and revision progress.
-- Protected by strict Row-Level Security (RLS) scoped to auth.uid() = user_id.
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
