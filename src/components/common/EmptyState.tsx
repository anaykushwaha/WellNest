import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-wellness-200 bg-wellness-50/50 px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-wellness-100 p-4">
        <Icon className="h-8 w-8 text-wellness-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
