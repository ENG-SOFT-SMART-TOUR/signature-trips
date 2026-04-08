import type { QuizAnswers } from '@/store/useStore';

/**
 * Mapping from quiz answers to granular profile tags.
 * Each answer expands into multiple tags that match destination attributes.
 */
const TAG_MAP: Record<string, Record<string, string[]>> = {
  landscape: {
    Beach: ['beach', 'coastal', 'tropical', 'island'],
    Mountains: ['mountains', 'hiking', 'altitude', 'nature'],
    City: ['city', 'urban', 'nightlife', 'culture'],
    Countryside: ['countryside', 'rural', 'nature', 'relaxation'],
  },
  style: {
    Adventure: ['adventure', 'outdoor', 'extreme', 'nature'],
    Culture: ['culture', 'history', 'museums', 'architecture'],
    Relaxation: ['relaxation', 'spa', 'wellness', 'beach'],
    Gastronomy: ['gastronomy', 'food', 'wine', 'culture'],
  },
  budget: {
    Budget: ['budget'],
    Moderate: ['moderate', 'budget'],
    Comfortable: ['comfortable', 'moderate'],
    Luxury: ['luxury', 'comfortable'],
  },
  companion: {
    Solo: ['solo'],
    Couple: ['couple', 'romantic'],
    Family: ['family'],
    Friends: ['friends', 'group'],
  },
  pace: {
    'Slow & deep': ['slow', 'immersive', 'relaxation'],
    Balanced: ['balanced'],
    'Fast & packed': ['fast', 'adventure'],
  },
};

/**
 * Traveler archetype derived from the dominant quiz signals.
 */
const ARCHETYPES: { label: string; emoji: string; match: (a: QuizAnswers) => boolean }[] = [
  { label: 'Adventurous Explorer', emoji: '🧭', match: a => a.style === 'Adventure' && a.pace === 'Fast & packed' },
  { label: 'Cultural Connoisseur', emoji: '🏛️', match: a => a.style === 'Culture' },
  { label: 'Beach Enthusiast', emoji: '🏖️', match: a => a.landscape === 'Beach' && a.style === 'Relaxation' },
  { label: 'Gourmet Traveler', emoji: '🍷', match: a => a.style === 'Gastronomy' },
  { label: 'Mountain Seeker', emoji: '⛰️', match: a => a.landscape === 'Mountains' },
  { label: 'Urban Nomad', emoji: '🌃', match: a => a.landscape === 'City' },
  { label: 'Slow Wanderer', emoji: '🐌', match: a => a.pace === 'Slow & deep' },
  { label: 'Adventurous Explorer', emoji: '🧭', match: a => a.style === 'Adventure' },
  { label: 'Relaxed Traveler', emoji: '🌴', match: a => a.style === 'Relaxation' },
  { label: 'Free Spirit', emoji: '✨', match: () => true }, // fallback
];

export interface TravelerProfile {
  /** Human-readable archetype */
  type: string;
  emoji: string;
  /** All expanded tags for matching */
  tags: string[];
  /** Summary sentence */
  summary: string;
  /** When the quiz was taken */
  createdAt: string;
}

/**
 * Validates that the quiz has enough answers to generate a profile.
 * Requires at least landscape and style.
 */
export function isQuizComplete(answers: QuizAnswers): boolean {
  return !!(answers.landscape && answers.style);
}

/**
 * Generates a structured traveler profile from quiz answers.
 * Returns null if quiz is incomplete.
 */
export function generateTravelerProfile(answers: QuizAnswers): TravelerProfile | null {
  if (!isQuizComplete(answers)) return null;

  // Expand answers into tags (deduplicated)
  const tagSet = new Set<string>();
  for (const [key, value] of Object.entries(answers)) {
    if (!value) continue;
    const mappings = TAG_MAP[key]?.[value];
    if (mappings) mappings.forEach(t => tagSet.add(t));
    // Always add the raw lowercase answer
    tagSet.add(value.toLowerCase());
  }
  const tags = Array.from(tagSet);

  // Determine archetype
  const archetype = ARCHETYPES.find(a => a.match(answers))!;

  // Build summary
  const parts: string[] = [];
  if (answers.landscape) parts.push(`loves ${answers.landscape.toLowerCase()} destinations`);
  if (answers.style) parts.push(`drawn to ${answers.style.toLowerCase()}`);
  if (answers.companion) parts.push(`travels ${answers.companion.toLowerCase()}`);
  if (answers.pace) parts.push(`at a ${answers.pace.toLowerCase()} pace`);

  const summary = parts.length > 0
    ? `You ${parts.join(', ')}.`
    : 'Complete the quiz to discover your travel personality.';

  return {
    type: archetype.label,
    emoji: archetype.emoji,
    tags,
    summary,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Returns tags suitable for destination matching (same as before but richer).
 */
export function getMatchingTags(answers: QuizAnswers): string[] {
  const profile = generateTravelerProfile(answers);
  return profile?.tags || [];
}
