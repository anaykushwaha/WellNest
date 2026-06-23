import { ExternalLink, Phone } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { SupportResource } from '@/types/resource';

interface ResourceCardProps {
  resource: SupportResource;
}

const categoryVariant = {
  crisis: 'danger' as const,
  'mental-health': 'info' as const,
  campus: 'success' as const,
  general: 'default' as const,
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card padding="sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {resource.phone && (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-wellness-600">
                <Phone className="h-3.5 w-3.5" />
                {resource.phone}
              </span>
            )}
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-calm-600 hover:text-calm-700"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Visit Website
              </a>
            )}
          </div>
        </div>
        <Badge variant={categoryVariant[resource.category]}>
          {resource.category.replace('-', ' ')}
        </Badge>
      </div>
    </Card>
  );
}
