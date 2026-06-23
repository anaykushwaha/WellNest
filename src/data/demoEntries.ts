import type { WellnessEntry } from '@/types/wellness';

/** Demo entries for development — not loaded automatically */
export const demoEntries: WellnessEntry[] = [
  {
    id: 'demo-1',
    date: '2026-06-20',
    mood: 'good',
    stressLevel: 4,
    sleepHours: 7.5,
    waterCups: 7,
    exerciseMinutes: 25,
    notes: 'Had a productive study session.',
    score: 78,
  },
  {
    id: 'demo-2',
    date: '2026-06-19',
    mood: 'okay',
    stressLevel: 6,
    sleepHours: 5.5,
    waterCups: 5,
    exerciseMinutes: 10,
    notes: 'Exam week — feeling a bit tired.',
    score: 58,
  },
  {
    id: 'demo-3',
    date: '2026-06-18',
    mood: 'great',
    stressLevel: 2,
    sleepHours: 8,
    waterCups: 9,
    exerciseMinutes: 40,
    notes: 'Great day! Went for a run.',
    score: 92,
  },
];
