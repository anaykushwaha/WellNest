import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface BreathingControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function BreathingControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: BreathingControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {!isRunning ? (
        <Button onClick={onStart} size="lg">
          <Play className="h-4 w-4" />
          Start
        </Button>
      ) : (
        <Button onClick={onPause} variant="secondary" size="lg">
          <Pause className="h-4 w-4" />
          Pause
        </Button>
      )}
      <Button onClick={onReset} variant="ghost" size="lg">
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
