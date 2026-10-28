-- ==============================================================================
-- ML Mastery Lab — AI Tutor Conversations & Messages Schema with RLS
-- ==============================================================================
-- Run this in the Supabase Dashboard -> SQL Editor

-- 1. Create tutor_conversations table
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

-- 2. Create tutor_messages table
create table if not exists public.tutor_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.tutor_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'model', 'system')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Performance Indexes
create index if not exists idx_tutor_conversations_user_id on public.tutor_conversations(user_id);
create index if not exists idx_tutor_conversations_updated_at on public.tutor_conversations(updated_at desc);
create index if not exists idx_tutor_messages_conversation_id on public.tutor_messages(conversation_id);
create index if not exists idx_tutor_messages_user_id on public.tutor_messages(user_id);

-- 4. Enable Row Level Security (RLS)
alter table public.tutor_conversations enable row level security;
alter table public.tutor_messages enable row level security;

-- 5. RLS Policies for tutor_conversations
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

-- 6. RLS Policies for tutor_messages
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

