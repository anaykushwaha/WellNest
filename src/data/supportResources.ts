import type { SupportResource } from '@/types/resource';

export const supportResources: SupportResource[] = [
  {
    id: '988',
    title: '988 Suicide & Crisis Lifeline',
    description:
      'Free, confidential support for people in distress, prevention and crisis resources.',
    phone: '988',
    url: 'https://988lifeline.org',
    category: 'crisis',
  },
  {
    id: 'crisis-text',
    title: 'Crisis Text Line',
    description: 'Text with a trained crisis counselor. Available 24/7.',
    phone: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org',
    category: 'crisis',
  },
  {
    id: 'samhsa',
    title: 'SAMHSA National Helpline',
    description:
      'Treatment referral and information service for individuals facing mental health or substance use challenges.',
    phone: '1-800-662-4357',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    category: 'mental-health',
  },
  {
    id: 'campus-counseling',
    title: 'Campus Counseling Services',
    description:
      'Most universities offer free or low-cost counseling. Check your student health center website.',
    category: 'campus',
  },
  {
    id: 'emergency',
    title: 'Emergency Services',
    description:
      'If you or someone else is in immediate danger, call emergency services right away.',
    phone: '911',
    category: 'crisis',
  },
  {
    id: 'mindfulness-apps',
    title: 'Mindfulness & Self-Care',
    description:
      'Apps like Headspace, Calm, or Insight Timer offer guided meditations and breathing exercises.',
    category: 'general',
  },
];
