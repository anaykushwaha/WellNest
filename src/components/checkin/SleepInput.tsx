import { Moon } from 'lucide-react';

interface SleepInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function SleepInput({ value, onChange, error }: SleepInputProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        <Moon className="h-4 w-4 text-indigo-500" />
        Sleep Hours
      </label>
      <input
        type="number"
        min={0}
        max={24}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-wellness-500 focus:outline-none focus:ring-2 focus:ring-wellness-500/20"
        placeholder="e.g. 7.5"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
