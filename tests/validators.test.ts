import { describe, it, expect } from 'vitest';
import { validateCheckInForm, hasErrors, clamp } from '../src/lib/validators';
import type { CheckInFormData } from '../src/types/wellness';

const validForm: CheckInFormData = {
  mood: 'good',
  stressLevel: 5,
  sleepHours: 7,
  waterCups: 6,
  exerciseMinutes: 20,
  notes: 'Feeling okay',
};

describe('validators', () => {
  it('returns no errors for valid form', () => {
    const errors = validateCheckInForm(validForm);
    expect(hasErrors(errors)).toBe(false);
  });

  it('requires mood selection', () => {
    const errors = validateCheckInForm({ ...validForm, mood: '' });
    expect(errors.mood).toBeDefined();
  });

  it('validates stress level range 1-10', () => {
    expect(validateCheckInForm({ ...validForm, stressLevel: 0 }).stressLevel).toBeDefined();
    expect(validateCheckInForm({ ...validForm, stressLevel: 11 }).stressLevel).toBeDefined();
    expect(validateCheckInForm({ ...validForm, stressLevel: 5 }).stressLevel).toBeUndefined();
  });

  it('validates sleep hours range 0-24', () => {
    expect(validateCheckInForm({ ...validForm, sleepHours: -1 }).sleepHours).toBeDefined();
    expect(validateCheckInForm({ ...validForm, sleepHours: 25 }).sleepHours).toBeDefined();
    expect(validateCheckInForm({ ...validForm, sleepHours: 8 }).sleepHours).toBeUndefined();
  });

  it('validates water cups is non-negative', () => {
    expect(validateCheckInForm({ ...validForm, waterCups: -1 }).waterCups).toBeDefined();
    expect(validateCheckInForm({ ...validForm, waterCups: 0 }).waterCups).toBeUndefined();
  });

  it('validates exercise minutes is non-negative', () => {
    expect(
      validateCheckInForm({ ...validForm, exerciseMinutes: -5 }).exerciseMinutes,
    ).toBeDefined();
    expect(
      validateCheckInForm({ ...validForm, exerciseMinutes: 0 }).exerciseMinutes,
    ).toBeUndefined();
  });

  it('clamps values within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
