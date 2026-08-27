import React, { useState } from 'react';
import type { WellnessPlanItem } from '../../types';
import { getSuggestedTiming } from '../../lib/wellnessPlanLogic';
import { ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { useNavigate } from 'react-router-dom';

interface NextActionCardProps {
  item: WellnessPlanItem;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({ item }) => {
  const updateStatus = usePrototypeStore(state => state.updateWellnessPlanItemStatus);
  const navigate = useNavigate();
  const timing = getSuggestedTiming(item);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = item.title.toLowerCase().includes('reflection')
    ? ['Pause and name what is on your mind.', 'Write down the one thing you want to release.', 'Choose one clear intention for tomorrow.']
    : ['Settle into a comfortable position.', 'Take a slow breath in, then a longer breath out.', 'Notice how your body and attention feel now.'];

  const handleMarkComplete = () => {
    updateStatus(item.id, 'completed');
  };

  const handleAction = () => {
    if (item.type === 'resource') {
      navigate('/resources');
    } else if (item.type === 'program') {
      navigate('/programs');
    } else {
      setStep(0);
      setSessionOpen(true);
    }
  };

  return (
    <div className="bg-[var(--color-brand-900)] rounded-[2rem] p-8 md:p-10 text-[var(--color-surface-primary)] shadow-md relative overflow-hidden mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-700)] rounded-full opacity-30 blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 text-[var(--color-brand-200)]">
          <Sparkles size={20} />
          <span className="font-semibold text-xs tracking-widest uppercase">Next Recommended Action</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-display font-medium mb-4 tracking-tight leading-tight">{item.title}</h3>
        
        <div className="flex items-center gap-3 text-[var(--color-brand-100)] mb-10">
          <Clock size={16} />
          <span className="text-sm font-medium">{timing}</span>
          <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold uppercase tracking-wider ml-3">
            {item.type.replace('-', ' ')}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={handleAction}
            className="w-full sm:w-auto px-8 py-4 bg-[var(--color-brand-200)] text-[var(--color-brand-900)] font-medium rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {item.type === 'resource' || item.type === 'program' ? 'View Details' : 'Start Activity'}
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={handleMarkComplete}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/5"
          >
            <CheckCircle2 size={18} />
            Mark Complete
          </button>
        </div>
      </div>
      {sessionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20301d]/30 p-4" onClick={() => setSessionOpen(false)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-xl" onClick={event => event.stopPropagation()}>
            <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">Guided activity</p><h2 className="mt-2 text-2xl font-semibold">{item.title}</h2></div><button aria-label="Close" onClick={() => setSessionOpen(false)} className="text-[var(--color-text-secondary)]">×</button></div>
            <div className="mt-6 rounded-xl bg-[var(--color-brand-50)] p-5"><p className="text-xs font-semibold text-[var(--color-brand-700)]">Step {step + 1} of {steps.length}</p><p className="mt-3 text-base leading-relaxed">{steps[step]}</p></div>
            <div className="mt-5 flex justify-between gap-3"><button disabled={step === 0} onClick={() => setStep(current => current - 1)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-medium disabled:opacity-40">Previous</button>{step < steps.length - 1 ? <button onClick={() => setStep(current => current + 1)} className="rounded-xl bg-[var(--color-accent)] px-5 py-2 text-xs font-medium text-white">Next <ArrowRight size={13} className="ml-1 inline" /></button> : <button onClick={() => { handleMarkComplete(); setSessionOpen(false); }} className="rounded-xl bg-[var(--color-accent)] px-5 py-2 text-xs font-medium text-white">Finish Activity <CheckCircle2 size={13} className="ml-1 inline" /></button>}</div>
          </div>
        </div>
      )}
    </div>
  );
};
