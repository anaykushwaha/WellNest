import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/common/Card';

export function EmergencyNotice() {
  return (
    <Card className="border-red-200 bg-red-50/80">
      <div className="flex gap-4">
        <AlertTriangle className="h-6 w-6 shrink-0 text-red-500" />
        <div>
          <h3 className="font-semibold text-red-800">Important Notice</h3>
          <p className="mt-2 text-sm leading-relaxed text-red-700">
            WellNest is a general wellness and self-reflection tool. It does not provide
            medical diagnosis, treatment, or emergency support.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-red-700">
            If you are in immediate danger or experiencing a crisis, contact local
            emergency services or a trusted support line.
          </p>
        </div>
      </div>
    </Card>
  );
}
