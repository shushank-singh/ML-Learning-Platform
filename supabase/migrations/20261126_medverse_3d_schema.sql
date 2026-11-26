-- ==============================================================================
-- MedVerse 3D — Complete MBBS Medical Learning Schema & Strict RLS Policies
-- Migration Version: 20261126_medverse_3d_schema
--
-- Tables covered:
--   curriculum_versions, subjects, modules, topics, learning_objectives,
--   anatomy_assets, anatomical_structures, animations, animation_steps,
--   notes, references, questions, question_options, question_attempts,
--   flashcards, flashcard_reviews, bookmarks, learning_progress,
--   study_sessions, clinical_cases, content_reviews
--   (plus foreign key links to public.profiles and auth.users)
-- ==============================================================================

create extension if not exists pgcrypto;

-- Helper function for checking Admin/Owner authority in RLS policies
create or replace function public.is_medverse_editor()
returns boolean
security definer
set search_path = public, auth, pg_temp
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('admin', 'owner')
  );
$$;

-- 1. Curriculum Versions
create table if not exists public.curriculum_versions (
  id text primary key,
  name text not null,
  authority text not null default 'NMC CBME',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Subjects
create table if not exists public.subjects (
  id text primary key,
  curriculum_version_id text not null references public.curriculum_versions(id) on delete cascade,
  phase_id text not null,
  slug text not null unique,
  title text not null,
  short_code text not null,
  department_type text not null check (department_type in ('preclinical', 'paraclinical', 'clinical', 'allied')),
  nmc_code_range text,
  description text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_subjects_phase on public.subjects(phase_id, display_order);

-- 3. Modules (Organ Systems)
create table if not exists public.modules (
  id text primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  title text not null,
  organ_system text not null,
  description text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_modules_subject on public.modules(subject_id, display_order);

-- 4. Anatomy Assets (Licensed GLB / Educational Schematics)
create table if not exists public.anatomy_assets (
  id text primary key,
  title text not null,
  kind text not null check (kind in ('glb_anatomical', 'educational_schematic')),
  storage_path text,
  public_url text,
  source text not null,
  license text not null,
  license_url text not null,
  attribution_text text not null,
  file_format text not null,
  file_size_bytes bigint,
  limitations_note text not null default '',
  medical_review_status text not null default 'in_development'
    check (medical_review_status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. Anatomical Structures (Mesh-to-Metadata Registry)
create table if not exists public.anatomical_structures (
  id text primary key,
  asset_id text not null references public.anatomy_assets(id) on delete cascade,
  mesh_id text not null,
  fma_id text,
  standard_name text not null,
  source_name text not null,
  structure_group text not null,
  sub_group text,
  location text not null default '',
  anatomical_relationships jsonb not null default '[]'::jsonb,
  main_function text not null default '',
  clinical_correlations jsonb not null default '[]'::jsonb,
  limitations_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(asset_id, mesh_id)
);
create index if not exists idx_structures_asset on public.anatomical_structures(asset_id);

-- 6. Topics
create table if not exists public.topics (
  id text primary key,
  module_id text not null references public.modules(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  phase_id text not null,
  title text not null,
  subtitle text not null default '',
  status text not null default 'planned'
    check (status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  difficulty text not null default 'Foundational'
    check (difficulty in ('Foundational', 'Intermediate', 'Clinical')),
  estimated_minutes integer not null default 15 check (estimated_minutes > 0),
  asset_id text references public.anatomy_assets(id) on delete set null,
  focus_structure_ids jsonb not null default '[]'::jsonb,
  content_version text not null default '1.0.0',
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_topics_module_status on public.topics(module_id, status);
create index if not exists idx_topics_subject on public.topics(subject_id);

-- 7. Learning Objectives
create table if not exists public.learning_objectives (
  id uuid primary key default gen_random_uuid(),
  topic_id text not null references public.topics(id) on delete cascade,
  code text not null,
  statement text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists idx_objectives_topic on public.learning_objectives(topic_id);

-- 8. Scientific Animations
create table if not exists public.animations (
  id text primary key,
  topic_id text not null references public.topics(id) on delete cascade,
  asset_id text references public.anatomy_assets(id) on delete set null,
  title text not null,
  render_kind text not null,
  is_schematic boolean not null default false,
  simplification_notice text not null default '',
  duration_seconds numeric(6,2) not null default 24.0 check (duration_seconds > 0),
  status text not null default 'in_development'
    check (status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_animations_topic on public.animations(topic_id);

-- 9. Animation Steps
create table if not exists public.animation_steps (
  id text primary key,
  animation_id text not null references public.animations(id) on delete cascade,
  step_order integer not null,
  title text not null,
  caption text not null,
  explanation text not null,
  start_progress numeric(5,4) not null check (start_progress >= 0 and start_progress <= 1),
  end_progress numeric(5,4) not null check (end_progress >= 0 and end_progress <= 1),
  camera_position jsonb not null,
  camera_target jsonb not null,
  highlight_structure_ids jsonb not null default '[]'::jsonb,
  callout_label text,
  clinical_pearl text,
  unique(animation_id, step_order)
);

-- 10. Notes
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  topic_id text not null references public.topics(id) on delete cascade unique,
  version text not null default '1.0.0',
  status text not null default 'in_development'
    check (status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  sixty_second_summary jsonb not null default '[]'::jsonb,
  two_minute_revision jsonb not null default '{}'::jsonb,
  detailed_notes jsonb not null default '{}'::jsonb,
  author_id uuid references public.profiles(id) on delete set null,
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 11. References
create table if not exists public.references (
  id text primary key,
  topic_id text references public.topics(id) on delete cascade,
  structure_id text references public.anatomical_structures(id) on delete cascade,
  citation text not null,
  source_type text not null check (source_type in ('textbook', 'guideline', 'ontology', 'journal')),
  url text,
  created_at timestamptz not null default now()
);
create index if not exists idx_references_topic on public.references(topic_id);

-- 12. Questions
create table if not exists public.questions (
  id text primary key,
  topic_id text not null references public.topics(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  question_type text not null check (question_type in ('single_best_answer', 'structure_identification', 'clinical_vignette')),
  stem text not null,
  explanation text not null,
  linked_structure_id text references public.anatomical_structures(id) on delete set null,
  difficulty text not null default 'Foundational' check (difficulty in ('Foundational', 'Intermediate', 'Clinical')),
  source_label text not null default 'MedVerse Practice Item (Synthetic)',
  status text not null default 'published'
    check (status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_questions_topic on public.questions(topic_id);

-- 13. Question Options
create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id text not null references public.questions(id) on delete cascade,
  option_index integer not null check (option_index >= 0 and option_index <= 3),
  option_text text not null,
  is_correct boolean not null default false,
  unique(question_id, option_index)
);

-- 14. Question Attempts (Private User Data)
create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  topic_id text not null references public.topics(id) on delete cascade,
  selected_index integer not null check (selected_index >= 0 and selected_index <= 3),
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);
create index if not exists idx_attempts_user_topic on public.question_attempts(user_id, topic_id, answered_at desc);

-- 15. Flashcards
create table if not exists public.flashcards (
  id text primary key,
  topic_id text not null references public.topics(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  front text not null,
  back text not null,
  clinical_hint text,
  created_at timestamptz not null default now()
);
create index if not exists idx_flashcards_topic on public.flashcards(topic_id);

-- 16. Flashcard Reviews (SM-2 Spaced Repetition - Private User Data)
create table if not exists public.flashcard_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  flashcard_id text not null references public.flashcards(id) on delete cascade,
  ease_factor numeric(4,2) not null default 2.50,
  interval_days integer not null default 1 check (interval_days >= 1),
  repetitions integer not null default 0 check (repetitions >= 0),
  next_review_at timestamptz not null,
  last_reviewed_at timestamptz not null default now(),
  unique(user_id, flashcard_id)
);
create index if not exists idx_flashcard_reviews_due on public.flashcard_reviews(user_id, next_review_at);

-- 17. Bookmarks (Private User Data)
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('topic', 'structure', 'case')),
  target_id text not null,
  created_at timestamptz not null default now(),
  unique(user_id, target_type, target_id)
);
create index if not exists idx_bookmarks_user on public.bookmarks(user_id);

-- 18. Learning Progress (Private User Data)
create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null references public.topics(id) on delete cascade,
  completed boolean not null default false,
  completion_pct integer not null default 0 check (completion_pct >= 0 and completion_pct <= 100),
  last_visited_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(user_id, topic_id)
);
create index if not exists idx_learning_progress_user on public.learning_progress(user_id);

-- 19. Study Sessions (Private User Data)
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null references public.topics(id) on delete cascade,
  mode text not null check (mode in ('anatomy', 'animation', 'notes', 'quiz', 'case')),
  duration_seconds integer not null check (duration_seconds >= 0),
  recorded_at timestamptz not null default now()
);
create index if not exists idx_study_sessions_user on public.study_sessions(user_id, recorded_at desc);

-- 20. Clinical Cases (Synthetic Educational Scenarios)
create table if not exists public.clinical_cases (
  id text primary key,
  title text not null,
  subject_id text not null references public.subjects(id) on delete cascade,
  topic_id text not null references public.topics(id) on delete cascade,
  asset_id text references public.anatomy_assets(id) on delete set null,
  disclaimer text not null,
  scenario text not null,
  relevant_history jsonb not null default '[]'::jsonb,
  findings jsonb not null default '[]'::jsonb,
  differential_diagnosis jsonb not null default '[]'::jsonb,
  anatomy_physiology_link text not null,
  status text not null default 'in_development'
    check (status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 21. Content Reviews (Editorial & Medical Sign-off Audit Log)
create table if not exists public.content_reviews (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('topic', 'animation', 'note', 'question', 'clinical_case', 'asset')),
  entity_id text not null,
  reviewer_id uuid references public.profiles(id) on delete set null,
  previous_status text,
  new_status text not null check (new_status in ('planned', 'in_development', 'ready_for_review', 'medically_reviewed', 'published')),
  review_notes text,
  reviewed_at timestamptz not null default now()
);
create index if not exists idx_content_reviews_entity on public.content_reviews(entity_type, entity_id);

-- ==============================================================================
-- Enable Row Level Security (RLS) on All MedVerse Tables
-- ==============================================================================
alter table public.curriculum_versions enable row level security;
alter table public.subjects enable row level security;
alter table public.modules enable row level security;
alter table public.anatomy_assets enable row level security;
alter table public.anatomical_structures enable row level security;
alter table public.topics enable row level security;
alter table public.learning_objectives enable row level security;
alter table public.animations enable row level security;
alter table public.animation_steps enable row level security;
alter table public.notes enable row level security;
alter table public.references enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.question_attempts enable row level security;
alter table public.flashcards enable row level security;
alter table public.flashcard_reviews enable row level security;
alter table public.bookmarks enable row level security;
alter table public.learning_progress enable row level security;
alter table public.study_sessions enable row level security;
alter table public.clinical_cases enable row level security;
alter table public.content_reviews enable row level security;

-- Public Read Policies (Published Learning Content + Structural Catalog)
drop policy if exists "Public read active curriculum" on public.curriculum_versions;
create policy "Public read active curriculum" on public.curriculum_versions for select using (is_active = true or public.is_medverse_editor());

drop policy if exists "Public read subjects" on public.subjects;
create policy "Public read subjects" on public.subjects for select using (true);

drop policy if exists "Public read modules" on public.modules;
create policy "Public read modules" on public.modules for select using (true);

drop policy if exists "Public read published topics" on public.topics;
create policy "Public read published topics" on public.topics for select using (status = 'published' or public.is_medverse_editor());

drop policy if exists "Public read anatomy assets" on public.anatomy_assets;
create policy "Public read anatomy assets" on public.anatomy_assets for select using (medical_review_status = 'published' or public.is_medverse_editor());

drop policy if exists "Public read anatomical structures" on public.anatomical_structures;
create policy "Public read anatomical structures" on public.anatomical_structures for select using (true);

drop policy if exists "Public read objectives" on public.learning_objectives;
create policy "Public read objectives" on public.learning_objectives for select using (true);

drop policy if exists "Public read published animations" on public.animations;
create policy "Public read published animations" on public.animations for select using (status = 'published' or public.is_medverse_editor());

drop policy if exists "Public read animation steps" on public.animation_steps;
create policy "Public read animation steps" on public.animation_steps for select using (true);

drop policy if exists "Public read published notes" on public.notes;
create policy "Public read published notes" on public.notes for select using (status = 'published' or public.is_medverse_editor());

drop policy if exists "Public read references" on public.references;
create policy "Public read references" on public.references for select using (true);

drop policy if exists "Public read published questions" on public.questions;
create policy "Public read published questions" on public.questions for select using (status = 'published' or public.is_medverse_editor());

drop policy if exists "Public read question options" on public.question_options;
create policy "Public read question options" on public.question_options for select using (true);

drop policy if exists "Public read flashcards" on public.flashcards;
create policy "Public read flashcards" on public.flashcards for select using (true);

drop policy if exists "Public read published clinical cases" on public.clinical_cases;
create policy "Public read published clinical cases" on public.clinical_cases for select using (status = 'published' or public.is_medverse_editor());

-- Editor-only Write Policies
drop policy if exists "Editors manage topics" on public.topics;
create policy "Editors manage topics" on public.topics for all to authenticated using (public.is_medverse_editor()) with check (public.is_medverse_editor());

drop policy if exists "Editors manage content reviews" on public.content_reviews;
create policy "Editors manage content reviews" on public.content_reviews for all to authenticated using (public.is_medverse_editor()) with check (public.is_medverse_editor());

-- Private User Data Policies (Strictly scoped to auth.uid() = user_id)
drop policy if exists "Users manage own attempts" on public.question_attempts;
create policy "Users manage own attempts" on public.question_attempts for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own flashcard reviews" on public.flashcard_reviews;
create policy "Users manage own flashcard reviews" on public.flashcard_reviews for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own bookmarks" on public.bookmarks;
create policy "Users manage own bookmarks" on public.bookmarks for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own learning progress" on public.learning_progress;
create policy "Users manage own learning progress" on public.learning_progress for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own study sessions" on public.study_sessions;
create policy "Users manage own study sessions" on public.study_sessions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
