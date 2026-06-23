import type { MoodType } from '@/types/wellness';
import { MOOD_OPTIONS } from '@/lib/constants';

interface MoodSelectorProps {
  value: MoodType | '';
  onChange: (mood: MoodType) => void;
  error?: string;
}

export function MoodSelector({ value, onChange, error }: MoodSelectorProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">
        How are you feeling today? <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {MOOD_OPTIONS.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
              value === mood.value
                ? 'border-wellness-500 bg-wellness-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-wellness-200 hover:bg-wellness-50/50'
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-gray-700">{mood.label}</span>
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
