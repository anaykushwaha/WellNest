import { useState, useEffect, useCallback, useRef } from 'react';
import { BREATHING_PHASES } from '@/lib/constants';

export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'idle';

const PHASE_ORDER: BreathingPhase[] = ['inhale', 'hold', 'exhale'];

export function useBreathingTimer() {
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const phaseIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getPhaseDuration = useCallback((p: BreathingPhase): number => {
    if (p === 'idle') return 0;
    return BREATHING_PHASES[p];
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advancePhase = useCallback(() => {
    const nextIndex = (phaseIndexRef.current + 1) % PHASE_ORDER.length;
    if (nextIndex === 0) {
      setCycleCount((c) => c + 1);
    }
    phaseIndexRef.current = nextIndex;
    const nextPhase = PHASE_ORDER[nextIndex];
    setPhase(nextPhase);
    setSecondsLeft(getPhaseDuration(nextPhase));
  }, [getPhaseDuration]);

  const start = useCallback(() => {
    if (phase === 'idle') {
      phaseIndexRef.current = 0;
      setPhase('inhale');
      setSecondsLeft(BREATHING_PHASES.inhale);
    }
    setIsRunning(true);
  }, [phase]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setPhase('idle');
    setSecondsLeft(0);
    setCycleCount(0);
    phaseIndexRef.current = 0;
  }, [clearTimer]);

  useEffect(() => {
    if (!isRunning || phase === 'idle') return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          advancePhase();
          return getPhaseDuration(PHASE_ORDER[(phaseIndexRef.current) % PHASE_ORDER.length]);
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, phase, advancePhase, getPhaseDuration, clearTimer]);

  const phaseDuration = phase === 'idle' ? 0 : getPhaseDuration(phase);
  const progress =
    phaseDuration > 0 ? ((phaseDuration - secondsLeft) / phaseDuration) * 100 : 0;

  return {
    phase,
    isRunning,
    secondsLeft,
    cycleCount,
    progress,
    phaseDuration,
    start,
    pause,
    reset,
  };
}
