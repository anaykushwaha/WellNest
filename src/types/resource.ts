export interface SupportResource {
  id: string;
  title: string;
  description: string;
  url?: string;
  phone?: string;
  category: 'crisis' | 'mental-health' | 'general' | 'campus';
}

export interface WellnessTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}
