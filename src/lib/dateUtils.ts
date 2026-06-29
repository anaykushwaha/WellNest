import type { WellnessEntry } from '@/types/wellness';

export function getEntryTimestamp(entry: WellnessEntry): number {
  return new Date(entry.createdAt).getTime();
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDateFromIso(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDateFromIso(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatShortTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/** @deprecated Use formatDateFromIso with createdAt */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** @deprecated Use formatShortDateFromIso with createdAt */
export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function sortEntriesByCreatedAtDesc(entries: WellnessEntry[]): WellnessEntry[] {
  return [...entries].sort((a, b) => getEntryTimestamp(b) - getEntryTimestamp(a));
}

/** @deprecated Use sortEntriesByCreatedAtDesc */
export function sortEntriesByDateDesc(entries: WellnessEntry[]): WellnessEntry[] {
  return sortEntriesByCreatedAtDesc(entries);
}

export function getRecentEntries(entries: WellnessEntry[], count: number): WellnessEntry[] {
  return sortEntriesByCreatedAtDesc(entries).slice(0, count);
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function nowIso(): string {
  return new Date().toISOString();
}
