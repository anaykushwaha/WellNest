interface StressSliderProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function StressSlider({ value, onChange, error }: StressSliderProps) {
  const getLabel = (level: number) => {
    if (level <= 2) return 'Very Low';
    if (level <= 4) return 'Low';
    if (level <= 6) return 'Moderate';
    if (level <= 8) return 'High';
    return 'Very High';
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Stress Level</label>
        <span className="text-sm font-semibold text-wellness-600">
          {value}/10 — {getLabel(value)}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-wellness-600"
      />
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>Calm</span>
        <span>Stressed</span>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
