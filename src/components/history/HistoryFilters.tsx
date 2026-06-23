import { Search } from 'lucide-react';

export type SortOption = 'date-desc' | 'date-asc' | 'score-desc' | 'score-asc';

interface HistoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  totalCount: number;
}

export function HistoryFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
  totalCount,
}: HistoryFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        {totalCount} check-in{totalCount !== 1 ? 's' : ''} recorded
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-wellness-500 focus:outline-none focus:ring-2 focus:ring-wellness-500/20 sm:w-64"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-wellness-500 focus:outline-none focus:ring-2 focus:ring-wellness-500/20"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="score-desc">Highest Score</option>
          <option value="score-asc">Lowest Score</option>
        </select>
      </div>
    </div>
  );
}
