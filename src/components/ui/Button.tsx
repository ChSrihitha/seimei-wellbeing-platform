import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-[var(--color-accent)] text-white hover:bg-[#20422B]': variant === 'primary',
            'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border)] hover:bg-gray-50': variant === 'secondary',
            'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]': variant === 'outline',
            'hover:bg-black/5 text-[var(--color-text-primary)]': variant === 'ghost',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-11 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
