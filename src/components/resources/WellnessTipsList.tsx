import {
  Moon,
  Droplets,
  Footprints,
  Brain,
  Users,
  Scale,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { wellnessTips } from '@/data/wellnessTips';

const iconMap = {
  Moon,
  Droplets,
  Footprints,
  Brain,
  Users,
  Scale,
};

export function WellnessTipsList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {wellnessTips.map((tip) => {
        const Icon = iconMap[tip.icon as keyof typeof iconMap];
        return (
          <Card key={tip.id} padding="sm">
            <div className="flex gap-3">
              <div className="rounded-xl bg-wellness-50 p-2.5 text-wellness-600">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{tip.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
