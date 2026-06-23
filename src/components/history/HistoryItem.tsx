import { Trash2 } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { formatDate } from '@/lib/dateUtils';
import { MOOD_OPTIONS } from '@/lib/constants';
import { getScoreColor } from '@/lib/scoreUtils';
import type { WellnessEntry } from '@/types/wellness';

interface HistoryItemProps {
  entry: WellnessEntry;
  onDelete: (id: string) => void;
}

export function HistoryItem({ entry, onDelete }: HistoryItemProps) {
  const moodOption = MOOD_OPTIONS.find((m) => m.value === entry.mood);

  return (
    <Card padding="sm" className="transition-shadow hover:shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-900">{formatDate(entry.date)}</span>
            <Badge variant="success">
              {moodOption?.emoji} {moodOption?.label}
            </Badge>
            <span className={`text-sm font-bold ${getScoreColor(entry.score)}`}>
              Score: {entry.score}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
            <div>
              <span className="text-gray-400">Sleep</span>
              <p className="font-medium">{entry.sleepHours}h</p>
            </div>
            <div>
              <span className="text-gray-400">Water</span>
              <p className="font-medium">{entry.waterCups} cups</p>
            </div>
            <div>
              <span className="text-gray-400">Exercise</span>
              <p className="font-medium">{entry.exerciseMinutes} min</p>
            </div>
            <div>
              <span className="text-gray-400">Stress</span>
              <p className="font-medium">{entry.stressLevel}/10</p>
            </div>
          </div>
          {entry.notes && (
            <p className="mt-3 text-sm italic text-gray-500">&ldquo;{entry.notes}&rdquo;</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(entry.id)}
          className="self-start text-gray-400 hover:text-red-500"
          aria-label="Delete entry"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
