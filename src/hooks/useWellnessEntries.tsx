import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { WellnessEntry } from '@/types/wellness';
import {
  loadEntries,
  appendEntry,
  updateEntry as updateStoredEntry,
  deleteEntry,
  getEntryById,
  saveEntries,
} from '@/lib/storage';
import { sortEntriesByCreatedAtDesc, nowIso } from '@/lib/dateUtils';
import { calculateWellnessScore } from '@/lib/scoreUtils';
import { demoEntries } from '@/data/demoEntries';

type CheckInPayload = Omit<WellnessEntry, 'id' | 'score' | 'createdAt' | 'updatedAt' | 'date'>;

interface WellnessContextValue {
  entries: WellnessEntry[];
  latestEntry: WellnessEntry | null;
  hasEntries: boolean;
  getEntry: (id: string) => WellnessEntry | undefined;
  createCheckIn: (data: CheckInPayload) => WellnessEntry;
  updateCheckIn: (id: string, data: CheckInPayload) => WellnessEntry;
  removeEntry: (id: string) => void;
  refresh: () => void;
}

const WellnessContext = createContext<WellnessContextValue | null>(null);

function buildEntry(
  data: CheckInPayload,
  existing?: WellnessEntry,
): WellnessEntry {
  const breakdown = calculateWellnessScore(data);
  const createdAt = existing?.createdAt ?? nowIso();

  return {
    id: existing?.id ?? crypto.randomUUID(),
    createdAt,
    updatedAt: existing ? nowIso() : undefined,
    date: createdAt.split('T')[0],
    mood: data.mood,
    stressLevel: data.stressLevel,
    sleepHours: data.sleepHours,
    waterCups: data.waterCups,
    exerciseMinutes: data.exerciseMinutes,
    notes: data.notes,
    score: breakdown.total,
  };
}

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<WellnessEntry[]>(() => loadEntries());

  const refresh = useCallback(() => {
    setEntries(loadEntries());
  }, []);

  const getEntry = useCallback((id: string) => getEntryById(id), []);

  const createCheckIn = useCallback((data: CheckInPayload): WellnessEntry => {
    const entry = buildEntry(data);
    const updated = appendEntry(entry);
    setEntries(updated);
    return entry;
  }, []);

  const updateCheckIn = useCallback((id: string, data: CheckInPayload): WellnessEntry => {
    const existing = getEntryById(id);
    if (!existing) {
      throw new Error(`Entry not found: ${id}`);
    }
    const entry = buildEntry(data, existing);
    const updated = updateStoredEntry(entry);
    setEntries(updated);
    return entry;
  }, []);

  const removeEntry = useCallback((id: string) => {
    const updated = deleteEntry(id);
    setEntries(updated);
  }, []);

  const sortedEntries = useMemo(() => sortEntriesByCreatedAtDesc(entries), [entries]);
  const latestEntry = useMemo(() => sortedEntries[0] ?? null, [sortedEntries]);

  const value = useMemo(
    () => ({
      entries: sortedEntries,
      latestEntry,
      hasEntries: entries.length > 0,
      getEntry,
      createCheckIn,
      updateCheckIn,
      removeEntry,
      refresh,
    }),
    [
      sortedEntries,
      latestEntry,
      entries.length,
      getEntry,
      createCheckIn,
      updateCheckIn,
      removeEntry,
      refresh,
    ],
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
