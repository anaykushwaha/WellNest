import type { BreathingModeId } from '@/lib/constants';
import { BREATHING_MODES } from '@/lib/constants';
import { Badge } from '@/components/common/Badge';

interface BreathingModeSelectorProps {
  selected: BreathingModeId;
  recommended: BreathingModeId;
  onSelect: (mode: BreathingModeId) => void;
}

export function BreathingModeSelector({
  selected,
  recommended,
  onSelect,
}: BreathingModeSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {(Object.keys(BREATHING_MODES) as BreathingModeId[]).map((modeId) => {
        const mode = BREATHING_MODES[modeId];
        const isSelected = selected === modeId;
        const isRecommended = recommended === modeId;

        return (
          <button
            key={modeId}
            type="button"
            onClick={() => onSelect(modeId)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              isSelected
                ? 'border-wellness-500 bg-wellness-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-wellness-200'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-gray-900">{mode.label}</p>
              {isRecommended && <Badge variant="info">Suggested</Badge>}
            </div>
            <p className="mt-1 text-xs text-gray-500">{mode.description}</p>
            <p className="mt-2 text-xs text-wellness-600">
              {mode.phases.inhale}s in · {mode.phases.hold}s hold · {mode.phases.exhale}s out
            </p>
          </button>
        );
      })}
    </div>
  );
}
