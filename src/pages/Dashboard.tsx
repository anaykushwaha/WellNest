import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClipboardCheck, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/common/Button';
import { WellnessScoreCard } from '@/components/dashboard/WellnessScoreCard';
import { MoodTrendChart } from '@/components/dashboard/MoodTrendChart';
import { SleepSummaryCard } from '@/components/dashboard/SleepSummaryCard';
import { HydrationProgress } from '@/components/dashboard/HydrationProgress';
import { ExerciseSummary } from '@/components/dashboard/ExerciseSummary';
import { SuggestionPanel } from '@/components/dashboard/SuggestionPanel';
import { useWellnessEntries } from '@/hooks/useWellnessEntries';

export default function Dashboard() {
  const { entries, latestEntry, hasEntries } = useWellnessEntries();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.checkInSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (!hasEntries) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Your latest wellness overview."
        />
        <EmptyState
          icon={Sparkles}
          title="Welcome to WellNest!"
          description="Start your wellness journey by completing your first check-in. Track mood, sleep, hydration, and more."
          actionLabel="Create First Check-In"
          onAction={() => (window.location.href = '/check-in/new')}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your latest wellness overview."
        action={
          <Link to="/check-in/new">
            <Button variant="secondary">
              <ClipboardCheck className="h-4 w-4" />
              New Check-In
            </Button>
          </Link>
        }
      />

      {showSuccess && (
        <div className="mb-6 rounded-xl border border-wellness-200 bg-wellness-50 px-4 py-3 text-sm text-wellness-700">
          Check-in saved successfully! Your wellness score has been updated.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <WellnessScoreCard entry={latestEntry} />
        <div className="lg:col-span-2">
          <MoodTrendChart entries={entries} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SleepSummaryCard entries={entries} latestEntry={latestEntry} />
        <HydrationProgress entry={latestEntry} />
        <ExerciseSummary entry={latestEntry} entries={entries} />
      </div>

      <div className="mt-6">
        <SuggestionPanel entry={latestEntry} />
      </div>
    </div>
  );
}
