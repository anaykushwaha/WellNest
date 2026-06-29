import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/common/Card';
import { BreathingCircle } from '@/components/breathing/BreathingCircle';
import { BreathingTimer } from '@/components/breathing/BreathingTimer';
import { BreathingControls } from '@/components/breathing/BreathingControls';
import { BreathingModeSelector } from '@/components/breathing/BreathingModeSelector';
import { GroundingExercise } from '@/components/breathing/GroundingExercise';
import { MindfulMinute } from '@/components/breathing/MindfulMinute';
import { useBreathingTimer } from '@/hooks/useBreathingTimer';
import { useWellnessEntries } from '@/hooks/useWellnessEntries';
import {
  BREATHING_MODES,
  getRecommendedBreathingMode,
  type BreathingModeId,
} from '@/lib/constants';

export default function Breathing() {
  const { latestEntry } = useWellnessEntries();
  const recommended = getRecommendedBreathingMode(latestEntry?.stressLevel);
  const [modeId, setModeId] = useState<BreathingModeId>(recommended);

  const { phase, isRunning, secondsLeft, cycleCount, progress, phases, start, pause, reset } =
    useBreathingTimer(modeId);

  const mode = BREATHING_MODES[modeId];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Relaxation Tools"
        description="Guided breathing, grounding, and mindful reflection for general wellness support."
      />

      {latestEntry ? (
        <div className="rounded-xl border border-calm-200 bg-calm-50 px-4 py-3 text-sm text-calm-800">
          Based on your latest check-in stress level ({latestEntry.stressLevel}/10), we
          suggest <strong>{BREATHING_MODES[recommended].label}</strong> breathing. You can
          choose any mode below.
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Complete a check-in to get a personalized breathing suggestion. Defaulting to
          Balanced Breathing.
        </div>
      )}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Guided Breathing</h2>
        <BreathingModeSelector
          selected={modeId}
          recommended={recommended}
          onSelect={setModeId}
        />

        <Card className="mx-auto mt-6 max-w-lg">
          <div className="flex flex-col items-center gap-8 py-8">
            <BreathingCircle phase={phase} progress={progress} isRunning={isRunning} />
            <BreathingTimer phase={phase} secondsLeft={secondsLeft} cycleCount={cycleCount} />
            <BreathingControls
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onReset={reset}
            />
          </div>

          <div className="border-t border-gray-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-900">{mode.label}</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-500">
              <li>Inhale for {phases.inhale} seconds</li>
              <li>Hold for {phases.hold} seconds</li>
              <li>Exhale for {phases.exhale} seconds</li>
            </ul>
            <p className="mt-3 text-xs text-gray-400">
              This is a relaxation practice for general wellness support — not medical
              treatment or diagnosis.
            </p>
          </div>
        </Card>
      </section>

      <section>
        <GroundingExercise />
      </section>

      <section>
        <MindfulMinute />
      </section>
    </div>
  );
}
