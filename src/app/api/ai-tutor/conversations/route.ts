import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { TUTOR_MESSAGES, VALID_TRACKS, TutorTrack } from '@/lib/tutor/constants';

export const dynamic = 'force-dynamic';

/**
 * GET /api/ai-tutor/conversations
 * Returns the list of conversations belonging to the authenticated user.
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
        { success: false, error: TUTOR_MESSAGES.UNAUTHENTICATED },
        { status: 401 }
      );
    }

    const { data: conversations, error: dbError } = await supabase
      .from('tutor_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (dbError) {
      return NextResponse.json({
        success: true,
        conversations: [],
        notice: 'Conversation history table not yet initialized in Supabase.',
      });
    }

    return NextResponse.json({
      success: true,
      conversations: conversations || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch conversations.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai-tutor/conversations
 * Creates a new conversation for the authenticated user.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: TUTOR_MESSAGES.UNAUTHENTICATED },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { title = 'New Tutor Session', track = 'general', moduleId, lessonId } = body;

    const validatedTrack = VALID_TRACKS.includes(track as TutorTrack) ? track : 'general';

    const { data: conversation, error: dbError } = await supabase
      .from('tutor_conversations')
      .insert({
        user_id: user.id,
        title: String(title).slice(0, 100),
        track: validatedTrack,
        module_id: moduleId ? String(moduleId).slice(0, 100) : null,
        lesson_id: lessonId ? String(lessonId).slice(0, 100) : null,
      })
      .select('*')
      .single();

    if (dbError) {
      return NextResponse.json(
        { success: false, error: 'Database error creating conversation: ' + dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to create conversation.' },
      { status: 500 }
    );
  }
}

