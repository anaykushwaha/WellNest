import { useParams, Navigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckInForm } from '@/components/checkin/CheckInForm';
import { useWellnessEntries } from '@/hooks/useWellnessEntries';

export default function CheckIn() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { createCheckIn, updateCheckIn, getEntry } = useWellnessEntries();

  if (isEdit) {
    const entry = getEntry(id!);
    if (!entry) {
      return <Navigate to="/check-in/new" replace />;
    }

    return (
      <div>
        <PageHeader
          title="Edit Check-In"
          description="Update this wellness check-in. Your original date and time will be preserved."
        />
        <div className="mx-auto max-w-2xl">
          <CheckInForm
            mode="edit"
            existingEntry={entry}
            onCreate={createCheckIn}
            onUpdate={updateCheckIn}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Daily Check-In"
        description="Take a moment to reflect on how you're doing. Each check-in is saved as its own entry."
      />
      <div className="mx-auto max-w-2xl">
        <CheckInForm mode="new" onCreate={createCheckIn} onUpdate={updateCheckIn} />
      </div>
    </div>
  );
}
