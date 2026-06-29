import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const DURATION = 60;

export function MindfulMinute() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = () => setIsRunning(true);
  const pause = () => {
    setIsRunning(false);
    clearTimer();
  };

  const reset = () => {
    clearTimer();
    setIsRunning(false);
    setSecondsLeft(DURATION);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, clearTimer]);

  const progress = ((DURATION - secondsLeft) / DURATION) * 100;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">Mindful Minute</h3>
      <p className="mt-1 text-sm text-gray-500">
        Take 60 seconds for quiet self-reflection. Sit comfortably, breathe naturally,
        and let your thoughts pass without judgment.
      </p>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="2" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progress} 100`}
              className="text-wellness-500"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-3xl font-bold tabular-nums text-wellness-700">
            {secondsLeft}
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          {!isRunning ? (
            <Button onClick={start} disabled={secondsLeft === 0}>
              <Play className="h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button onClick={pause} variant="secondary">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          <Button onClick={reset} variant="ghost">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {secondsLeft === 0 && (
          <p className="mt-4 text-sm text-wellness-600">
            Nice work — you completed your mindful minute.
          </p>
        )}
      </div>
    </Card>
  );
}
