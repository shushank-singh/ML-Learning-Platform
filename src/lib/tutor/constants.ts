/**
 * AI Tutor Configuration & Zero-Cost Guardrails
 * 
 * CRITICAL ZERO-BUDGET POLICY:
 * Only models verified to be available under the Gemini API Developer Free Tier
 * are permitted. Any unverified or paid model will cause the system to fail-closed
 * rather than incurring charges.
 */

export const VERIFIED_FREE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-3.8-flash',
  // Preserved for backwards compatibility with grandfathered API accounts
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
] as const;

export type VerifiedFreeModel = typeof VERIFIED_FREE_MODELS[number];

export const DEFAULT_FREE_MODEL: VerifiedFreeModel = 'gemini-3.5-flash';

/**
 * Valid learning tracks supported by the shared AI Tutor engine.
 */
export const VALID_TRACKS = ['ml', 'dsa', 'python', 'java', 'general'] as const;
export type TutorTrack = typeof VALID_TRACKS[number];

/**
 * Guardrail Token & Request Limits to conserve Free Tier quota
 */
export const TUTOR_LIMITS = {
  // Model generation output tokens: concise, focused pedagogical responses
  MAX_OUTPUT_TOKENS: 1000,
  // Temperature for balanced reasoning and factual consistency
  TEMPERATURE: 0.6,
  // Max length of student user input message
  MAX_MESSAGE_LENGTH: 2000,
  // Max length of student attached code snippet
  MAX_CODE_LENGTH: 4000,
  // Max conversation turns sent in context to conserve input tokens
  MAX_HISTORY_TURNS: 6,
  // Application-level per-user rate limit (requests per minute)
  USER_RPM_LIMIT: 15,
  // Application-level per-user rate limit (requests per day)
  USER_RPD_LIMIT: 120,
  // API Call Timeout in milliseconds
  REQUEST_TIMEOUT_MS: 25000,
} as const;

/**
 * Friendly Error Messages for Zero-Cost Fail-Closed Scenarios
 */
export const TUTOR_MESSAGES = {
  QUOTA_EXHAUSTED:
    "The AI Tutor's free tier quota has temporarily been reached. Under our strict zero-cost policy, paid fallbacks are disabled. Please wait a few moments or try again tomorrow when daily quotas reset.",
  RATE_LIMITED:
    "You have asked several questions in a short period. Please take a moment to review the lesson notes before asking again.",
  MODEL_UNVERIFIED:
    "AI Tutor Error: The configured AI model is not on the verified free-tier allowlist. Request blocked to prevent unintended billing charges.",
  MODEL_UNAVAILABLE:
    "The configured AI model is currently retired or unavailable in the Gemini Developer API. Please set GEMINI_MODEL to an active free model such as 'gemini-3.5-flash'.",
  HIGH_DEMAND:
    "The Gemini free-tier model is currently experiencing temporary high demand. Please wait a moment and try asking again.",
  AUTH_ERROR:
    "AI Tutor configuration error: The provided GEMINI_API_KEY is invalid or lacks access to the Gemini Developer API.",
  NETWORK_ERROR:
    "Could not connect to the Google Gemini API. Please check server internet connectivity or try again in a few moments.",
  MISSING_API_KEY:
    "AI Tutor is temporarily unavailable because the server Gemini API key is not configured.",
  UNAUTHENTICATED:
    "Please sign in with your account to access the AI Coding & Concept Tutor.",
  INVALID_TRACK:
    "Invalid learning track specified. Supported tracks are: ML, DSA, Python, Java, and General.",
} as const;

