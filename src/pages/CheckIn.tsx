import { PageHeader } from '@/components/common/PageHeader';
import { CheckInForm } from '@/components/checkin/CheckInForm';
import { useWellnessEntries } from '@/hooks/useWellnessEntries';

export default function CheckIn() {
  const { saveCheckIn, todayEntry } = useWellnessEntries();

  return (
    <div>
      <PageHeader
        title="Daily Check-In"
        description="Take a moment to reflect on how you're doing today."
      />
      <div className="mx-auto max-w-2xl">
        <CheckInForm onSubmit={saveCheckIn} existingEntry={todayEntry} />
      </div>
    </div>
  );
}
