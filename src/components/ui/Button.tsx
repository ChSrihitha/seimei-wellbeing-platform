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
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-[var(--color-accent)] text-white shadow-sm hover:bg-[var(--color-brand-700)] hover:-translate-y-px': variant === 'primary',
            'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border)] hover:bg-[var(--color-brand-50)]': variant === 'secondary',
            'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]': variant === 'outline',
            'hover:bg-black/5 text-[var(--color-text-primary)]': variant === 'ghost',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2 text-sm': size === 'md',
            'h-11 px-6 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
