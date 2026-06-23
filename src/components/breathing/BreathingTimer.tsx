import type { BreathingPhase } from '@/hooks/useBreathingTimer';

interface BreathingTimerProps {
  phase: BreathingPhase;
  secondsLeft: number;
  cycleCount: number;
}

export function BreathingTimer({ phase, secondsLeft, cycleCount }: BreathingTimerProps) {
  return (
    <div className="text-center">
      <p className="text-5xl font-bold tabular-nums text-wellness-700">
        {phase === 'idle' ? '—' : secondsLeft}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        {phase === 'idle'
          ? 'Press Start to begin'
          : `${phase.charAt(0).toUpperCase() + phase.slice(1)} phase`}
      </p>
      {cycleCount > 0 && (
        <p className="mt-1 text-xs text-gray-400">
          {cycleCount} cycle{cycleCount !== 1 ? 's' : ''} completed
        </p>
      )}
    </div>
  );
}
