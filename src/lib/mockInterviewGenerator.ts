import { GoogleGenAI } from '@google/genai';
import {
  CODING_CHALLENGES_BANK,
  generateProceduralMCQs,
  InterviewCodingChallenge,
  InterviewDifficulty,
  InterviewDifficultyFilter,
  InterviewMCQ,
  InterviewTrackId,
  MOCK_INTERVIEW_TRACKS,
  MockInterviewTrack,
  TRACK_METADATA,
} from '@/data/mockInterviews';
import { loadRevisionSubjectTopics } from '@/data/revision/loader';
import { RevisionSubject } from '@/data/revision/types';
import { DEFAULT_FREE_MODEL } from '@/lib/tutor/constants';
import { validateFreeTierModel } from '@/lib/tutor/geminiClient';

export interface GenerateMockRoundInput {
  trackId: InterviewTrackId;
  difficulty: InterviewDifficultyFilter;
  questionCount: number;
  codingCount: number;
  durationMinutes: number;
  excludeIds?: string[];
  useAI?: boolean;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function shuffleInPlace<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getSubjectsForTrack(trackId: InterviewTrackId): RevisionSubject[] {
  switch (trackId) {
    case 'ml-engineer':
      return ['ml'];
    case 'genai-rag':
      return ['ml'];
    case 'dsa-round':
      return ['dsa'];
    case 'python-backend':
      return ['python'];
    case 'mixed':
      return ['ml', 'dsa', 'python', 'java'];
  }
}

async function generateAIMcqsFreeTier(
  trackId: InterviewTrackId,
  difficulty: InterviewDifficultyFilter,
  count: number
): Promise<InterviewMCQ[]> {
  if (count <= 0) return [];
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];

  const configuredModel = process.env.GEMINI_MODEL || DEFAULT_FREE_MODEL;
  if (!validateFreeTierModel(configuredModel)) {
    return [];
  }

  const trackLabel = TRACK_METADATA[trackId]?.title || trackId;
  const targetDiff =
    difficulty === 'Mixed' ? 'a mix of Beginner, Intermediate, and Advanced' : difficulty;

