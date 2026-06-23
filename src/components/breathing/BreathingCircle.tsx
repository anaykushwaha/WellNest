import type { BreathingPhase } from '@/hooks/useBreathingTimer';

interface BreathingCircleProps {
  phase: BreathingPhase;
  progress: number;
  isRunning: boolean;
}

const phaseLabels: Record<BreathingPhase, string> = {
  idle: 'Ready',
  inhale: 'Breathe In',
  hold: 'Hold',
  exhale: 'Breathe Out',
};

const phaseColors: Record<BreathingPhase, string> = {
  idle: 'from-wellness-200 to-wellness-300',
  inhale: 'from-calm-300 to-wellness-400',
  hold: 'from-wellness-400 to-wellness-500',
  exhale: 'from-wellness-300 to-calm-200',
};

export function BreathingCircle({ phase, progress, isRunning }: BreathingCircleProps) {
  const baseScale = phase === 'idle' ? 0.6 : 0.6;
  const targetScale =
    phase === 'inhale' ? 1 : phase === 'hold' ? 1 : phase === 'exhale' ? 0.6 : baseScale;
  const currentScale =
    phase === 'idle'
      ? baseScale
      : baseScale + (targetScale - baseScale) * (progress / 100);

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <div
        className={`absolute rounded-full bg-gradient-to-br opacity-20 transition-transform duration-1000 ease-in-out ${phaseColors[phase]}`}
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${currentScale})`,
        }}
      />
      <div
        className={`relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br shadow-soft transition-transform duration-1000 ease-in-out ${phaseColors[phase]} ${isRunning ? 'animate-pulse' : ''}`}
        style={{ transform: `scale(${currentScale})` }}
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-white drop-shadow-sm">
            {phaseLabels[phase]}
          </p>
          {phase !== 'idle' && (
            <p className="mt-1 text-sm text-white/80 capitalize">{phase}</p>
          )}
        </div>
      </div>
    </div>
  );
}
