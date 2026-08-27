import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import type { WellbeingCheckIn } from '../../types';
import { cn } from '../../lib/utils';
import { Sparkles, Smile, Meh, Frown, BatteryLow, CheckCircle2 } from 'lucide-react';

export function DailyCheckIn() {
  const { setCurrentCheckIn } = usePrototypeStore();
  const [selectedMood, setSelectedMood] = useState<WellbeingCheckIn['mood'] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const moods: { value: WellbeingCheckIn['mood']; label: string; icon: any }[] = [
    { value: 'great', label: 'Great', icon: Sparkles },
    { value: 'good', label: 'Good', icon: Smile },
    { value: 'okay', label: 'Okay', icon: Meh },
    { value: 'struggling', label: 'Struggling', icon: Frown },
    { value: 'exhausted', label: 'Exhausted', icon: BatteryLow },
  ];

  const handleCheckIn = () => {
    if (!selectedMood) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentCheckIn({
        id: `chk-${Date.now()}`,
        date: new Date().toISOString(),
        mood: selectedMood,
      });
      setSubmitted(true);
      setIsTransitioning(false);
    }, 300);
  };

  if (submitted) {
    return (
      <div className="bg-[var(--color-brand-900)] text-[var(--color-surface-primary)] rounded-3xl p-8 shadow-sm relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[var(--color-brand-700)] rounded-full opacity-20 blur-2xl pointer-events-none" />
        <div className="flex flex-col items-center text-center justify-center space-y-5 relative z-10">
          <div className="w-16 h-16 bg-[var(--color-brand-800)] rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} className="text-[var(--color-brand-200)]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-medium text-xl text-white">Thank you for checking in</h3>
            <p className="text-[var(--color-brand-200)] text-sm max-w-[250px] mx-auto leading-relaxed">
              Your dashboard has been updated. We'll check in again tomorrow.
            </p>
          </div>
          <button 
            className="text-xs font-medium text-[var(--color-brand-300)] hover:text-white uppercase tracking-wider transition-colors pt-2"
            onClick={() => setSubmitted(false)}
          >
            Update Check-In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/50 rounded-3xl p-6 shadow-sm transition-opacity duration-300", isTransitioning ? "opacity-50" : "opacity-100")}>
      <div className="mb-6">
        <h3 className="text-base font-display font-medium text-[var(--color-text-primary)]">Daily Pulse</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          How are you feeling right now?
        </p>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-6">
        {moods.map((m) => (
          <button
            key={m.value}
            onClick={() => setSelectedMood(m.value)}
            className={cn(
              "flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-200 group relative",
              selectedMood === m.value 
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-md transform scale-105" 
                : "bg-[var(--color-surface-primary)] border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]/50 hover:text-[var(--color-text-primary)]"
            )}
          >
            <m.icon size={20} className={cn("mb-2 transition-transform", selectedMood === m.value ? "scale-110" : "group-hover:scale-110")} />
            <span className={cn("text-[10px] font-medium tracking-wide", selectedMood === m.value ? "text-white" : "")}>{m.label}</span>
          </button>
        ))}
      </div>
      
      <Button 
        className={cn(
          "w-full rounded-full transition-all duration-300",
          !selectedMood ? "opacity-50 bg-[var(--color-surface-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]" : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90"
        )} 
        disabled={!selectedMood || isTransitioning} 
        onClick={handleCheckIn}
      >
        Record Check-In
      </Button>
    </div>
  );
}
