import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { WellnessEntry } from '@/types/wellness';
import { loadEntries, addEntry, deleteEntry, saveEntries } from '@/lib/storage';
import { sortEntriesByDateDesc, getTodayDate } from '@/lib/dateUtils';
import { calculateWellnessScore } from '@/lib/scoreUtils';
import { demoEntries } from '@/data/demoEntries';

interface WellnessContextValue {
  entries: WellnessEntry[];
  todayEntry: WellnessEntry | undefined;
  latestEntry: WellnessEntry | null;
  hasEntries: boolean;
  saveCheckIn: (
    data: Omit<WellnessEntry, 'id' | 'score'> & { id?: string },
  ) => WellnessEntry;
  removeEntry: (id: string) => void;
  refresh: () => void;
}

const WellnessContext = createContext<WellnessContextValue | null>(null);

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<WellnessEntry[]>(() => loadEntries());

  const refresh = useCallback(() => {
    setEntries(loadEntries());
  }, []);

  const saveCheckIn = useCallback(
    (data: Omit<WellnessEntry, 'id' | 'score'> & { id?: string }): WellnessEntry => {
      const breakdown = calculateWellnessScore(data);
      const entry: WellnessEntry = {
        id: data.id ?? crypto.randomUUID(),
        date: data.date,
        mood: data.mood,
        stressLevel: data.stressLevel,
        sleepHours: data.sleepHours,
        waterCups: data.waterCups,
        exerciseMinutes: data.exerciseMinutes,
        notes: data.notes,
        score: breakdown.total,
      };
      const updated = addEntry(entry);
      setEntries(updated);
      return entry;
    },
    [],
  );

  const removeEntry = useCallback((id: string) => {
    const updated = deleteEntry(id);
    setEntries(updated);
  }, []);

  const sortedEntries = useMemo(() => sortEntriesByDateDesc(entries), [entries]);
  const todayEntry = useMemo(
    () => entries.find((e) => e.date === getTodayDate()),
    [entries],
  );
  const latestEntry = useMemo(() => sortedEntries[0] ?? null, [sortedEntries]);

  const value = useMemo(
    () => ({
      entries: sortedEntries,
      todayEntry,
      latestEntry,
      hasEntries: entries.length > 0,
      saveCheckIn,
      removeEntry,
      refresh,
    }),
    [sortedEntries, todayEntry, latestEntry, entries.length, saveCheckIn, removeEntry, refresh],
  );

  return (
    <WellnessContext.Provider value={value}>{children}</WellnessContext.Provider>
  );
}

export function useWellnessEntries() {
  const ctx = useContext(WellnessContext);
  if (!ctx) {
    throw new Error('useWellnessEntries must be used within WellnessProvider');
  }
  return ctx;
}

export function loadDemoData() {
  saveEntries(demoEntries);
}
