import { describe, it, expect } from 'vitest';
import { generateTravelerProfile, isQuizComplete, getMatchingTags } from '@/lib/travelerProfile';
import type { QuizAnswers } from '@/store/useStore';

describe('isQuizComplete', () => {
  it('returns false for empty answers', () => {
    expect(isQuizComplete({})).toBe(false);
  });

  it('returns false if only landscape is set', () => {
    expect(isQuizComplete({ landscape: 'Beach' })).toBe(false);
  });

  it('returns true if landscape and style are set', () => {
    expect(isQuizComplete({ landscape: 'Beach', style: 'Adventure' })).toBe(true);
  });
});

describe('generateTravelerProfile', () => {
  it('returns null for incomplete quiz', () => {
    expect(generateTravelerProfile({})).toBeNull();
    expect(generateTravelerProfile({ landscape: 'Beach' })).toBeNull();
  });

  it('generates profile with correct archetype for adventure + fast', () => {
    const answers: QuizAnswers = {
      landscape: 'Mountains',
      style: 'Adventure',
      budget: 'Budget',
      companion: 'Solo',
      pace: 'Fast & packed',
    };
    const profile = generateTravelerProfile(answers);
    expect(profile).not.toBeNull();
    expect(profile!.type).toBe('Adventurous Explorer');
    expect(profile!.emoji).toBe('🧭');
    expect(profile!.tags).toContain('adventure');
    expect(profile!.tags).toContain('mountains');
    expect(profile!.tags).toContain('hiking');
    expect(profile!.tags).toContain('solo');
    expect(profile!.summary).toContain('mountains');
    expect(profile!.createdAt).toBeTruthy();
  });

  it('generates Cultural Connoisseur for culture style', () => {
    const profile = generateTravelerProfile({ landscape: 'City', style: 'Culture' });
    expect(profile!.type).toBe('Cultural Connoisseur');
    expect(profile!.tags).toContain('culture');
    expect(profile!.tags).toContain('city');
    expect(profile!.tags).toContain('history');
  });

  it('generates Beach Enthusiast for beach + relaxation', () => {
    const profile = generateTravelerProfile({ landscape: 'Beach', style: 'Relaxation' });
    expect(profile!.type).toBe('Beach Enthusiast');
    expect(profile!.tags).toContain('beach');
    expect(profile!.tags).toContain('relaxation');
  });

  it('generates Gourmet Traveler for gastronomy', () => {
    const profile = generateTravelerProfile({ landscape: 'City', style: 'Gastronomy' });
    expect(profile!.type).toBe('Gourmet Traveler');
    expect(profile!.tags).toContain('gastronomy');
    expect(profile!.tags).toContain('food');
  });

  it('deduplicates tags', () => {
    const profile = generateTravelerProfile({
      landscape: 'Beach',
      style: 'Relaxation',
      pace: 'Slow & deep',
    });
    const beachCount = profile!.tags.filter(t => t === 'beach').length;
    expect(beachCount).toBe(1);
    const relaxCount = profile!.tags.filter(t => t === 'relaxation').length;
    expect(relaxCount).toBe(1);
  });

  it('includes raw answer values as tags', () => {
    const profile = generateTravelerProfile({ landscape: 'Beach', style: 'Adventure', companion: 'Solo' });
    expect(profile!.tags).toContain('solo');
    expect(profile!.tags).toContain('beach');
  });
});

describe('getMatchingTags', () => {
  it('returns empty for incomplete quiz', () => {
    expect(getMatchingTags({})).toEqual([]);
  });

  it('returns tags for valid quiz', () => {
    const tags = getMatchingTags({ landscape: 'Beach', style: 'Adventure' });
    expect(tags.length).toBeGreaterThan(0);
    expect(tags).toContain('beach');
    expect(tags).toContain('adventure');
  });
});
