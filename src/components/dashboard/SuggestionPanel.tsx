import { Link } from 'react-router-dom';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { generateSuggestions } from '@/lib/suggestionEngine';
import type { WellnessEntry } from '@/types/wellness';

interface SuggestionPanelProps {
  entry: WellnessEntry | null;
}

const priorityVariant = {
  high: 'danger' as const,
  medium: 'warning' as const,
  low: 'success' as const,
};

export function SuggestionPanel({ entry }: SuggestionPanelProps) {
  const suggestions = generateSuggestions(entry).slice(0, 4);

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h3 className="text-sm font-semibold text-gray-900">Wellness Suggestions</h3>
      </div>
      <div className="mt-4 space-y-3">
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-gray-900">{s.title}</p>
              <Badge variant={priorityVariant[s.priority]}>{s.priority}</Badge>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">{s.message}</p>
            {s.action && s.actionPath && (
              <Link
                to={s.actionPath}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-wellness-600 hover:text-wellness-700"
              >
                {s.action}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Suggestions are for general wellness support only — not medical advice.
      </p>
    </Card>
  );
}
