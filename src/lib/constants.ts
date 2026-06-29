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

export type BreathingModeId = 'low' | 'medium' | 'high';

export interface BreathingMode {
  id: BreathingModeId;
  label: string;
  description: string;
  phases: { inhale: number; hold: number; exhale: number };
}

export const BREATHING_MODES: Record<BreathingModeId, BreathingMode> = {
  low: {
    id: 'low',
    label: 'Calm Reset',
    description: 'Light relaxation — inhale 4s, hold 2s, exhale 4s.',
    phases: { inhale: 4, hold: 2, exhale: 4 },
  },
  medium: {
    id: 'medium',
    label: 'Balanced Breathing',
    description: 'Moderate stress support — inhale 4s, hold 4s, exhale 6s.',
    phases: { inhale: 4, hold: 4, exhale: 6 },
  },
  high: {
    id: 'high',
    label: 'Deep Recovery',
    description: 'Winding down — inhale 4s, hold 7s, exhale 8s.',
    phases: { inhale: 4, hold: 7, exhale: 8 },
  },
};

/** @deprecated Use BREATHING_MODES.medium.phases */
export const BREATHING_PHASES = BREATHING_MODES.medium.phases;

export function getRecommendedBreathingMode(
  stressLevel: number | undefined,
): BreathingModeId {
  if (stressLevel === undefined) return 'medium';
  if (stressLevel <= 3) return 'low';
  if (stressLevel <= 7) return 'medium';
  return 'high';
}

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/check-in', label: 'Check-In', icon: 'ClipboardCheck' },
  { path: '/breathing', label: 'Relaxation Tools', icon: 'Wind' },
  { path: '/history', label: 'History', icon: 'History' },
  { path: '/resources', label: 'Resources', icon: 'HeartHandshake' },
];

export const APP_NAME = 'WellNest';
export const APP_TAGLINE =
  'Track your daily wellness habits and discover simple insights for a healthier student life.';

export const GROUNDING_STEPS = [
  { sense: 'see', count: 5, label: 'things you can see', prompt: 'Look around and notice 5 things you can see.' },
  { sense: 'feel', count: 4, label: 'things you can feel', prompt: 'Notice 4 things you can physically feel right now.' },
  { sense: 'hear', count: 3, label: 'things you can hear', prompt: 'Listen for 3 distinct sounds around you.' },
  { sense: 'smell', count: 2, label: 'things you can smell', prompt: 'Identify 2 things you can smell, or 2 scents you enjoy.' },
  { sense: 'taste', count: 1, label: 'thing you can taste', prompt: 'Notice 1 thing you can taste, or take a sip of water mindfully.' },
] as const;
