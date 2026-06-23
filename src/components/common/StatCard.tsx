import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-wellness-600',
  trend,
}: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
          {trend && <p className="mt-1 text-xs text-wellness-600">{trend}</p>}
        </div>
        <div className={`rounded-xl bg-wellness-50 p-3 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
