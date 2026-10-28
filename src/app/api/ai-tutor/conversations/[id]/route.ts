import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { TUTOR_MESSAGES } from '@/lib/tutor/constants';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    id: string;
  };
}

/**
 * GET /api/ai-tutor/conversations/[id]
 * Retrieves conversation details and messages for the authenticated user.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
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

    const conversationId = params.id;
    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'Conversation ID is required.' },
        { status: 400 }
      );
    }

    // Enforce ownership
    const { data: conversation, error: convError } = await supabase
      .from('tutor_conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('user_id', user.id)
      .single();

    if (convError || !conversation) {
      return NextResponse.json(
        { success: false, error: 'Conversation not found or access denied.' },
        { status: 404 }
      );
    }

    const { data: messages, error: msgError } = await supabase
      .from('tutor_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (msgError) {
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve messages.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      conversation,
      messages: messages || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ai-tutor/conversations/[id]
 * Deletes a conversation and all its messages for the authenticated user.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
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

    const conversationId = params.id;
    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'Conversation ID is required.' },
        { status: 400 }
      );
    }

    // Enforce ownership check on delete
    const { error: deleteError } = await supabase
      .from('tutor_conversations')
      .delete()
      .eq('id', conversationId)
      .eq('user_id', user.id);

    if (deleteError) {
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Conversation deleted successfully.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to delete conversation.' },
      { status: 500 }
    );
  }
}

