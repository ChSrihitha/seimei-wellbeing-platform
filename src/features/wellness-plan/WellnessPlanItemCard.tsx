import React from 'react';
import type { WellnessPlanItem } from '../../types';
import { getSuggestedTiming } from '../../lib/wellnessPlanLogic';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { usePrototypeStore } from '../../store/usePrototypeStore';

interface WellnessPlanItemCardProps {
  item: WellnessPlanItem;
}

export const WellnessPlanItemCard: React.FC<WellnessPlanItemCardProps> = ({ item }) => {
  const updateStatus = usePrototypeStore(state => state.updateWellnessPlanItemStatus);
  const isCompleted = item.status === 'completed';
  const timing = getSuggestedTiming(item);

  const handleToggleComplete = () => {
    updateStatus(item.id, isCompleted ? 'pending' : 'completed');
  };

  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      isCompleted 
        ? 'bg-[var(--color-surface-secondary)] border-transparent opacity-70' 
        : 'bg-[var(--color-surface-primary)] border-[var(--color-border)]/50 hover:border-[var(--color-accent)]/50 hover:shadow-sm'
    }`}>
      <div className="flex items-start gap-5">
        <button 
          onClick={handleToggleComplete}
          className="mt-0.5 flex-shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          aria-label={isCompleted ? "Mark as pending" : "Mark as complete"}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-7 h-7 text-[var(--color-status-low)]" />
          ) : (
            <Circle className="w-7 h-7" strokeWidth={1.5} />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 bg-[var(--color-brand-100)] text-[var(--color-brand-900)] rounded-full">
              {item.type.replace('-', ' ')}
            </span>
          </div>
          
          <h4 className={`text-lg font-medium mb-2 ${isCompleted ? 'text-[var(--color-text-secondary)] line-through' : 'text-[var(--color-text-primary)]'}`}>
            {item.title}
          </h4>
          
          {!isCompleted && (
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-medium">
              <Clock size={16} />
              <span>{timing}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
