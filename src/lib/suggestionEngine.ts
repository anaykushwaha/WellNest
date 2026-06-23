import type { WellnessEntry } from '@/types/wellness';

export interface WellnessSuggestion {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
  actionPath?: string;
}

export function generateSuggestions(entry: WellnessEntry | null): WellnessSuggestion[] {
  if (!entry) {
    return [
      {
        id: 'no-data',
        title: 'Start Your Journey',
        message:
          'Complete your first daily check-in to receive personalized wellness suggestions.',
        priority: 'medium',
        action: 'Check In Now',
        actionPath: '/check-in',
      },
    ];
  }

  const suggestions: WellnessSuggestion[] = [];

  if (entry.sleepHours < 6) {
    suggestions.push({
      id: 'sleep-low',
      title: 'Improve Sleep Routine',
      message:
        'You logged less than 6 hours of sleep. Try a consistent bedtime, limit screens before bed, and create a calming wind-down routine.',
      priority: 'high',
    });
  } else if (entry.sleepHours < 7) {
    suggestions.push({
      id: 'sleep-moderate',
      title: 'A Little More Rest',
      message:
        'Aim for 7–9 hours of sleep tonight. Even an extra 30 minutes can help with focus and mood.',
      priority: 'medium',
    });
  }

  if (entry.waterCups < 4) {
    suggestions.push({
      id: 'hydration-low',
      title: 'Stay Hydrated',
      message:
        'Your water intake is below the recommended level. Keep a water bottle nearby and take small sips throughout the day.',
      priority: 'high',
    });
  } else if (entry.waterCups < 8) {
    suggestions.push({
      id: 'hydration-moderate',
      title: 'Keep Drinking Water',
      message:
        'You are making progress on hydration. Try to reach about 8 cups of water today.',
      priority: 'low',
    });
  }

  if (entry.stressLevel >= 7) {
    suggestions.push({
      id: 'stress-high',
      title: 'Try a Breathing Exercise',
      message:
        'Your stress level seems elevated. A few minutes of guided breathing may help you feel more grounded.',
      priority: 'high',
      action: 'Start Breathing',
      actionPath: '/breathing',
    });
  } else if (entry.stressLevel >= 5) {
    suggestions.push({
      id: 'stress-moderate',
      title: 'Take a Mindful Break',
      message:
        'Consider a short break — stretch, step outside, or jot down what is on your mind.',
      priority: 'medium',
    });
  }

  if (entry.exerciseMinutes < 15) {
    suggestions.push({
      id: 'exercise-low',
      title: 'Move Your Body',
      message:
        'Even a 10–15 minute walk can boost energy and mood. Start with something small and enjoyable.',
      priority: 'medium',
    });
  } else if (entry.exerciseMinutes < 30) {
    suggestions.push({
      id: 'exercise-moderate',
      title: 'Great Start on Activity',
      message:
        'You are moving — keep it up! A little more activity today could help you feel even better.',
      priority: 'low',
    });
  }

  if (entry.mood === 'low' || entry.mood === 'stressed') {
    suggestions.push({
      id: 'mood-support',
      title: 'Be Kind to Yourself',
      message:
        'Tough days happen. Consider reaching out to someone you trust, or explore the support resources in this app.',
      priority: 'high',
      action: 'View Resources',
      actionPath: '/resources',
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: 'all-good',
      title: 'Looking Good!',
      message:
        'Your wellness habits look balanced today. Keep up the great work and check in again tomorrow.',
      priority: 'low',
    });
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return suggestions.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );
}
