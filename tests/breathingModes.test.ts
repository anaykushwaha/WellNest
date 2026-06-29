import { describe, it, expect } from 'vitest';
import { getRecommendedBreathingMode } from '../src/lib/constants';

describe('breathing modes', () => {
  it('recommends low stress mode for levels 1-3', () => {
    expect(getRecommendedBreathingMode(1)).toBe('low');
    expect(getRecommendedBreathingMode(3)).toBe('low');
  });

  it('recommends medium stress mode for levels 4-7', () => {
    expect(getRecommendedBreathingMode(4)).toBe('medium');
    expect(getRecommendedBreathingMode(7)).toBe('medium');
  });

  it('recommends high stress mode for levels 8-10', () => {
    expect(getRecommendedBreathingMode(8)).toBe('high');
    expect(getRecommendedBreathingMode(10)).toBe('high');
  });

  it('defaults to medium when no stress data', () => {
    expect(getRecommendedBreathingMode(undefined)).toBe('medium');
  });
});
