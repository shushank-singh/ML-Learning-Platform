import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateCustomMockRound } from '@/lib/mockInterviewGenerator';
import {
  InterviewDifficultyFilter,
  InterviewTrackId,
  TRACK_METADATA,
} from '@/data/mockInterviews';

export async function POST(req: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Please sign in to generate mock interview rounds.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawTrack = typeof body.trackId === 'string' ? body.trackId : 'mixed';
    const trackId: InterviewTrackId =
      rawTrack in TRACK_METADATA ? (rawTrack as InterviewTrackId) : 'mixed';

    const rawDifficulty = typeof body.difficulty === 'string' ? body.difficulty : 'Mixed';
    const difficulty: InterviewDifficultyFilter =
      rawDifficulty === 'Beginner' ||
      rawDifficulty === 'Intermediate' ||
      rawDifficulty === 'Advanced' ||
      rawDifficulty === 'Mixed'
        ? rawDifficulty
        : 'Mixed';

    const questionCount = Number(body.questionCount ?? 10);
    const codingCount = Number(body.codingCount ?? 1);
    const durationMinutes = Number(body.durationMinutes ?? 20);
    const excludeIds = Array.isArray(body.excludeIds)
      ? body.excludeIds.filter((id: unknown): id is string => typeof id === 'string')
      : [];
    const useAI = Boolean(body.useAI ?? true);

    const round = await generateCustomMockRound({
      trackId,
      difficulty,
      questionCount,
      codingCount,
      durationMinutes,
      excludeIds,
      useAI,
    });

    return NextResponse.json({ round });
  } catch (err) {
    console.error('[api/mock-interview/generate] Error:', err);
    return NextResponse.json(
      { error: 'Failed to generate mock interview round.' },
      { status: 500 }
    );
  }
}
