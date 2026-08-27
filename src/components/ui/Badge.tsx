import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'positive' | 'warning' | 'neutral';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          {
            'border-transparent bg-[var(--color-accent-muted)] text-[var(--color-accent)]': variant === 'default',
            'border-transparent bg-green-100 text-[var(--color-positive)]': variant === 'positive',
            'border-transparent bg-yellow-100 text-yellow-800': variant === 'warning',
            'border-transparent bg-gray-100 text-gray-800': variant === 'neutral',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
