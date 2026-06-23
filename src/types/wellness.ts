export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'stressed';

export interface WellnessEntry {
  id: string;
  date: string;
  mood: MoodType;
  stressLevel: number;
  sleepHours: number;
  waterCups: number;
  exerciseMinutes: number;
  notes: string;
  score: number;
}

export interface WellnessScoreBreakdown {
  total: number;
  moodScore: number;
  sleepScore: number;
  hydrationScore: number;
  exerciseScore: number;
  stressScore: number;
}

export interface CheckInFormData {
  mood: MoodType | '';
  stressLevel: number;
  sleepHours: number;
  waterCups: number;
  exerciseMinutes: number;
  notes: string;
}

export interface FormErrors {
  mood?: string;
  stressLevel?: string;
  sleepHours?: string;
  waterCups?: string;
  exerciseMinutes?: string;
}
