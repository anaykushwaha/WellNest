import { Moon } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { RECOMMENDED_SLEEP } from '@/lib/constants';
import type { WellnessEntry } from '@/types/wellness';

interface SleepSummaryCardProps {
  entries: WellnessEntry[];
  latestEntry: WellnessEntry | null;
}

export function SleepSummaryCard({ entries, latestEntry }: SleepSummaryCardProps) {
  const recent = entries.slice(0, 7);
  const avgSleep =
    recent.length > 0
      ? (recent.reduce((sum, e) => sum + e.sleepHours, 0) / recent.length).toFixed(1)
      : '—';

  const lastNight = latestEntry?.sleepHours ?? 0;
  const sleepQuality =
    lastNight >= 7 && lastNight <= 9
      ? 'Optimal'
      : lastNight >= 6
        ? 'Fair'
        : lastNight > 0
          ? 'Low'
          : 'No data';

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <Moon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Sleep Summary</h3>
          <p className="text-xs text-gray-500">Goal: {RECOMMENDED_SLEEP}+ hours</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {latestEntry ? `${lastNight}h` : '—'}
          </p>
          <p className="text-xs text-gray-500">Last night</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{avgSleep}h</p>
          <p className="text-xs text-gray-500">7-day average</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Quality</span>
          <span className="font-medium text-indigo-600">{sleepQuality}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-indigo-400 transition-all"
            style={{
              width: `${Math.min(100, (lastNight / RECOMMENDED_SLEEP) * 100)}%`,
            }}
          />
        </div>
      </div>
    </Card>
  );
}
