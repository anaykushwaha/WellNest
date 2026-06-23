export const STORAGE_KEY = 'wellnest_entries';

export const MOOD_OPTIONS = [
  { value: 'great' as const, label: 'Great', emoji: '😊', score: 100 },
  { value: 'good' as const, label: 'Good', emoji: '🙂', score: 80 },
  { value: 'okay' as const, label: 'Okay', emoji: '😐', score: 60 },
  { value: 'low' as const, label: 'Low', emoji: '😔', score: 40 },
  { value: 'stressed' as const, label: 'Stressed', emoji: '😰', score: 30 },
];

export const MOOD_VALUES: Record<string, number> = {
  great: 5,
  good: 4,
  okay: 3,
  low: 2,
  stressed: 1,
};

export const DAILY_WATER_GOAL = 8;
export const DAILY_EXERCISE_GOAL = 30;
export const RECOMMENDED_SLEEP = 7;

export const BREATHING_PHASES = {
  inhale: 4,
  hold: 4,
  exhale: 6,
} as const;

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/check-in', label: 'Check-In', icon: 'ClipboardCheck' },
  { path: '/breathing', label: 'Breathing', icon: 'Wind' },
  { path: '/history', label: 'History', icon: 'History' },
  { path: '/resources', label: 'Resources', icon: 'HeartHandshake' },
];

export const APP_NAME = 'WellNest';
export const APP_TAGLINE =
  'Track your daily wellness habits and discover simple insights for a healthier student life.';
