import type { WellnessEntry, WellnessScoreBreakdown } from '@/types/wellness';
import { MOOD_OPTIONS } from './constants';

/**
 * Transparent wellness scoring (0–100):
 * - Mood: 25% (mapped from mood selection)
 * - Sleep: 25% (optimal 7–9 hrs)
 * - Hydration: 20% (goal 8 cups)
 * - Exercise: 20% (goal 30 min)
 * - Stress: 10% (inverted 1–10 scale)
 */
export function calculateWellnessScore(
  entry: Pick<
    WellnessEntry,
    'mood' | 'sleepHours' | 'waterCups' | 'exerciseMinutes' | 'stressLevel'
  >,
): WellnessScoreBreakdown {
  const moodOption = MOOD_OPTIONS.find((m) => m.value === entry.mood);
  const moodScore = moodOption?.score ?? 50;

  const sleepScore = scoreSleep(entry.sleepHours);
  const hydrationScore = scoreHydration(entry.waterCups);
  const exerciseScore = scoreExercise(entry.exerciseMinutes);
  const stressScore = scoreStress(entry.stressLevel);

  const total = Math.round(
    moodScore * 0.25 +
      sleepScore * 0.25 +
      hydrationScore * 0.2 +
      exerciseScore * 0.2 +
      stressScore * 0.1,
  );

  return {
    total: Math.min(100, Math.max(0, total)),
    moodScore,
    sleepScore,
    hydrationScore,
    exerciseScore,
    stressScore,
  };
}

export function scoreSleep(hours: number): number {
  if (hours >= 7 && hours <= 9) return 100;
  if (hours >= 6 && hours < 7) return 75;
  if (hours >= 5 && hours < 6) return 50;
  if (hours > 9 && hours <= 10) return 85;
  if (hours > 10) return 70;
  if (hours >= 4) return 35;
  return 20;
}

export function scoreHydration(cups: number): number {
  const ratio = cups / 8;
  return Math.min(100, Math.round(ratio * 100));
}

export function scoreExercise(minutes: number): number {
  const ratio = minutes / 30;
  return Math.min(100, Math.round(ratio * 100));
}

export function scoreStress(level: number): number {
  return Math.round(((10 - level) / 9) * 100);
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Fair';
  if (score >= 40) return 'Needs Care';
  return 'Low';
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-wellness-600';
  if (score >= 70) return 'text-wellness-500';
  if (score >= 55) return 'text-amber-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
}
