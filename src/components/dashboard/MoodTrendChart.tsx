import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/common/Card';
import { MOOD_VALUES } from '@/lib/constants';
import { formatShortDate } from '@/lib/dateUtils';
import type { WellnessEntry } from '@/types/wellness';
import type { MoodTrendPoint } from '@/types/chart';

interface MoodTrendChartProps {
  entries: WellnessEntry[];
}

function buildTrendData(entries: WellnessEntry[]): MoodTrendPoint[] {
  return [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map((entry) => ({
      date: entry.date,
      label: formatShortDate(entry.date),
      moodValue: MOOD_VALUES[entry.mood] ?? 3,
      mood: entry.mood,
    }));
}

export function MoodTrendChart({ entries }: MoodTrendChartProps) {
  const data = buildTrendData(entries);

  if (data.length === 0) {
    return (
      <Card>
        <h3 className="text-sm font-semibold text-gray-900">Mood Trend</h3>
        <p className="mt-8 text-center text-sm text-gray-400">No mood data yet</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Mood Trend (Last 7 Days)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                fontSize: '13px',
              }}
              formatter={(value: number) => {
                const labels = ['', 'Stressed', 'Low', 'Okay', 'Good', 'Great'];
                return [labels[value] ?? value, 'Mood'];
              }}
            />
            <Line
              type="monotone"
              dataKey="moodValue"
              stroke="#14b8a6"
              strokeWidth={2.5}
              dot={{ fill: '#14b8a6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
