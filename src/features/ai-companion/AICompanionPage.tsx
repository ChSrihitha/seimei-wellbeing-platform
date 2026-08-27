import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { resolveCompanionGuidance } from '../../lib/companionLogic';
import type { CompanionContext } from '../../types';
import { Bot, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AICompanionPage: React.FC = () => {
  const navigate = useNavigate();
  const latestStressMappingResult = usePrototypeStore(state => state.latestStressMappingResult);
  const checkIns = usePrototypeStore(state => state.checkIns);
  const recommendations = usePrototypeStore(state => state.recommendations);
  const wellnessPlan = usePrototypeStore(state => state.wellnessPlan);
  const snapshot = usePrototypeStore(state => state.snapshot);
  const addWellnessPlanItem = usePrototypeStore(state => state.addWellnessPlanItem);

  const currentCheckIn = checkIns.length > 0 ? checkIns[0] : null;

  // Construct context and resolve guidance deterministically
  const guidance = useMemo(() => {
    const context: CompanionContext = {
      latestStressMappingResult,
      currentCheckIn,
      recommendations,
      wellnessPlan,
      snapshot,
    };
    return resolveCompanionGuidance(context);
  }, [latestStressMappingResult, currentCheckIn, recommendations, wellnessPlan, snapshot]);

  // Keep track of locally added actions to provide immediate UI feedback before navigation/state settle
  const [addedActionIds, setAddedActionIds] = useState<Set<string>>(new Set());

  const handleActionClick = (action: { id: string; label: string; actionType: 'add-to-plan' | 'navigate'; destination?: string }) => {
    if (action.actionType === 'navigate' && action.destination) {
      navigate(action.destination);
      return;
    }

    if (action.actionType === 'add-to-plan') {
      const isAlreadyInPlan = wellnessPlan.some(item => item.recommendationId === action.id);
      if (isAlreadyInPlan || addedActionIds.has(action.id)) {
        return; // Prevent duplicate additions
      }

      // Find the corresponding recommendation from store to reuse existing properties
      const rec = recommendations.find(r => r.id === action.id);
      if (rec) {
        addWellnessPlanItem({
          recommendationId: rec.id,
          title: rec.title,
          type: rec.type,
          scheduledDate: new Date().toISOString()
        });
        
        // Update local state to show 'Added' UI
        setAddedActionIds(prev => new Set(prev).add(action.id));
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 h-full overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[var(--color-primary)] text-white rounded-xl shadow-sm">
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)] tracking-tight">
            AI Wellness Companion
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Contextual wellbeing support
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span className="font-medium text-sm tracking-wide uppercase">{guidance.contextLabel || 'Guidance'}</span>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            {guidance.title}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
            {guidance.summary}
          </p>
          <div className="inline-block bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] px-4 py-2 rounded-lg text-sm mb-8">
            {guidance.reason}
          </div>

          <div className="space-y-3">
            {guidance.suggestedActions.map(action => {
              const isAlreadyInPlan = action.actionType === 'add-to-plan' && 
                (wellnessPlan.some(item => item.recommendationId === action.id) || addedActionIds.has(action.id));

              if (isAlreadyInPlan) {
                return (
                  <button 
                    key={action.id}
                    disabled
                    className="w-full flex items-center justify-between px-6 py-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl transition-all"
                  >
                    <span className="font-medium">Added to Wellness Plan</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                );
              }

              return (
                <button 
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] hover:shadow-sm transition-all group"
                >
                  <span className="font-medium">{action.label}</span>
                  <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
