import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { MedVerseProgressUpdateSchema } from '@/lib/medverse/validation';

export const dynamic = 'force-dynamic';

/**
 * GET /api/medverse/progress
 * Loads the authenticated user's MedVerse MBBS learning progress, attempts,
 * SM-2 flashcard reviews, bookmarks, and study sessions using RLS-enforced queries.
 */
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

    const [progressRes, bookmarksRes, attemptsRes, reviewsRes, sessionsRes] = await Promise.all([
      supabase
        .from('learning_progress')
        .select('topic_id, completed, last_visited_at')
        .eq('user_id', user.id),
      supabase
        .from('bookmarks')
        .select('target_type, target_id')
        .eq('user_id', user.id),
      supabase
        .from('question_attempts')
        .select('question_id, topic_id, selected_index, is_correct, answered_at')
        .eq('user_id', user.id)
        .order('answered_at', { ascending: false })
        .limit(500),
      supabase
        .from('flashcard_reviews')
        .select('flashcard_id, ease_factor, interval_days, repetitions, next_review_at, last_reviewed_at')
        .eq('user_id', user.id),
      supabase
        .from('study_sessions')
        .select('id, topic_id, mode, duration_seconds, recorded_at')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(200),
    ]);

    const firstError =
      progressRes.error ||
      bookmarksRes.error ||
      attemptsRes.error ||
      reviewsRes.error ||
      sessionsRes.error;

    if (firstError) {
      if (firstError.code === '42P01' || firstError.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: true, progress: null, tableMissing: true },
          { status: 200 }
        );
      }
      console.error('[/api/medverse/progress GET] DB error:', firstError.message);
      return NextResponse.json(
        { success: false, error: 'Failed to load MedVerse progress.' },
        { status: 500 }
      );
    }

    const completedTopics: Record<string, boolean> = {};
    let lastVisitedTopicId: string | undefined;
    let latestVisitedMs = 0;

    for (const row of progressRes.data || []) {
      completedTopics[row.topic_id] = Boolean(row.completed);
      const ts = row.last_visited_at ? new Date(row.last_visited_at).getTime() : 0;
      if (ts > latestVisitedMs) {
        latestVisitedMs = ts;
        lastVisitedTopicId = row.topic_id;
      }
    }

    const bookmarkedTopicIds: string[] = [];
    const bookmarkedStructureIds: string[] = [];
    for (const bm of bookmarksRes.data || []) {
      if (bm.target_type === 'topic') bookmarkedTopicIds.push(bm.target_id);
      if (bm.target_type === 'structure') bookmarkedStructureIds.push(bm.target_id);
    }

    const flashcardReviews: Record<string, any> = {};
    for (const rev of reviewsRes.data || []) {
      flashcardReviews[rev.flashcard_id] = {
        cardId: rev.flashcard_id,
        easeFactor: Number(rev.ease_factor),
        intervalDays: rev.interval_days,
        repetitions: rev.repetitions,
        nextReviewAt: rev.next_review_at,
        lastReviewedAt: rev.last_reviewed_at,
      };
    }

    return NextResponse.json(
      {
        success: true,
        progress: {
          completedTopics,
          bookmarkedTopicIds,
          bookmarkedStructureIds,
          attempts: (attemptsRes.data || []).map((a) => ({
            questionId: a.question_id,
            topicId: a.topic_id,
            subjectId: '',
            selectedIndex: a.selected_index,
            isCorrect: a.is_correct,
            answeredAt: a.answered_at,
          })),
          flashcardReviews,
          studySessions: (sessionsRes.data || []).map((s) => ({
            id: s.id,
            topicId: s.topic_id,
            mode: s.mode,
            durationSeconds: s.duration_seconds,
            recordedAt: s.recorded_at,
          })),
          lastVisitedTopicId,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200, headers: { 'Cache-Control': 'no-store, private' } }
    );
  } catch (err) {
    console.error('[/api/medverse/progress GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error loading MedVerse progress.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/medverse/progress
 * Validates and persists MedVerse user progress into Supabase tables.
 */
export async function PUT(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

    const rawBody = await req.json();
    const parsed = MedVerseProgressUpdateSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid progress payload.', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const nowIso = new Date().toISOString();

    if (payload.completedTopics) {
      const rows = Object.entries(payload.completedTopics).map(([topicId, completed]) => ({
        user_id: user.id,
        topic_id: topicId,
        completed,
        completion_pct: completed ? 100 : 0,
        last_visited_at: nowIso,
        completed_at: completed ? nowIso : null,
      }));
      if (rows.length > 0) {
        const { error } = await supabase
          .from('learning_progress')
          .upsert(rows, { onConflict: 'user_id,topic_id' });
        if (error) {
          if (error.code === '42P01' || error.message?.includes('does not exist')) {
            return NextResponse.json(
              { success: false, tableMissing: true, error: 'MedVerse tables not yet migrated.' },
              { status: 200 }
            );
          }
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
      }
    }

    if (payload.flashcardReviews) {
      const reviewRows = Object.values(payload.flashcardReviews).map((rev) => ({
        user_id: user.id,
        flashcard_id: rev.cardId,
        ease_factor: rev.easeFactor,
        interval_days: rev.intervalDays,
        repetitions: rev.repetitions,
        next_review_at: rev.nextReviewAt,
        last_reviewed_at: rev.lastReviewedAt,
      }));
      if (reviewRows.length > 0) {
        await supabase
          .from('flashcard_reviews')
          .upsert(reviewRows, { onConflict: 'user_id,flashcard_id' });
      }
    }

    return NextResponse.json({ success: true, updatedAt: nowIso }, { status: 200 });
  } catch (err) {
    console.error('[/api/medverse/progress PUT] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error saving MedVerse progress.' },
      { status: 500 }
    );
  }
}
