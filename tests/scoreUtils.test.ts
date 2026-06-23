import { describe, it, expect } from 'vitest';
import {
  calculateWellnessScore,
  scoreSleep,
  scoreHydration,
  scoreExercise,
  scoreStress,
  getScoreLabel,
} from '../src/lib/scoreUtils';

describe('scoreUtils', () => {
  it('calculates a high score for optimal wellness entry', () => {
    const result = calculateWellnessScore({
      mood: 'great',
      sleepHours: 8,
      waterCups: 8,
      exerciseMinutes: 30,
      stressLevel: 2,
    });
    expect(result.total).toBeGreaterThanOrEqual(85);
    expect(result.moodScore).toBe(100);
    expect(result.sleepScore).toBe(100);
  });

  it('calculates a lower score for poor wellness entry', () => {
    const result = calculateWellnessScore({
      mood: 'stressed',
      sleepHours: 4,
      waterCups: 1,
      exerciseMinutes: 0,
      stressLevel: 9,
    });
    expect(result.total).toBeLessThan(50);
  });

  it('scores sleep optimally at 7-9 hours', () => {
    expect(scoreSleep(7)).toBe(100);
    expect(scoreSleep(8)).toBe(100);
    expect(scoreSleep(9)).toBe(100);
  });

  it('scores sleep lower below 6 hours', () => {
    expect(scoreSleep(5)).toBe(50);
    expect(scoreSleep(3)).toBe(20);
  });

  it('scores hydration proportionally to 8 cups', () => {
    expect(scoreHydration(8)).toBe(100);
    expect(scoreHydration(4)).toBe(50);
  });

  it('scores exercise proportionally to 30 minutes', () => {
    expect(scoreExercise(30)).toBe(100);
    expect(scoreExercise(15)).toBe(50);
  });

  it('inverts stress level for scoring', () => {
    expect(scoreStress(1)).toBe(100);
    expect(scoreStress(10)).toBe(0);
  });

  it('returns correct score labels', () => {
    expect(getScoreLabel(90)).toBe('Excellent');
    expect(getScoreLabel(75)).toBe('Good');
    expect(getScoreLabel(60)).toBe('Fair');
    expect(getScoreLabel(45)).toBe('Needs Care');
    expect(getScoreLabel(30)).toBe('Low');
  });
});