  const prompt = `You are a Principal Technical Interviewer at a top AI lab.
Generate exactly ${count} brand-new, non-trivial multiple-choice technical interview questions for:
- Track: ${trackLabel} (${trackId})
- Difficulty: ${targetDiff}

Rules:
1. Return ONLY a valid JSON array of objects, with NO markdown fences or extra commentary.
2. Each object must have exact keys:
   - "topic": short 2-5 word topic name (string)
   - "difficulty": one of "Beginner", "Intermediate", "Advanced"
   - "question": realistic interview scenario or concept question (string)
   - "options": array of exactly 4 plausible distinct strings
   - "correctIndex": integer 0, 1, 2, or 3
   - "explanation": concise 1-2 sentence explanation of why the answer is right
3. Keep questions concise, accurate, and varied across subtopics.`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    let rawText = '';
    try {
      const response = await ai.models.generateContent({
        model: configuredModel,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
          maxOutputTokens: 1800,
          responseMimeType: 'application/json',
          abortSignal: controller.signal,
        },
      });
      rawText = response.text?.trim() || '';
    } finally {
      clearTimeout(timer);
    }

    if (!rawText) return [];
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/```$/i, '')
      .trim();
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) return [];

    const nonce = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const valid: InterviewMCQ[] = [];

    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (!item || typeof item !== 'object') continue;
      if (typeof item.question !== 'string' || item.question.trim().length < 10) continue;
      if (!Array.isArray(item.options) || item.options.length !== 4) continue;
      if (!item.options.every((o: unknown) => typeof o === 'string' && o.trim().length > 0)) {
        continue;
      }
      const idx = Number(item.correctIndex);
      if (!Number.isInteger(idx) || idx < 0 || idx > 3) continue;

      const diff: InterviewDifficulty =
        item.difficulty === 'Beginner' ||
        item.difficulty === 'Intermediate' ||
        item.difficulty === 'Advanced'
          ? item.difficulty
          : difficulty === 'Mixed'
            ? 'Intermediate'
            : difficulty;

      valid.push({
        id: `ai-${trackId}-${nonce}-${i}`,
        topic: typeof item.topic === 'string' && item.topic.trim() ? item.topic.trim() : 'AI Interview',
        difficulty: diff,
        question: item.question.trim(),
        options: item.options.map((o: string) => o.trim()),
        correctIndex: idx,
        explanation:
          typeof item.explanation === 'string' && item.explanation.trim()
            ? item.explanation.trim()
            : 'Reviewed against core interview fundamentals.',
        source: 'ai',
      });
    }

    return valid.slice(0, count);
  } catch {
    // Graceful fallback to procedural + revision/curated pool under strict zero-cost policy
    return [];
  }
}

function selectCodingChallenges(
  trackId: InterviewTrackId,
  difficulty: InterviewDifficultyFilter,
  codingCount: number,
  excludeSet: Set<string>
): InterviewCodingChallenge[] {
  if (codingCount <= 0) return [];

  const byTier: Array<Array<InterviewCodingChallenge & { trackId: string }>> = [
    // Tier 1: Exact track + exact difficulty + unseen
    CODING_CHALLENGES_BANK.filter(
      (c) =>
        (trackId === 'mixed' || c.trackId === trackId) &&
        (difficulty === 'Mixed' || c.difficulty === difficulty) &&
        !excludeSet.has(c.id)
    ),
    // Tier 2: Exact track + any difficulty + unseen
    CODING_CHALLENGES_BANK.filter(
      (c) => (trackId === 'mixed' || c.trackId === trackId) && !excludeSet.has(c.id)
    ),
    // Tier 3: Any track + exact difficulty + unseen
    CODING_CHALLENGES_BANK.filter(
      (c) => (difficulty === 'Mixed' || c.difficulty === difficulty) && !excludeSet.has(c.id)
    ),
    // Tier 4: Any unseen
    CODING_CHALLENGES_BANK.filter((c) => !excludeSet.has(c.id)),
    // Tier 5: Exact track (even if previously seen)
    CODING_CHALLENGES_BANK.filter((c) => trackId === 'mixed' || c.trackId === trackId),
    // Tier 6: Everything
    CODING_CHALLENGES_BANK,
  ];

  const chosen: InterviewCodingChallenge[] = [];
  const chosenIds = new Set<string>();

  for (const tier of byTier) {
    for (const item of shuffleInPlace(tier)) {
      if (chosen.length >= codingCount) break;
      if (!chosenIds.has(item.id)) {
        chosenIds.add(item.id);
        chosen.push({ ...item, source: 'curated' });
      }
    }
    if (chosen.length >= codingCount) break;
  }

  return chosen;
}

export async function generateCustomMockRound(
  rawInput: GenerateMockRoundInput
): Promise<MockInterviewTrack> {
  const trackId: InterviewTrackId =
    rawInput.trackId in TRACK_METADATA ? rawInput.trackId : 'mixed';
  const difficulty: InterviewDifficultyFilter =
    rawInput.difficulty === 'Beginner' ||
    rawInput.difficulty === 'Intermediate' ||
    rawInput.difficulty === 'Advanced' ||
    rawInput.difficulty === 'Mixed'
      ? rawInput.difficulty
      : 'Mixed';
  const questionCount = clamp(rawInput.questionCount, 1, 30);
  const codingCount = clamp(rawInput.codingCount, 0, 3);
  const durationMinutes = clamp(rawInput.durationMinutes, 1, 120);
  const excludeSet = new Set((rawInput.excludeIds || []).slice(-500));

  // 1. Optional AI-generated fresh questions (capped to conserve free quota & latency)
  const aiTarget = rawInput.useAI ? Math.min(questionCount, 8) : 0;
  const aiPromise = aiTarget > 0 ? generateAIMcqsFreeTier(trackId, difficulty, aiTarget) : Promise.resolve([]);

  // 2. Load revision banks for track subjects
  const subjects = getSubjectsForTrack(trackId);
  const topicLists = await Promise.all(subjects.map((s) => loadRevisionSubjectTopics(s)));

  const curatedPool: InterviewMCQ[] = [];
  for (const track of MOCK_INTERVIEW_TRACKS) {
    if (trackId !== 'mixed' && track.id !== trackId) continue;
    for (const mcq of track.mcqs) {
      if (excludeSet.has(mcq.id)) continue;
      if (difficulty !== 'Mixed' && mcq.difficulty !== difficulty) continue;
      curatedPool.push({ ...mcq, source: 'curated' });
    }
  }

  const revisionPool: InterviewMCQ[] = [];
  const genaiKeywords = /(transformer|attention|rag|llm|embedding|vector|token|lora|bert|gpt|neural|deep|language)/i;

  for (const topics of topicLists) {
    for (const topic of topics) {
      if (difficulty !== 'Mixed' && topic.difficulty !== difficulty) continue;
      if (trackId === 'genai-rag') {
        const hay = `${topic.category} ${topic.title} ${topic.tags.join(' ')}`;
        if (!genaiKeywords.test(hay)) continue;
      }
      for (const q of topic.quiz) {
        const revId = `rev-${topic.id}-${q.id}`;
        if (excludeSet.has(revId)) continue;
        revisionPool.push({
          id: revId,
          topic: topic.title,
          difficulty: topic.difficulty,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          source: 'revision',
        });
      }
    }
  }

  const aiQuestions = await aiPromise;
  const remainingAfterAI = Math.max(0, questionCount - aiQuestions.length);

  // Reserve a healthy share for dynamic procedural math/complexity/code questions so rounds stay fresh
  const minProcedural =
    remainingAfterAI >= 6 ? Math.min(3, Math.ceil(remainingAfterAI * 0.25)) : remainingAfterAI >= 3 ? 1 : 0;

  const staticPool = shuffleInPlace([...shuffleInPlace(curatedPool), ...shuffleInPlace(revisionPool)]);
  const maxBankToTake = Math.max(0, remainingAfterAI - minProcedural);
  const bankChosen = staticPool.slice(0, maxBankToTake);

  const proceduralNeeded = Math.max(0, remainingAfterAI - bankChosen.length);
  const proceduralQuestions = generateProceduralMCQs(trackId, difficulty, proceduralNeeded);

  const mcqs = shuffleInPlace([...aiQuestions, ...bankChosen, ...proceduralQuestions]).slice(
    0,
    questionCount
  );

  const codingChallenges = selectCodingChallenges(trackId, difficulty, codingCount, excludeSet);
  const meta = TRACK_METADATA[trackId];

  const aiCount = mcqs.filter((m) => m.source === 'ai').length;
  const procCount = mcqs.filter((m) => m.source === 'procedural').length;
  const bankCount = mcqs.length - aiCount - procCount;

  return {
    id: `custom-${trackId}-${Date.now().toString(36)}`,
    title: meta.title,
    roleBadge: meta.roleBadge,
    durationMinutes,
    description: meta.description,
    accentColor: meta.accentColor,
    mcqs,
    codingChallenge: codingChallenges[0] || CODING_CHALLENGES_BANK[0],
    codingChallenges,
    roundDifficulty: difficulty,
    sourceBreakdown: {
      ai: aiCount,
      procedural: procCount,
      bank: bankCount,
    },
  };
}
