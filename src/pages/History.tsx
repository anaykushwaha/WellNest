import { PageHeader } from '@/components/common/PageHeader';
import { HistoryList } from '@/components/history/HistoryList';
import { useWellnessEntries } from '@/hooks/useWellnessEntries';

export default function History() {
  const { entries, removeEntry } = useWellnessEntries();

  return (
    <div>
      <PageHeader
        title="Wellness History"
        description="Review your past check-ins and track your progress over time."
      />
      <HistoryList entries={entries} onDelete={removeEntry} />
    </div>
  );
}
