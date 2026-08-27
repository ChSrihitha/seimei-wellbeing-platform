import { useNavigate } from 'react-router-dom';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { Button } from '../../components/ui/Button';
import { StressPatternChart } from '../../components/charts/StressPatternChart';
import { ArrowRight, Leaf, ShieldAlert, Zap, Compass, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const CircularProgress = ({ value, label, size = 220, strokeWidth = 14 }: { value: number, label: string, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  let color = 'var(--color-status-low)';
  if (value >= 25 && value < 50) color = 'var(--color-status-manageable)';
  if (value >= 50 && value < 75) color = 'var(--color-status-elevated)';
  if (value >= 75) color = 'var(--color-status-high)';
  
  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-[var(--color-border)]"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          style={{ stroke: color }}
          className="transition-all duration-1000 ease-out drop-shadow-md"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-2">
        <span className="text-6xl font-display font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{value}</span>
        <span className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color }}>{label}</span>
      </div>
    </div>
  );
};

export function StressMappingResults() {
  const navigate = useNavigate();
  const { latestStressMappingResult, recommendations, addWellnessPlanItem, wellnessPlan } = usePrototypeStore();

  if (!latestStressMappingResult) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-[var(--color-surface-secondary)] rounded-full flex items-center justify-center mb-8 shadow-sm border border-[var(--color-border)]/50">
          <Leaf size={40} className="text-[var(--color-accent)] opacity-80" />
        </div>
        <h1 className="text-3xl font-display font-medium text-[var(--color-text-primary)] mb-4">
          No Results Yet
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg mb-10 leading-relaxed">
          Complete the Stress Mapping assessment to receive personalized insights into your stress patterns, contributors, and targeted resets.
        </p>
        <Button onClick={() => navigate('/assessments/stress-mapping')} className="rounded-full px-8 bg-[var(--color-brand-900)] hover:bg-[var(--color-brand-800)] text-white shadow-md">
          Begin Assessment
        </Button>
      </div>
    );
  }

  const { stressIntensity, category, primaryContributors, peakPeriod, insightSummary } = latestStressMappingResult;

  return (
    <div className="space-y-7 animate-in fade-in duration-500 pb-16 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-[var(--color-text-primary)] mb-3">
            Mapping Results
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Your personalized stress pattern analysis and recommended resets.
          </p>
        </div>
        <Button variant="outline" className="rounded-full bg-[var(--color-surface-primary)] hover:bg-[var(--color-surface-secondary)]" onClick={() => navigate('/assessments/stress-mapping')}>
          Retake Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Hero Section */}
        <div className="lg:col-span-12">
          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/60 rounded-2xl p-7 md:p-10 shadow-[0_4px_20px_rgba(42,64,38,0.04)] overflow-hidden relative">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-accent-muted)] rounded-full opacity-40 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-shrink-0 relative">
                <CircularProgress value={stressIntensity} label={category} />
              </div>
              
              <div className="flex-1 space-y-6 max-w-2xl text-center md:text-left">
                <h2 className="text-2xl font-display font-medium text-[var(--color-text-primary)]">
                  Interpretation
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {insightSummary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(42,64,38,0.04)] h-full">
            <h3 className="text-xl font-display font-medium text-[var(--color-text-primary)] mb-6 flex items-center">
              <ShieldAlert size={22} className="mr-3 text-[var(--color-accent)]" /> Key Contributors
            </h3>
            <ul className="space-y-4">
              {primaryContributors.map((c, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--color-surface-primary)] border border-[var(--color-border)]/30">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 text-xs font-semibold text-[var(--color-text-secondary)]">
                    {i + 1}
                  </div>
                  <span className="text-[var(--color-text-primary)] font-medium pt-1">{c}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-8 border-t border-[var(--color-border)]/50">
              <h3 className="text-base font-display font-medium text-[var(--color-text-primary)] mb-4 flex items-center">
                <Zap size={18} className="mr-2 text-[var(--color-accent)]" /> Peak Period
              </h3>
              <div className="inline-block px-4 py-2 bg-[var(--color-accent-muted)] rounded-lg text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                {peakPeriod}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(42,64,38,0.04)]">
            <h3 className="text-xl font-display font-medium text-[var(--color-text-primary)] mb-6">Pattern Analysis</h3>
            <div className="bg-[var(--color-surface-primary)] p-6 rounded-2xl border border-[var(--color-border)]/30">
              <StressPatternChart peakPeriod={peakPeriod} baseIntensity={stressIntensity} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-display font-medium text-[var(--color-text-primary)] mb-6 flex items-center mt-4">
              <Compass size={24} className="mr-3 text-[var(--color-accent)]" /> Recommended Resets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((rec) => {
                const inPlan = wellnessPlan.some(p => p.recommendationId === rec.id || p.title === rec.title);
                return (
                  <div key={rec.id} className="group bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/50 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-semibold text-[var(--color-accent)] uppercase tracking-wider bg-[var(--color-accent-muted)] px-2.5 py-1 rounded-full">
                          {rec.type}
                        </span>
                        {rec.durationMinutes && <span className="text-xs font-medium text-[var(--color-text-secondary)]">{rec.durationMinutes} min</span>}
                      </div>
                      <h4 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">{rec.title}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed">{rec.reason}</p>
                    </div>
                    
                    <button 
                      disabled={inPlan}
                      onClick={() => {
                        addWellnessPlanItem({
                          title: rec.title,
                          type: rec.type,
                          recommendationId: rec.id
                        });
                      }}
                      className={cn(
                        "w-full py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center",
                        inPlan 
                          ? "bg-[var(--color-surface-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] cursor-default" 
                          : "bg-[var(--color-brand-900)] text-white hover:bg-[var(--color-brand-800)] shadow-sm hover:shadow"
                      )}
                    >
                      {inPlan ? (
                        <><CheckCircle2 size={16} className="mr-2" /> Added to Plan</>
                      ) : (
                        <>{rec.actionLabel} <ArrowRight size={16} className="ml-2" /></>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
