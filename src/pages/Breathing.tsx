import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/common/Card';
import { BreathingCircle } from '@/components/breathing/BreathingCircle';
import { BreathingTimer } from '@/components/breathing/BreathingTimer';
import { BreathingControls } from '@/components/breathing/BreathingControls';
import { useBreathingTimer } from '@/hooks/useBreathingTimer';
import { BREATHING_PHASES } from '@/lib/constants';

export default function Breathing() {
  const { phase, isRunning, secondsLeft, cycleCount, progress, start, pause, reset } =
    useBreathingTimer();

  return (
    <div>
      <PageHeader
        title="Breathing Exercise"
        description="A guided 4-4-6 breathing technique to help you feel more calm and centered."
      />

      <Card className="mx-auto max-w-lg">
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
          <h3 className="text-sm font-semibold text-gray-900">How it works</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-500">
            <li>Inhale for {BREATHING_PHASES.inhale} seconds</li>
            <li>Hold for {BREATHING_PHASES.hold} seconds</li>
            <li>Exhale for {BREATHING_PHASES.exhale} seconds</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            This exercise is for general relaxation support only — not a substitute for
            professional care.
          </p>
        </div>
      </Card>
    </div>
  );
}
