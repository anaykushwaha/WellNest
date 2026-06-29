import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { GROUNDING_STEPS } from '@/lib/constants';

export function GroundingExercise() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => setChecked({});

  const totalItems = GROUNDING_STEPS.reduce((sum, step) => sum + step.count, 0);
  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">5-4-3-2-1 Grounding</h3>
      <p className="mt-1 text-sm text-gray-500">
        A simple self-reflection exercise to help you reconnect with the present moment.
        This is general wellness support — not a medical tool.
      </p>

      <div className="mt-4 space-y-4">
        {GROUNDING_STEPS.map((step) =>
          Array.from({ length: step.count }, (_, i) => {
            const key = `${step.sense}-${i}`;
            return (
              <label
                key={key}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                  checked[key]
                    ? 'border-wellness-300 bg-wellness-50'
                    : 'border-gray-100 bg-gray-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(checked[key])}
                  onChange={() => toggle(key)}
                  className="mt-1 accent-wellness-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {step.count - i} {step.label}
                  </p>
                  {i === 0 && (
                    <p className="mt-0.5 text-xs text-gray-500">{step.prompt}</p>
                  )}
                </div>
                {checked[key] && <Check className="ml-auto h-4 w-4 text-wellness-600" />}
              </label>
            );
          }),
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {completedCount} of {totalItems} completed
        </p>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </Card>
  );
}
