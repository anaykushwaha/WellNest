export interface MoodTrendPoint {
  date: string;
  label: string;
  moodValue: number;
  mood: string;
}

export interface ChartSummary {
  average: number;
  total: number;
  count: number;
}
