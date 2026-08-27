import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  indicatorColor?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, indicatorColor, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]", className)}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 bg-[var(--color-accent)] transition-all", indicatorColor)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";
