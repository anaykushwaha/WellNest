import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { HistoryList } from '@/components/history/HistoryList';
import { useWellnessEntries } from '@/hooks/useWellnessEntries';

export default function History() {
  const { entries, removeEntry } = useWellnessEntries();
  const location = useLocation();
  const [showUpdated, setShowUpdated] = useState(false);

  useEffect(() => {
    if (location.state?.checkInUpdated) {
      setShowUpdated(true);
      const timer = setTimeout(() => setShowUpdated(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div>
      <PageHeader
        title="Wellness History"
        description="View and manage all your saved wellness check-ins."
        action={
          <Link to="/check-in/new">
            <Button variant="secondary">
              <Plus className="h-4 w-4" />
              New Check-In
            </Button>
          </Link>
        }
      />

      {showUpdated && (
        <div className="mb-6 rounded-xl border border-wellness-200 bg-wellness-50 px-4 py-3 text-sm text-wellness-700">
          Check-in updated successfully.
        </div>
      )}

      <HistoryList entries={entries} onDelete={removeEntry} />
    </div>
  );
}
