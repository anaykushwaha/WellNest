import { Droplets } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { DAILY_WATER_GOAL } from '@/lib/constants';
import type { WellnessEntry } from '@/types/wellness';

interface HydrationProgressProps {
  entry: WellnessEntry | null;
}

export function HydrationProgress({ entry }: HydrationProgressProps) {
  const cups = entry?.waterCups ?? 0;
  const percentage = Math.min(100, Math.round((cups / DAILY_WATER_GOAL) * 100));

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-calm-50 p-3 text-calm-600">
          <Droplets className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Hydration</h3>
          <p className="text-xs text-gray-500">Daily goal: {DAILY_WATER_GOAL} cups</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">{cups}</span>
          <span className="text-sm text-gray-500">/ {DAILY_WATER_GOAL} cups</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-calm-400 to-calm-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">{percentage}% of daily goal</p>
      </div>
    </Card>
  );
}
