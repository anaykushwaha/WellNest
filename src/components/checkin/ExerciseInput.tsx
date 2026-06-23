import { Footprints } from 'lucide-react';

interface ExerciseInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function ExerciseInput({ value, onChange, error }: ExerciseInputProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        <Footprints className="h-4 w-4 text-orange-500" />
        Exercise (minutes)
      </label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-wellness-500 focus:outline-none focus:ring-2 focus:ring-wellness-500/20"
        placeholder="e.g. 30"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
