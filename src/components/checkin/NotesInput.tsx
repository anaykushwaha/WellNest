interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesInput({ value, onChange }: NotesInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Daily Notes <span className="font-normal text-gray-400">(optional)</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="How was your day? Any reflections..."
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-wellness-500 focus:outline-none focus:ring-2 focus:ring-wellness-500/20"
      />
      <p className="mt-1 text-right text-xs text-gray-400">{value.length}/500</p>
    </div>
  );
}
