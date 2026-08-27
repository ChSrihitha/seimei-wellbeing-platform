import React from 'react';

interface PlanSummaryProps {
  completed: number;
  total: number;
  percentage: number;
}

export const PlanSummary: React.FC<PlanSummaryProps> = ({ completed, total, percentage }) => {
  return (
    <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/50 rounded-[2rem] p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-display font-medium text-[var(--color-text-primary)] mb-2 tracking-tight">Weekly Progress</h3>
        <p className="text-lg text-[var(--color-text-secondary)]">
          You've completed <strong className="text-[var(--color-text-primary)] font-medium">{completed} out of {total}</strong> scheduled activities this week.
        </p>
      </div>
      
      <div className="flex items-center gap-6 bg-[var(--color-surface-primary)] p-6 rounded-2xl border border-[var(--color-border)]/30">
        <div className="text-right">
          <div className="text-4xl font-display font-medium text-[var(--color-accent)]">{percentage}%</div>
          <div className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mt-1">Completion</div>
        </div>
        
        <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-[var(--color-border)]"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-[var(--color-accent)] transition-all duration-1000 ease-out"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (percentage / 100) * 251.2}
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              stroke="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
