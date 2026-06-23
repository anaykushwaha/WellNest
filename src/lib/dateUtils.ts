import type { WellnessEntry } from '@/types/wellness';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function sortEntriesByDateDesc(entries: WellnessEntry[]): WellnessEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getRecentEntries(
  entries: WellnessEntry[],
  days: number,
): WellnessEntry[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return entries.filter((e) => new Date(e.date) >= cutoff);
}

export function isSameDay(dateStr: string, compareDate: string): boolean {
  return dateStr === compareDate;
}

export function generateId(): string {
  return crypto.randomUUID();
}
