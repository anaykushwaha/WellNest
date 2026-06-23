import { useMemo } from 'react';
import type { WellnessEntry } from '@/types/wellness';
import { calculateWellnessScore, getScoreLabel, getScoreColor } from '@/lib/scoreUtils';

export function useWellnessScore(entry: WellnessEntry | null) {
  const breakdown = useMemo(() => {
    if (!entry) return null;
    return calculateWellnessScore(entry);
  }, [entry]);

  const label = useMemo(() => {
    if (!breakdown) return 'No Data';
    return getScoreLabel(breakdown.total);
  }, [breakdown]);

  const colorClass = useMemo(() => {
    if (!breakdown) return 'text-gray-400';
    return getScoreColor(breakdown.total);
  }, [breakdown]);

  return { breakdown, label, colorClass, score: breakdown?.total ?? 0 };
}
