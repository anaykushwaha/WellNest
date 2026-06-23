import type { WellnessTip } from '@/types/resource';

export const wellnessTips: WellnessTip[] = [
  {
    id: 'sleep',
    title: 'Prioritize Sleep',
    description:
      'Aim for 7–9 hours of sleep. A consistent schedule helps your body and mind recover.',
    icon: 'Moon',
  },
  {
    id: 'hydration',
    title: 'Stay Hydrated',
    description:
      'Drink water regularly throughout the day. Dehydration can affect energy and concentration.',
    icon: 'Droplets',
  },
  {
    id: 'movement',
    title: 'Move Regularly',
    description:
      'Even short walks or stretching breaks can improve mood and reduce stress.',
    icon: 'Footprints',
  },
  {
    id: 'mindfulness',
    title: 'Practice Mindfulness',
    description:
      'Take a few minutes to breathe deeply, journal, or simply pause between tasks.',
    icon: 'Brain',
  },
  {
    id: 'connection',
    title: 'Stay Connected',
    description:
      'Reach out to friends, family, or campus communities when you need support.',
    icon: 'Users',
  },
  {
    id: 'balance',
    title: 'Find Balance',
    description:
      'Schedule breaks alongside study time. Rest is part of productivity, not a reward for it.',
    icon: 'Scale',
  },
];
