import { useMemo, useState } from 'react';
import { HistoryItem } from './HistoryItem';
import { HistoryFilters, type SortOption } from './HistoryFilters';
import { EmptyState } from '@/components/common/EmptyState';
import { History } from 'lucide-react';
import type { WellnessEntry } from '@/types/wellness';

interface HistoryListProps {
  entries: WellnessEntry[];
  onDelete: (id: string) => void;
}

export function HistoryList({ entries, onDelete }: HistoryListProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('date-desc');

  const filtered = useMemo(() => {
    let result = [...entries];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.notes.toLowerCase().includes(query) ||
          e.mood.toLowerCase().includes(query) ||
          e.date.includes(query),
      );
    }

    switch (sort) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'score-desc':
        result.sort((a, b) => b.score - a.score);
        break;
      case 'score-asc':
        result.sort((a, b) => a.score - b.score);
        break;
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [entries, search, sort]);

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No History Yet"
        description="Your wellness check-ins will appear here once you start tracking."
        actionLabel="Start Check-In"
        onAction={() => (window.location.href = '/check-in')}
      />
    );
  }

  return (
    <div>
      <HistoryFilters
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        totalCount={filtered.length}
      />
      <div className="space-y-3">
        {filtered.map((entry) => (
          <HistoryItem key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </div>
      {filtered.length === 0 && search && (
        <p className="py-8 text-center text-sm text-gray-500">
          No entries match your search.
        </p>
      )}
    </div>
  );
}
