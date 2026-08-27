import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { stressMappingAssessment } from '../../data/stressMappingData';
import { calculateStressMapping } from '../../lib/scoring';
import type { StressMappingResponses } from '../../types';
import { Button } from '../../components/ui/Button';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StressMappingFlow() {
  const navigate = useNavigate();
  const { setStressMappingResult, setRecommendations } = usePrototypeStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<StressMappingResponses>>({
    contributors: []
  });
  const [error, setError] = useState('');

  const questions = stressMappingAssessment.questions;
  const isReflectionStep = currentStep === questions.length;
  const totalSteps = questions.length + 1;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleNext = () => {
    // Validation
    if (!isReflectionStep) {
      const q = questions[currentStep];
      if (q.id === 'q-stress-level' && responses.stressLevel === undefined) {
        setError('Please select a stress level to continue.');
        return;
      }
      if (q.id === 'q-contributors' && (responses.contributors?.length === 0)) {
        setError('Please select at least one primary contributor.');
        return;
      }
      if (q.id === 'q-peak-time' && !responses.peakTime) {
        setError('Please select a peak time.');
        return;
      }
      if (q.id === 'q-workload' && !responses.workload) {
        setError('Please describe your recent workload.');
        return;
      }
      if (q.id === 'q-recovery' && !responses.recovery) {
        setError('Please select a recovery pattern.');
        return;
      }
    }

    setError('');
    
    if (isReflectionStep) {
      handleSubmit();
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    } else {
      navigate('/assessments');
    }
  };

  const handleSubmit = () => {
    const { result, recommendations } = calculateStressMapping(responses as StressMappingResponses);
    setStressMappingResult(result);
    setRecommendations(recommendations);
    navigate('/results/stress-mapping');
  };

  const renderQuestion = () => {
    if (isReflectionStep) {
      return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-medium text-[var(--color-text-primary)] tracking-tight">Any additional context? (Optional)</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">Is there anything else contributing to how you feel right now?</p>
          <textarea 
            className="w-full min-h-[160px] p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-none text-base transition-all shadow-sm"
            placeholder="Type your reflection here..."
            value={responses.reflection || ''}
            onChange={(e) => setResponses({ ...responses, reflection: e.target.value })}
          />
        </div>
      );
    }

    const q = questions[currentStep];

    return (
      <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500 max-w-2xl mx-auto" key={q.id}>
        <h2 className="text-3xl font-display font-medium text-[var(--color-text-primary)] tracking-tight leading-tight">{q.text}</h2>
        
        {q.type === 'scale' && (
          <div className="flex flex-col gap-3 mt-8">
            {q.options.map((opt) => {
              const isSelected = responses.stressLevel === opt.value;
              return (
                <button
                  key={opt.id}
                  onClick={() => setResponses({ ...responses, stressLevel: opt.value as number })}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 group w-full",
                    isSelected 
                        ? "bg-[var(--color-feature-blue)] border-[var(--color-feature-blue)] shadow-md" 
                      : "bg-[var(--color-surface-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-primary)]"
                  )}
                >
                  <span className={cn("text-lg font-medium", isSelected ? "text-white" : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]")}>
                    {opt.label}
                  </span>
                  <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", isSelected ? "border-white bg-white/20" : "border-[var(--color-border)]")}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {q.type === 'multi-choice' && (
          <div className="grid grid-cols-1 gap-3 mt-8">
            {q.options.map(opt => {
              const isSelected = responses.contributors?.includes(opt.value as string);
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    const current = responses.contributors || [];
                    if (isSelected) {
                      setResponses({ ...responses, contributors: current.filter(c => c !== opt.value) });
                    } else {
                      if (current.length < 3) {
                        setResponses({ ...responses, contributors: [...current, opt.value as string] });
                      } else {
                        setError('You can select up to 3 contributors.');
                      }
                    }
                  }}
                  className={cn(
                    "flex items-center p-5 rounded-2xl border text-left transition-all duration-200 group",
                    isSelected 
                        ? "bg-[#edf3fc] border-[var(--color-feature-blue)] shadow-sm" 
                      : "bg-[var(--color-surface-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-primary)]"
                  )}
                >
                  <div className={cn("w-6 h-6 rounded mr-4 border flex items-center justify-center transition-colors", isSelected ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white" : "border-[var(--color-border)] bg-[var(--color-surface-secondary)]")}>
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className={cn("text-base font-medium", isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]")}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === 'single-choice' && (
          <div className="flex flex-col gap-3 mt-8">
            {q.options.map(opt => {
              let isSelected = false;
              if (q.id === 'q-peak-time') isSelected = responses.peakTime === opt.value;
              if (q.id === 'q-workload') isSelected = responses.workload === opt.value;
              if (q.id === 'q-recovery') isSelected = responses.recovery === opt.value;

              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (q.id === 'q-peak-time') setResponses({ ...responses, peakTime: opt.value as any });
                    if (q.id === 'q-workload') setResponses({ ...responses, workload: opt.value as any });
                    if (q.id === 'q-recovery') setResponses({ ...responses, recovery: opt.value as any });
                  }}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 group w-full",
                    isSelected 
                        ? "bg-[var(--color-feature-blue)] border-[var(--color-feature-blue)] shadow-md" 
                      : "bg-[var(--color-surface-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-primary)]"
                  )}
                >
                  <span className={cn("text-base font-medium", isSelected ? "text-white" : "text-[var(--color-text-primary)]")}>
                    {opt.label}
                  </span>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors", isSelected ? "border-white bg-white/20" : "border-[var(--color-border)]")}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium animate-in fade-in mt-6 border border-red-100 flex items-center">
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col pt-8 pb-20">
      {/* Header & Progress */}
      <div className="max-w-4xl mx-auto w-full px-4 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">Stress Mapping</h1>
          </div>
          <div className="text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-secondary)] px-3 py-1 rounded-full border border-[var(--color-border)]">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>
        
        <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[var(--color-accent)] h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      
      {/* Question Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4">
        <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)]/60 rounded-2xl p-7 md:p-10 shadow-[0_4px_20px_rgba(42,64,38,0.04)] min-h-[400px]">
          {renderQuestion()}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="max-w-4xl mx-auto w-full px-4 mt-8">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-3 px-4 -ml-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </button>
          
          <Button 
            onClick={handleNext}
            className={cn(
              "rounded-full px-8 py-6 shadow-md hover:shadow-lg transition-all",
              isReflectionStep ? "bg-[var(--color-brand-900)] text-white hover:bg-[var(--color-brand-800)]" : "bg-[var(--color-accent)] text-white"
            )}
          >
            {isReflectionStep ? 'Complete Assessment' : 'Continue'}
            {!isReflectionStep && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
