import { Droplets } from 'lucide-react';

interface HydrationInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function HydrationInput({ value, onChange, error }: HydrationInputProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        <Droplets className="h-4 w-4 text-calm-500" />
        Water Intake (cups)
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg font-medium hover:bg-gray-50"
        >
          −
        </button>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm focus:border-wellness-500 focus:outline-none focus:ring-2 focus:ring-wellness-500/20"
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg font-medium hover:bg-gray-50"
        >
          +
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
