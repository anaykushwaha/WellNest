import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useWellnessScore } from '@/hooks/useWellnessScore';
import type { WellnessEntry } from '@/types/wellness';

interface WellnessScoreCardProps {
  entry: WellnessEntry | null;
}

export function WellnessScoreCard({ entry }: WellnessScoreCardProps) {
  const { score, label, colorClass, breakdown } = useWellnessScore(entry);

  if (!entry || !breakdown) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <p className="text-sm font-medium text-gray-500">Wellness Score</p>
        <p className="mt-4 text-4xl font-bold text-gray-300">—</p>
        <p className="mt-2 text-sm text-gray-400">Complete a check-in to see your score</p>
      </Card>
    );
  }

  const segments = [
    { label: 'Mood', value: breakdown.moodScore, weight: '25%' },
    { label: 'Sleep', value: breakdown.sleepScore, weight: '25%' },
    { label: 'Hydration', value: breakdown.hydrationScore, weight: '20%' },
    { label: 'Exercise', value: breakdown.exerciseScore, weight: '20%' },
    { label: 'Stress', value: breakdown.stressScore, weight: '10%' },
  ];

  return (
    <Card className="col-span-full lg:col-span-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Today&apos;s Wellness Score</p>
          <p className={`mt-2 text-5xl font-bold ${colorClass}`}>{score}</p>
          <Badge variant="success" className="mt-2">
            {label}
          </Badge>
        </div>
        <div className="relative h-20 w-20">
          <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${score} 100`}
              className="text-wellness-500"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-3">
            <span className="w-20 text-xs text-gray-500">{seg.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-wellness-400 transition-all"
                style={{ width: `${seg.value}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs font-medium text-gray-600">
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
