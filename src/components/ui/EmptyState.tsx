/** Reusable empty state */

import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon className="size-12 text-gray-300" aria-hidden="true" />}
      <h3 className={`text-heading-sm font-semibold text-gray-800 ${Icon ? 'mt-4' : ''}`}>{title}</h3>
      <p className="mt-2 max-w-md text-body-sm text-gray-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
