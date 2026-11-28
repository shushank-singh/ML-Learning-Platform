import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { IITUserProgressUpdateSchema } from '@/lib/iit/validation';

export const dynamic = 'force-dynamic';

/**
 * GET /api/iit/progress
 * Loads authenticated user's IIT JEE progress, mock attempts, SM-2 reviews & revision tasks.
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

    const { data, error } = await supabase
      .from('iit_user_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: true, progress: null, tableMissing: true },
          { status: 200 }
        );
      }
      console.error('[/api/iit/progress GET] DB error:', error.message);
      return NextResponse.json(
        { success: false, error: 'Failed to load IIT JEE progress.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: true, progress: null },
        { status: 200, headers: { 'Cache-Control': 'no-store, private' } }
      );
    }

    return NextResponse.json(
      {
        success: true,
        progress: {
          targetExam: data.target_exam,
          studentProfile: data.student_profile,
          completedLessons: data.completed_lessons || {},
          completedChapters: data.completed_chapters || {},
          bookmarkedChapterIds: data.bookmarked_chapters || [],
          bookmarkedQuestionIds: data.bookmarked_questions || [],
          personalNotes: data.personal_notes || {},
          attempts: data.attempts || [],
          mockTestResults: data.mock_test_results || [],
          flashcardReviews: data.flashcard_reviews || {},
          studySessions: data.study_sessions || [],
          activityDates: data.activity_dates || [],
          revisionTasks: data.revision_tasks || [],
          lastVisited: data.last_visited || undefined,
          updatedAt: data.updated_at,
        },
      },
      { status: 200, headers: { 'Cache-Control': 'no-store, private' } }
    );
  } catch (err) {
    console.error('[/api/iit/progress GET] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error loading IIT JEE progress.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/iit/progress
 * Validates and persists IIT JEE user progress into Supabase PostgreSQL with RLS.
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
    const parsed = IITUserProgressUpdateSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid IIT progress payload.', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const nowIso = new Date().toISOString();

    const row: Record<string, any> = {
      user_id: user.id,
      updated_at: nowIso,
    };

    if (payload.targetExam !== undefined) row.target_exam = payload.targetExam;
    if (payload.studentProfile !== undefined) row.student_profile = payload.studentProfile;
    if (payload.completedLessons !== undefined) row.completed_lessons = payload.completedLessons;
    if (payload.completedChapters !== undefined) row.completed_chapters = payload.completedChapters;
    if (payload.bookmarkedChapterIds !== undefined)
      row.bookmarked_chapters = payload.bookmarkedChapterIds;
    if (payload.bookmarkedQuestionIds !== undefined)
      row.bookmarked_questions = payload.bookmarkedQuestionIds;
    if (payload.personalNotes !== undefined) row.personal_notes = payload.personalNotes;
    if (payload.attempts !== undefined) row.attempts = payload.attempts;
    if (payload.mockTestResults !== undefined) row.mock_test_results = payload.mockTestResults;
    if (payload.flashcardReviews !== undefined) row.flashcard_reviews = payload.flashcardReviews;
    if (payload.studySessions !== undefined) row.study_sessions = payload.studySessions;
    if (payload.activityDates !== undefined) row.activity_dates = payload.activityDates;
    if (payload.revisionTasks !== undefined) row.revision_tasks = payload.revisionTasks;
    if (payload.lastVisited !== undefined) row.last_visited = payload.lastVisited;

    const { error } = await supabase
      .from('iit_user_progress')
      .upsert(row, { onConflict: 'user_id' });

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: false, tableMissing: true, error: 'IIT tables not yet migrated.' },
          { status: 200 }
        );
      }
      console.error('[/api/iit/progress PUT] DB error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Also mirror mock test results into normalized ledger if present
    if (payload.mockTestResults && payload.mockTestResults.length > 0) {
      const mockRows = payload.mockTestResults.map((m) => ({
        id: m.id,
        user_id: user.id,
        test_id: m.testId,
        title: m.title,
        exam_pattern: m.examPattern,
        score: m.score,
        max_score: m.maxScore,
        correct_count: m.correctCount,
        incorrect_count: m.incorrectCount,
        unattempted_count: m.unattemptedCount,
        accuracy_pct: m.accuracyPct,
        time_taken_sec: m.timeTakenSec,
        subject_breakdown: m.subjectBreakdown,
        submitted_at: m.submittedAt,
      }));
      await supabase
        .from('iit_mock_test_attempts')
        .upsert(mockRows, { onConflict: 'id' });
    }

    return NextResponse.json({ success: true, updatedAt: nowIso }, { status: 200 });
  } catch (err) {
    console.error('[/api/iit/progress PUT] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error saving IIT JEE progress.' },
      { status: 500 }
    );
  }
}
