import { GoogleGenAI } from '@google/genai';
import {
  VERIFIED_FREE_MODELS,
  DEFAULT_FREE_MODEL,
  TUTOR_LIMITS,
  TUTOR_MESSAGES,
  TutorTrack,
} from './constants';
import {
  buildSystemInstruction,
  buildUserPrompt,
  ConversationTurn,
  LessonContext,
} from './promptBuilder';

export interface GenerateTutorResponseParams {
  message: string;
  context?: LessonContext;
  history?: ConversationTurn[];
}

export interface TutorResponseResult {
  success: boolean;
  reply?: string;
  error?: string;
  statusCode: number;
  modelUsed?: string;
}

/**
 * Validates whether the configured model is verified to be on the Gemini API Free Tier.
 * Fails closed if the model is not explicitly allowlisted.
 */
export function validateFreeTierModel(modelName: string): boolean {
  return VERIFIED_FREE_MODELS.includes(modelName as any);
}

/**
 * Invokes the Google Gemini Free Tier API via the official @google/genai SDK.
 * Guaranteed zero-cost: fails closed immediately if model is not allowlisted,
 * applies sensible max output tokens, disables billable tools/search grounding,
 * and intercepts quota exhaustion gracefully without paid fallbacks.
 */
export async function generateTutorResponse(
  params: GenerateTutorResponseParams
): Promise<TutorResponseResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your-gemini-api-key-here') {
    return {
      success: false,
      error: TUTOR_MESSAGES.MISSING_API_KEY,
      statusCode: 503,
    };
  }

  const configuredModel = process.env.GEMINI_MODEL || DEFAULT_FREE_MODEL;

  // STRICT ZERO-COST ENFORCEMENT: Fail closed if not a verified free-tier model
  if (!validateFreeTierModel(configuredModel)) {
    console.error(
      `[AI Tutor Security Alert] Attempted to use unverified model "${configuredModel}". Blocked by zero-cost policy.`
    );
    return {
      success: false,
      error: `${TUTOR_MESSAGES.MODEL_UNVERIFIED} (Configured: "${configuredModel}"). Please set GEMINI_MODEL to an eligible free model such as "gemini-2.5-flash".`,
      statusCode: 422,
    };
  }

  const track: TutorTrack = params.context?.track || 'general';
  const systemInstruction = buildSystemInstruction(track);
  const userPrompt = buildUserPrompt(params.message, params.context);

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Prepare contents array with conversation history (capped to conserve free tier tokens)
    const contents: any[] = [];

    if (params.history && params.history.length > 0) {
      const recentHistory = params.history.slice(-TUTOR_LIMITS.MAX_HISTORY_TURNS);
      for (const turn of recentHistory) {
        contents.push({
          role: turn.role === 'model' ? 'model' : 'user',
          parts: [{ text: turn.content.slice(0, 1000) }],
        });
      }
    }

    // Append current user turn
    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    // Enforce request timeout using AbortController
    const abortController = new AbortController();
    const timeoutHandle = setTimeout(() => {
      abortController.abort();
    }, TUTOR_LIMITS.REQUEST_TIMEOUT_MS);

    let response;
    try {
      response = await ai.models.generateContent({
        model: configuredModel,
        contents,
        config: {
          systemInstruction,
          maxOutputTokens: TUTOR_LIMITS.MAX_OUTPUT_TOKENS,
          temperature: TUTOR_LIMITS.TEMPERATURE,
          abortSignal: abortController.signal,
          // Explicitly NO paid tools or search grounding configured
        },
      });
    } finally {
      clearTimeout(timeoutHandle);
    }

    const replyText = response?.text;
    if (!replyText || replyText.trim() === '') {
      return {
        success: false,
        error: 'The AI Tutor did not return a response. Please try rephrasing your question.',
        statusCode: 502,
      };
    }

    return {
      success: true,
      reply: replyText.trim(),
      statusCode: 200,
      modelUsed: configuredModel,
    };
  } catch (err: any) {
    const errMessage = String(err?.message || err);
    const errStatus = Number(err?.status || err?.code || 500);

    // 1. Quota / Rate Limit Exhaustion (HTTP 429 / RESOURCE_EXHAUSTED)
    if (
      errStatus === 429 ||
      errMessage.includes('RESOURCE_EXHAUSTED') ||
      errMessage.includes('quota') ||
      errMessage.includes('Rate limit') ||
      errMessage.includes('429')
    ) {
      console.warn('[AI Tutor] Gemini Free Tier quota reached:', errMessage);
      return {
        success: false,
        error: TUTOR_MESSAGES.QUOTA_EXHAUSTED,
        statusCode: 429,
        modelUsed: configuredModel,
      };
    }

    // 2. High Demand / Temporary Service Unavailable (HTTP 503)
    if (
      errStatus === 503 ||
      errMessage.includes('503') ||
      errMessage.includes('UNAVAILABLE') ||
      errMessage.includes('high demand')
    ) {
      console.warn('[AI Tutor] Gemini API model experiencing high demand:', errMessage);
      return {
        success: false,
        error: TUTOR_MESSAGES.HIGH_DEMAND,
        statusCode: 503,
        modelUsed: configuredModel,
      };
    }

    // 3. Model Not Found / Retired / Unavailable to new users (HTTP 404)
    if (
      errStatus === 404 ||
      errMessage.includes('404') ||
      errMessage.includes('NOT_FOUND') ||
      errMessage.includes('no longer available') ||
      errMessage.includes('not found')
    ) {
      console.error('[AI Tutor] Configured model not found or retired:', errMessage);
      return {
        success: false,
        error: `${TUTOR_MESSAGES.MODEL_UNAVAILABLE} (Model: "${configuredModel}")`,
        statusCode: 404,
        modelUsed: configuredModel,
      };
    }

    // 4. Invalid API Key / Permissions (HTTP 400 / 401 / 403)
    if (
      errStatus === 401 ||
      errStatus === 403 ||
      errMessage.includes('API_KEY_INVALID') ||
      errMessage.includes('PERMISSION_DENIED') ||
      errMessage.includes('API key not valid')
    ) {
      console.error('[AI Tutor] Invalid API key or permission denied:', errMessage);
      return {
        success: false,
        error: TUTOR_MESSAGES.AUTH_ERROR,
        statusCode: 401,
        modelUsed: configuredModel,
      };
    }

    // 5. Request Timeout
    if (err?.name === 'AbortError' || errMessage.includes('abort') || errMessage.includes('timeout')) {
      return {
        success: false,
        error: 'The request to the AI Tutor timed out. Please try asking a shorter question.',
        statusCode: 504,
        modelUsed: configuredModel,
      };
    }

    // 6. Network connectivity failure
    if (
      errMessage.includes('fetch failed') ||
      errMessage.includes('ENOTFOUND') ||
      errMessage.includes('ECONNREFUSED')
    ) {
      console.error('[AI Tutor] Network error reaching Gemini API:', errMessage);
      return {
        success: false,
        error: TUTOR_MESSAGES.NETWORK_ERROR,
        statusCode: 502,
        modelUsed: configuredModel,
      };
    }

    // 7. Generic fallback error (safe: never leaks internal API keys or stack traces)
    console.error('[AI Tutor] Error calling Gemini API:', errMessage);
    return {
      success: false,
      error: 'An unexpected error occurred while communicating with the AI Tutor. Please try again.',
      statusCode: 500,
      modelUsed: configuredModel,
    };
  }
}

