import type { WellnessEntry } from '@/types/wellness';
import { STORAGE_KEY } from './constants';

export function loadEntries(): WellnessEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WellnessEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveEntries(entries: WellnessEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addEntry(entry: WellnessEntry): WellnessEntry[] {
  const entries = loadEntries();
  const filtered = entries.filter((e) => e.date !== entry.date);
  const updated = [entry, ...filtered];
  saveEntries(updated);
  return updated;
}

export function deleteEntry(id: string): WellnessEntry[] {
  const updated = loadEntries().filter((e) => e.id !== id);
  saveEntries(updated);
  return updated;
}

export function getEntryByDate(date: string): WellnessEntry | undefined {
  return loadEntries().find((e) => e.date === date);
}

export function clearAllEntries(): void {
  localStorage.removeItem(STORAGE_KEY);
}
