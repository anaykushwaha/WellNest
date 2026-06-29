import type { WellnessEntry } from '@/types/wellness';
import { STORAGE_KEY } from './constants';
import { sortEntriesByCreatedAtDesc } from './dateUtils';

function migrateEntry(raw: Partial<WellnessEntry> & Record<string, unknown>): WellnessEntry {
  const createdAt =
    typeof raw.createdAt === 'string'
      ? raw.createdAt
      : typeof raw.date === 'string'
        ? `${raw.date}T12:00:00.000Z`
        : new Date().toISOString();

  const date = createdAt.split('T')[0];

  return {
    id: String(raw.id ?? crypto.randomUUID()),
    createdAt,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : undefined,
    date,
    mood: raw.mood as WellnessEntry['mood'],
    stressLevel: Number(raw.stressLevel ?? 5),
    sleepHours: Number(raw.sleepHours ?? 0),
    waterCups: Number(raw.waterCups ?? 0),
    exerciseMinutes: Number(raw.exerciseMinutes ?? 0),
    notes: String(raw.notes ?? ''),
    score: Number(raw.score ?? 0),
  };
}

export function loadEntries(): WellnessEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Partial<WellnessEntry>>;
    if (!Array.isArray(parsed)) return [];
    return sortEntriesByCreatedAtDesc(parsed.map(migrateEntry));
  } catch {
    return [];
  }
}

export function saveEntries(entries: WellnessEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function appendEntry(entry: WellnessEntry): WellnessEntry[] {
  const entries = loadEntries();
  const updated = sortEntriesByCreatedAtDesc([entry, ...entries]);
  saveEntries(updated);
  return updated;
}

export function updateEntry(entry: WellnessEntry): WellnessEntry[] {
  const entries = loadEntries();
  const exists = entries.some((e) => e.id === entry.id);
  if (!exists) return entries;

  const updated = sortEntriesByCreatedAtDesc(
    entries.map((e) => (e.id === entry.id ? entry : e)),
  );
  saveEntries(updated);
  return updated;
}

export function deleteEntry(id: string): WellnessEntry[] {
  const updated = loadEntries().filter((e) => e.id !== id);
  saveEntries(updated);
  return updated;
}

export function getEntryById(id: string): WellnessEntry | undefined {
  return loadEntries().find((e) => e.id === id);
}

export function clearAllEntries(): void {
  localStorage.removeItem(STORAGE_KEY);
}
