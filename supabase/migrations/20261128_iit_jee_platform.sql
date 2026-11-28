-- ==============================================================================
-- AzurLearn — IIT JEE (Main & Advanced) Platform Schema & Strict RLS Policies
-- Migration Version: 20261128_iit_jee_platform
-- ==============================================================================

-- 1. User IIT JEE Learning Progress, Notes, Attempts, SM-2 & Revision Planner
create table if not exists public.iit_user_progress (
  user_id uuid references auth.users(id) on delete cascade primary key,
  target_exam text not null default 'Both' check (target_exam in ('JEE Main', 'JEE Advanced', 'Both')),
  student_profile text not null default 'Class 12' check (student_profile in ('Class 11', 'Class 12', 'Dropper', 'Crash Revision')),
  completed_lessons jsonb not null default '{}'::jsonb,
  completed_chapters jsonb not null default '{}'::jsonb,
  bookmarked_chapters jsonb not null default '[]'::jsonb,
  bookmarked_questions jsonb not null default '[]'::jsonb,
  personal_notes jsonb not null default '{}'::jsonb,
  attempts jsonb not null default '[]'::jsonb,
  mock_test_results jsonb not null default '[]'::jsonb,
  flashcard_reviews jsonb not null default '{}'::jsonb,
  study_sessions jsonb not null default '[]'::jsonb,
  activity_dates jsonb not null default '[]'::jsonb,
  revision_tasks jsonb not null default '[]'::jsonb,
  last_visited jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.iit_user_progress enable row level security;

drop policy if exists "Users can view own iit progress" on public.iit_user_progress;
create policy "Users can view own iit progress"
  on public.iit_user_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own iit progress" on public.iit_user_progress;
create policy "Users can insert own iit progress"
  on public.iit_user_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own iit progress" on public.iit_user_progress;
create policy "Users can update own iit progress"
  on public.iit_user_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 2. Normalized IIT Mock Test Attempts Ledger (for fast analytics queries)
create table if not exists public.iit_mock_test_attempts (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  test_id text not null,
  title text not null,
  exam_pattern text not null check (exam_pattern in ('JEE Main', 'JEE Advanced')),
  score numeric(8,2) not null,
  max_score numeric(8,2) not null,
  correct_count integer not null default 0,
  incorrect_count integer not null default 0,
  unattempted_count integer not null default 0,
  accuracy_pct integer not null default 0 check (accuracy_pct >= 0 and accuracy_pct <= 100),
  time_taken_sec integer not null default 0,
  subject_breakdown jsonb not null default '[]'::jsonb,
  submitted_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_iit_mock_attempts_user on public.iit_mock_test_attempts(user_id, submitted_at desc);

alter table public.iit_mock_test_attempts enable row level security;

drop policy if exists "Users can view own iit mock attempts" on public.iit_mock_test_attempts;
create policy "Users can view own iit mock attempts"
  on public.iit_mock_test_attempts
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own iit mock attempts" on public.iit_mock_test_attempts;
create policy "Users can insert own iit mock attempts"
  on public.iit_mock_test_attempts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- 3. Extend tutor_conversations track check constraint to support IIT JEE & Medical tracks
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_schema = 'public'
      and table_name = 'tutor_conversations'
      and constraint_name = 'tutor_conversations_track_check'
  ) then
    alter table public.tutor_conversations drop constraint tutor_conversations_track_check;
  end if;
exception when undefined_table then
  null;
end $$;

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'tutor_conversations'
  ) then
    alter table public.tutor_conversations
      add constraint tutor_conversations_track_check
      check (track in (
        'ml', 'dsa', 'python', 'java', 'general',
        'medical', 'mbbs-preclinical', 'mbbs-paraclinical', 'mbbs-clinical',
        'iit', 'iit-physics', 'iit-chemistry', 'iit-maths'
      ));
  end if;
end $$;
