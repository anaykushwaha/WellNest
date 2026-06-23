import type { CheckInFormData, FormErrors } from '@/types/wellness';

export function validateCheckInForm(data: CheckInFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.mood) {
    errors.mood = 'Please select your mood.';
  }

  if (data.stressLevel < 1 || data.stressLevel > 10) {
    errors.stressLevel = 'Stress level must be between 1 and 10.';
  }

  if (data.sleepHours < 0 || data.sleepHours > 24) {
    errors.sleepHours = 'Sleep hours must be between 0 and 24.';
  }

  if (data.waterCups < 0) {
    errors.waterCups = 'Water cups cannot be negative.';
  }

  if (data.exerciseMinutes < 0) {
    errors.exerciseMinutes = 'Exercise minutes cannot be negative.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
