import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Pencil, Plus } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MoodSelector } from './MoodSelector';
import { StressSlider } from './StressSlider';
import { SleepInput } from './SleepInput';
import { HydrationInput } from './HydrationInput';
import { ExerciseInput } from './ExerciseInput';
import { NotesInput } from './NotesInput';
import { validateCheckInForm, hasErrors } from '@/lib/validators';
import type { CheckInFormData, FormErrors, MoodType, CheckInMode } from '@/types/wellness';
import type { WellnessEntry } from '@/types/wellness';

interface CheckInFormProps {
  mode: CheckInMode;
  existingEntry?: WellnessEntry | null;
  onCreate: (data: Omit<WellnessEntry, 'id' | 'score' | 'createdAt' | 'updatedAt' | 'date'>) => WellnessEntry;
  onUpdate: (
    id: string,
    data: Omit<WellnessEntry, 'id' | 'score' | 'createdAt' | 'updatedAt' | 'date'>,
  ) => WellnessEntry;
}

const defaultForm: CheckInFormData = {
  mood: '',
  stressLevel: 5,
  sleepHours: 7,
  waterCups: 4,
  exerciseMinutes: 0,
  notes: '',
};

export function CheckInForm({ mode, existingEntry, onCreate, onUpdate }: CheckInFormProps) {
  const navigate = useNavigate();
  const isEdit = mode === 'edit';
  const [form, setForm] = useState<CheckInFormData>(() =>
    existingEntry
      ? {
          mood: existingEntry.mood,
          stressLevel: existingEntry.stressLevel,
          sleepHours: existingEntry.sleepHours,
          waterCups: existingEntry.waterCups,
          exerciseMinutes: existingEntry.exerciseMinutes,
          notes: existingEntry.notes,
        }
      : defaultForm,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof CheckInFormData>(key: K, value: CheckInFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as keyof FormErrors];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckInForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      mood: form.mood as MoodType,
      stressLevel: form.stressLevel,
      sleepHours: form.sleepHours,
      waterCups: form.waterCups,
      exerciseMinutes: form.exerciseMinutes,
      notes: form.notes,
    };

    if (isEdit && existingEntry) {
      onUpdate(existingEntry.id, payload);
      setSubmitted(true);
      setTimeout(() => navigate('/history', { state: { checkInUpdated: true } }), 1200);
    } else {
      onCreate(payload);
      setSubmitted(true);
      setTimeout(() => navigate('/', { state: { checkInSuccess: true } }), 1200);
    }
  };

  if (submitted) {
    return (
      <Card className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-wellness-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {isEdit ? 'Check-In Updated!' : 'Check-In Saved!'}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {isEdit ? 'Redirecting to history...' : 'Redirecting to your dashboard...'}
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant={isEdit ? 'info' : 'success'}>
            {isEdit ? (
              <>
                <Pencil className="mr-1 inline h-3 w-3" />
                Editing Check-In
              </>
            ) : (
              <>
                <Plus className="mr-1 inline h-3 w-3" />
                New Check-In
              </>
            )}
          </Badge>
        </div>

        <MoodSelector
          value={form.mood}
          onChange={(m) => update('mood', m)}
          error={errors.mood}
        />
        <StressSlider
          value={form.stressLevel}
          onChange={(v) => update('stressLevel', v)}
          error={errors.stressLevel}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <SleepInput
            value={form.sleepHours}
            onChange={(v) => update('sleepHours', v)}
            error={errors.sleepHours}
          />
          <HydrationInput
            value={form.waterCups}
            onChange={(v) => update('waterCups', v)}
            error={errors.waterCups}
          />
        </div>
        <ExerciseInput
          value={form.exerciseMinutes}
          onChange={(v) => update('exerciseMinutes', v)}
          error={errors.exerciseMinutes}
        />
        <NotesInput value={form.notes} onChange={(v) => update('notes', v)} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" size="lg" fullWidth>
            {isEdit ? 'Save Changes' : 'Save Check-In'}
          </Button>
          {isEdit && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate('/history')}
            >
              Cancel
            </Button>
          )}
        </div>
      </Card>
    </form>
  );
}
