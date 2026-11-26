'use client';

export interface CardReviewRecord {
  cardId: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string; // YYYY-MM-DD
  lastQuality: number;
}

export type RecallQuality = 1 | 3 | 4 | 5; // Again, Hard, Good, Easy

const SR_STORAGE_KEY = 'ml_spaced_repetition_v1';

function todayIsoDate(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  return d.toISOString().split('T')[0];
}

export function getSpacedRepetitionMap(): Record<string, CardReviewRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SR_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CardReviewRecord>) : {};
  } catch {
    return {};
  }
}

export function computeNextSm2(
  prev: CardReviewRecord | undefined,
  cardId: string,
  quality: RecallQuality
): CardReviewRecord {
  let repetitions = prev?.repetitions ?? 0;
  let intervalDays = prev?.intervalDays ?? 0;
  let easeFactor = prev?.easeFactor ?? 2.5;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * easeFactor);
    if (quality === 5) intervalDays = Math.max(intervalDays + 1, Math.round(intervalDays * 1.3));
    repetitions += 1;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  return {
    cardId,
    intervalDays,
    easeFactor: Math.round(easeFactor * 100) / 100,
    repetitions,
    nextReviewDate: todayIsoDate(intervalDays),
    lastQuality: quality,
  };
}

export function scheduleCardReview(
  cardId: string,
  quality: RecallQuality
): CardReviewRecord {
  const map = getSpacedRepetitionMap();
  const next = computeNextSm2(map[cardId], cardId, quality);
  map[cardId] = next;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SR_STORAGE_KEY, JSON.stringify(map));
      window.dispatchEvent(new Event('ml_sr_updated'));
    } catch {
      // Ignore storage quota issues
    }
  }
  return next;
}

export function isCardDue(record: CardReviewRecord | undefined): boolean {
  if (!record) return true;
  return record.nextReviewDate <= todayIsoDate(0);
}
