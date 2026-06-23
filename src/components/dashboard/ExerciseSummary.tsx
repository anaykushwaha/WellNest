import { Footprints } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { DAILY_EXERCISE_GOAL } from '@/lib/constants';
import type { WellnessEntry } from '@/types/wellness';

interface ExerciseSummaryProps {
  entry: WellnessEntry | null;
  entries: WellnessEntry[];
}

export function ExerciseSummary({ entry, entries }: ExerciseSummaryProps) {
  const minutes = entry?.exerciseMinutes ?? 0;
  const percentage = Math.min(100, Math.round((minutes / DAILY_EXERCISE_GOAL) * 100));

  const recent = entries.slice(0, 7);
  const weeklyTotal = recent.reduce((sum, e) => sum + e.exerciseMinutes, 0);

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
          <Footprints className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Exercise</h3>
          <p className="text-xs text-gray-500">Goal: {DAILY_EXERCISE_GOAL} min/day</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">{minutes}</span>
          <span className="text-sm text-gray-500">min today</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {weeklyTotal} min total this week
        </p>
      </div>
    </Card>
  );
}
