import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import {
  TUTOR_LIMITS,
  TUTOR_MESSAGES,
  VALID_TRACKS,
  TutorTrack,
} from '@/lib/tutor/constants';
import { checkUserRateLimit } from '@/lib/tutor/rateLimiter';
import { generateTutorResponse } from '@/lib/tutor/geminiClient';
import { LessonContext, ConversationTurn } from '@/lib/tutor/promptBuilder';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify authenticated user via Supabase Server Client
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

    // 2. Validate Request Body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    const {
      message,
      track = 'general',
      moduleId,
      lessonId,
      lessonTitle,
      language,
      codeSnippet,
      history,
      conversationId: clientConversationId,
    } = body;

    // Validate Message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'A question or message is required.' },
        { status: 400 }
      );
    }

    if (message.length > TUTOR_LIMITS.MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Message is too long. Please limit your question to ${TUTOR_LIMITS.MAX_MESSAGE_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    // Validate Track
    if (!VALID_TRACKS.includes(track as TutorTrack)) {
      return NextResponse.json(
        { success: false, error: TUTOR_MESSAGES.INVALID_TRACK },
        { status: 400 }
      );
    }

    // Validate Code Snippet Length
    if (codeSnippet && typeof codeSnippet === 'string' && codeSnippet.length > TUTOR_LIMITS.MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Attached code is too long. Please limit code to ${TUTOR_LIMITS.MAX_CODE_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    // Validate History Format
    const sanitizedHistory: ConversationTurn[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-TUTOR_LIMITS.MAX_HISTORY_TURNS)) {
        if (
          item &&
          (item.role === 'user' || item.role === 'model') &&
          typeof item.content === 'string'
        ) {
          sanitizedHistory.push({
            role: item.role,
            content: item.content.slice(0, 1000),
          });
        }
      }
    }

    // 3. Application-Level Per-User Rate Limiting
    const rateLimit = checkUserRateLimit(user.id);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            rateLimit.reason === 'rpd_exceeded'
              ? 'You have reached your daily AI Tutor questions allowance. Quotas reset tomorrow.'
              : TUTOR_MESSAGES.RATE_LIMITED,
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds || 60),
          },
        }
      );
    }

    // 4. Assemble Context
    const lessonContext: LessonContext = {
      track: track as TutorTrack,
      moduleId: typeof moduleId === 'string' ? moduleId.slice(0, 100) : undefined,
      lessonId: typeof lessonId === 'string' ? lessonId.slice(0, 100) : undefined,
      lessonTitle: typeof lessonTitle === 'string' ? lessonTitle.slice(0, 200) : undefined,
      language: typeof language === 'string' ? language.slice(0, 50) : undefined,
      codeSnippet: typeof codeSnippet === 'string' ? codeSnippet : undefined,
    };

    // 5. Generate Tutor Response via Verified Free-Tier Gemini
    const result = await generateTutorResponse({
      message: message.trim(),
      context: lessonContext,
      history: sanitizedHistory,
    });

    if (!result.success || !result.reply) {
      return NextResponse.json(
        { success: false, error: result.error, modelUsed: result.modelUsed },
        { status: result.statusCode }
      );
    }

    // 6. Persist Conversation & Messages in Supabase (if database configured)
    let activeConversationId = clientConversationId;

    try {
      if (activeConversationId) {
        // Verify user owns conversation
        const { data: existingConv } = await supabase
          .from('tutor_conversations')
          .select('id')
          .eq('id', activeConversationId)
          .eq('user_id', user.id)
          .single();

        if (!existingConv) {
          activeConversationId = undefined; // Create a fresh one below
        }
      }

      if (!activeConversationId) {
        // Generate short conversational title
        const titleSnippet = message.trim().slice(0, 45);
        const title = titleSnippet.length === 45 ? `${titleSnippet}...` : titleSnippet;

        const { data: newConv } = await supabase
          .from('tutor_conversations')
          .insert({
            user_id: user.id,
            title: title || 'Tutor Session',
            track,
            module_id: lessonContext.moduleId || null,
            lesson_id: lessonContext.lessonId || null,
          })
          .select('id')
          .single();

        if (newConv) {
          activeConversationId = newConv.id;
        }
      }

      if (activeConversationId) {
        // Insert user turn
        await supabase.from('tutor_messages').insert({
          conversation_id: activeConversationId,
          user_id: user.id,
          role: 'user',
          content: message.trim(),
        });

        // Insert model turn
        await supabase.from('tutor_messages').insert({
          conversation_id: activeConversationId,
          user_id: user.id,
          role: 'model',
          content: result.reply,
        });

        // Update conversation timestamp
        await supabase
          .from('tutor_conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', activeConversationId);
      }
    } catch (dbErr) {
      // Non-fatal: if Supabase tables haven't been migrated yet, do not block tutor response
      console.warn('[AI Tutor] Notice: Could not save conversation history:', (dbErr as any)?.message);
    }

    return NextResponse.json({
      success: true,
      reply: result.reply,
      conversationId: activeConversationId,
      modelUsed: result.modelUsed,
      remainingDaily: rateLimit.remainingDaily,
    });
  } catch (err: any) {
    console.error('[AI Tutor Handler Error]:', err?.message || err);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your question.',
      },
      { status: 500 }
    );
  }
}

