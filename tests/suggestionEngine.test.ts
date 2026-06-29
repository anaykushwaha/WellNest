import { describe, it, expect } from 'vitest';
import { generateSuggestions } from '../src/lib/suggestionEngine';
import type { WellnessEntry } from '../src/types/wellness';

const baseEntry: WellnessEntry = {
  id: 'test-1',
  createdAt: '2026-06-22T10:00:00.000Z',
  date: '2026-06-22',
  mood: 'good',
  stressLevel: 3,
  sleepHours: 8,
  waterCups: 8,
  exerciseMinutes: 30,
  notes: '',
  score: 90,
};

describe('suggestionEngine', () => {
  it('returns start journey suggestion when entry is null', () => {
    const suggestions = generateSuggestions(null);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].id).toBe('no-data');
    expect(suggestions[0].actionPath).toBe('/check-in/new');
  });

  it('suggests improving sleep when below 6 hours', () => {
    const suggestions = generateSuggestions({ ...baseEntry, sleepHours: 5 });
    expect(suggestions.some((s) => s.id === 'sleep-low')).toBe(true);
  });

  it('suggests hydration when water intake is low', () => {
    const suggestions = generateSuggestions({ ...baseEntry, waterCups: 2 });
    expect(suggestions.some((s) => s.id === 'hydration-low')).toBe(true);
  });

  it('suggests breathing exercise when stress is high', () => {
    const suggestions = generateSuggestions({ ...baseEntry, stressLevel: 8 });
    expect(suggestions.some((s) => s.id === 'stress-high')).toBe(true);
    const breathing = suggestions.find((s) => s.id === 'stress-high');
    expect(breathing?.actionPath).toBe('/breathing');
  });

  it('suggests exercise when activity is low', () => {
    const suggestions = generateSuggestions({ ...baseEntry, exerciseMinutes: 5 });
    expect(suggestions.some((s) => s.id === 'exercise-low')).toBe(true);
  });

  it('suggests mood support for low or stressed mood', () => {
    const suggestions = generateSuggestions({ ...baseEntry, mood: 'low' });
    expect(suggestions.some((s) => s.id === 'mood-support')).toBe(true);
  });

  it('returns positive feedback when all metrics are good', () => {
    const suggestions = generateSuggestions(baseEntry);
    expect(suggestions.some((s) => s.id === 'all-good')).toBe(true);
  });

  it('sorts suggestions by priority', () => {
    const suggestions = generateSuggestions({
      ...baseEntry,
      sleepHours: 4,
      stressLevel: 9,
      waterCups: 1,
    });
    const priorities = suggestions.map((s) => s.priority);
    const order = { high: 0, medium: 1, low: 2 };
    for (let i = 1; i < priorities.length; i++) {
      expect(order[priorities[i]]).toBeGreaterThanOrEqual(order[priorities[i - 1]]);
    }
  });
});
