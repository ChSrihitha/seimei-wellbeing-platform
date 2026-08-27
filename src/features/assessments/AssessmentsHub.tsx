import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function AssessmentsHub() {
  const navigate = useNavigate();

  const catalog = [
    {
      id: 'stress-mapping',
      title: 'Stress Mapping',
      description: 'Understand your stress patterns, identify key contributors, and discover targeted resets.',
      duration: '3 min',
      interactive: true,
      action: 'Start Assessment',
    },
    {
      id: 'mental-wellness',
      title: 'Mental Wellness Check',
      description: 'A comprehensive review of your emotional baseline and mental clarity.',
      duration: '10 min',
      interactive: false,
      action: 'Coming Soon',
    },
    {
      id: 'burnout-risk',
      title: 'Burnout Risk Assessment',
      description: 'Evaluate your current risk factors for professional fatigue and burnout.',
      duration: '5 min',
      interactive: false,
      action: 'Coming Soon',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Assessments Hub"
        description="Discover and begin available wellbeing assessments to better understand your current state."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {catalog.map((assessment) => (
          <Card 
            key={assessment.id} 
            className={`flex flex-col h-full ${
              assessment.interactive 
                ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)] shadow-md' 
                : 'opacity-80'
            }`}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium bg-[var(--color-surface-secondary)] px-2 py-1 rounded-md text-[var(--color-text-secondary)]">
                  {assessment.duration}
                </span>
                {assessment.interactive && (
                  <span className="text-xs font-semibold text-[var(--color-accent)] bg-[var(--color-accent-muted)] px-2 py-1 rounded-md">
                    Featured
                  </span>
                )}
              </div>
              <CardTitle>{assessment.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0">
              <p className="text-[var(--color-text-secondary)] mb-6">
                {assessment.description}
              </p>
              
              <Button
                variant={assessment.interactive ? 'primary' : 'secondary'}
                className="w-full"
                disabled={!assessment.interactive}
                onClick={() => {
                  if (assessment.interactive) {
                    navigate(`/assessments/${assessment.id}`);
                  }
                }}
              >
                {assessment.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
