import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function isPlainObject(val: unknown): val is Record<string, any> {
  return Boolean(val) && typeof val === 'object' && !Array.isArray(val);
}

function sanitizeStringArray(val: unknown, limit = 2000): string[] {
  if (!Array.isArray(val)) return [];
  return Array.from(
    new Set(val.filter((item): item is string => typeof item === 'string' && item.length <= 200))
  ).slice(0, limit);
}

/**
 * GET /api/progress
 * Loads the authenticated user's synced learning & revision progress.
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
      .from('user_learning_progress')
      .select(
        'completed_lessons, bookmarks, notes, quiz_scores, streak, total_minutes_learned, weak_topics, revision_state, updated_at'
      )
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      // Gracefully signal if migration has not yet been applied to Supabase
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: true, progress: null, revisionState: null, tableMissing: true },
          { status: 200 }
        );
      }
      console.error('[/api/progress GET] Database error:', error.message);
      return NextResponse.json(
        { success: false, error: 'Failed to load cloud progress.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: true, progress: null, revisionState: null, updatedAt: null },
        {
          status: 200,
          headers: { 'Cache-Control': 'no-store, private' },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        progress: {
          completedLessons: isPlainObject(data.completed_lessons) ? data.completed_lessons : {},
          bookmarks: sanitizeStringArray(data.bookmarks),
          notes: isPlainObject(data.notes) ? data.notes : {},
          quizScores: isPlainObject(data.quiz_scores) ? data.quiz_scores : {},
          streak: isPlainObject(data.streak)
            ? data.streak
            : { currentStreak: 1, longestStreak: 1, lastActiveDate: '' },
          totalMinutesLearned:
            typeof data.total_minutes_learned === 'number' ? data.total_minutes_learned : 0,
          weakTopics: sanitizeStringArray(data.weak_topics),
        },
        revisionState: isPlainObject(data.revision_state) ? data.revision_state : null,
        updatedAt: data.updated_at,
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store, private' },
      }
    );
  } catch (err: any) {
    console.error('[/api/progress GET] Internal error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error loading progress.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/progress
 * Persists the authenticated user's learning & revision progress.
 * User ID is always derived from the verified Supabase session cookie.
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

    const body = await req.json();
    const progress = isPlainObject(body?.progress) ? body.progress : null;
    const revisionState = isPlainObject(body?.revisionState) ? body.revisionState : null;

    if (!progress && !revisionState) {
      return NextResponse.json(
        { success: false, error: 'Missing progress or revisionState payload.' },
        { status: 400 }
      );
    }

    const payload: Record<string, any> = {
      user_id: user.id,
    };

    if (progress) {
      payload.completed_lessons = isPlainObject(progress.completedLessons)
        ? progress.completedLessons
        : {};
      payload.bookmarks = sanitizeStringArray(progress.bookmarks);
      payload.notes = isPlainObject(progress.notes) ? progress.notes : {};
      payload.quiz_scores = isPlainObject(progress.quizScores) ? progress.quizScores : {};
      payload.streak = isPlainObject(progress.streak)
        ? {
            currentStreak: Math.max(1, Number(progress.streak.currentStreak) || 1),
            longestStreak: Math.max(1, Number(progress.streak.longestStreak) || 1),
            lastActiveDate: String(progress.streak.lastActiveDate || ''),
          }
        : { currentStreak: 1, longestStreak: 1, lastActiveDate: '' };
      payload.total_minutes_learned = Math.max(
        0,
        Math.round(Number(progress.totalMinutesLearned) || 0)
      );
      payload.weak_topics = sanitizeStringArray(progress.weakTopics);
    }

    if (revisionState) {
      payload.revision_state = revisionState;
    }

    const { data, error } = await supabase
      .from('user_learning_progress')
      .upsert(payload, { onConflict: 'user_id' })
      .select('updated_at')
      .single();

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: false, tableMissing: true, error: 'Progress table not yet migrated.' },
          { status: 200 }
        );
      }
      console.error('[/api/progress PUT] Database error:', error.message);
      return NextResponse.json(
        { success: false, error: 'Failed to save cloud progress.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, updatedAt: data?.updated_at || new Date().toISOString() },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[/api/progress PUT] Internal error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error saving progress.' },
      { status: 500 }
    );
  }
}
