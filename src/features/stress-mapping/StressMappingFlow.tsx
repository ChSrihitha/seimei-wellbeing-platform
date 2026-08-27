import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { stressMappingAssessment } from '../../data/stressMappingData';
import { calculateStressMapping } from '../../lib/scoring';
import type { StressMappingResponses } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { PageHeader } from '../../components/ui/PageHeader';

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
  const progressPercent = Math.round((currentStep / (questions.length + 1)) * 100);

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
    // Scoring logic
    const { result, recommendations } = calculateStressMapping(responses as StressMappingResponses);
    
    // Zustand state updates
    setStressMappingResult(result);
    setRecommendations(recommendations);
    
    // Route navigation
    navigate('/results/stress-mapping');
  };

  const renderQuestion = () => {
    if (isReflectionStep) {
      return (
        <div className="space-y-4 animate-in fade-in">
          <h2 className="text-xl font-medium">Any additional context? (Optional)</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Is there anything else contributing to how you feel right now?</p>
          <textarea 
            className="w-full min-h-[120px] p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] resize-none"
            placeholder="Type your reflection here..."
            value={responses.reflection || ''}
            onChange={(e) => setResponses({ ...responses, reflection: e.target.value })}
          />
        </div>
      );
    }

    const q = questions[currentStep];

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300" key={q.id}>
        <h2 className="text-xl font-medium leading-relaxed">{q.text}</h2>
        
        {q.type === 'scale' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {q.options.map(opt => (
              <Button
                key={opt.id}
                variant={responses.stressLevel === opt.value ? 'primary' : 'outline'}
                onClick={() => setResponses({ ...responses, stressLevel: opt.value as number })}
                className="h-14"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        )}

        {q.type === 'multi-choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map(opt => {
              const isSelected = responses.contributors?.includes(opt.value as string);
              return (
                <Button
                  key={opt.id}
                  variant={isSelected ? 'primary' : 'outline'}
                  onClick={() => {
                    const current = responses.contributors || [];
                    if (isSelected) {
                      setResponses({ ...responses, contributors: current.filter(c => c !== opt.value) });
                    } else {
                      if (current.length < 3) {
                        setResponses({ ...responses, contributors: [...current, opt.value as string] });
                      } else {
                        setError('You can only select up to 3 contributors.');
                      }
                    }
                  }}
                  className="justify-start h-auto py-3 px-4 text-left font-normal"
                >
                  <span className="flex-1">{opt.label}</span>
                </Button>
              );
            })}
          </div>
        )}

        {q.type === 'single-choice' && (
          <div className="flex flex-col gap-3">
            {q.options.map(opt => {
              let isSelected = false;
              if (q.id === 'q-peak-time') isSelected = responses.peakTime === opt.value;
              if (q.id === 'q-workload') isSelected = responses.workload === opt.value;
              if (q.id === 'q-recovery') isSelected = responses.recovery === opt.value;

              return (
                <Button
                  key={opt.id}
                  variant={isSelected ? 'primary' : 'outline'}
                  onClick={() => {
                    if (q.id === 'q-peak-time') setResponses({ ...responses, peakTime: opt.value as any });
                    if (q.id === 'q-workload') setResponses({ ...responses, workload: opt.value as any });
                    if (q.id === 'q-recovery') setResponses({ ...responses, recovery: opt.value as any });
                  }}
                  className="justify-start h-auto py-3 px-4 font-normal"
                >
                  {opt.label}
                </Button>
              );
            })}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 animate-in fade-in mt-4">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <PageHeader 
        title="Stress Mapping" 
        description="Let's understand where your pressure points are right now."
      />
      
      <Card className="overflow-hidden">
        <Progress value={progressPercent} className="rounded-none h-1" />
        
        <CardContent className="p-6 sm:p-10">
          <div className="min-h-[280px]">
            {renderQuestion()}
          </div>
          
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-[var(--color-border)]">
            <Button variant="ghost" onClick={handleBack}>
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext}>
              {isReflectionStep ? 'Complete Assessment' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
