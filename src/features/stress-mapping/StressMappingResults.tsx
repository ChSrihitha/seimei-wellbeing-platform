import { useNavigate } from 'react-router-dom';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StressPatternChart } from '../../components/charts/StressPatternChart';

export function StressMappingResults() {
  const navigate = useNavigate();
  const { latestStressMappingResult, recommendations, addWellnessPlanItem, wellnessPlan } = usePrototypeStore();

  if (!latestStressMappingResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-12 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-[var(--color-surface-secondary)] rounded-full flex items-center justify-center text-4xl mb-4">
          🍃
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          No Results Yet
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-md">
          Complete the Stress Mapping assessment to receive personalized insights into your stress patterns, contributors, and targeted resets.
        </p>
        <Button onClick={() => navigate('/assessments/stress-mapping')} className="mt-8">
          Begin Assessment
        </Button>
      </div>
    );
  }

  const { stressIntensity, category, primaryContributors, peakPeriod, insightSummary } = latestStressMappingResult;

  const categoryColor = 
    category === 'low' ? 'text-green-600' :
    category === 'manageable' ? 'text-blue-600' :
    category === 'elevated' ? 'text-amber-600' :
    'text-red-600';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end mb-8">
        <PageHeader 
          title="Stress Mapping Results" 
          description="Your personalized stress pattern analysis and recommended resets."
          className="mb-0"
        />
        <Button variant="outline" onClick={() => navigate('/assessments/stress-mapping')}>
          Retake Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-[var(--color-surface-secondary)] border-transparent text-center py-8">
            <h2 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Overall Intensity</h2>
            <div className="text-7xl font-bold tracking-tight mb-2">
              {stressIntensity}
            </div>
            <p className={`font-semibold text-lg capitalize ${categoryColor}`}>
              {category}
            </p>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {primaryContributors.map((c, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                    <span className="text-[var(--color-text-primary)]">{c}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Peak Period</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text-primary)] capitalize font-medium">{peakPeriod}</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text-primary)] leading-relaxed mb-6">
                {insightSummary}
              </p>
              <StressPatternChart peakPeriod={peakPeriod} baseIntensity={stressIntensity} />
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-medium mb-4 mt-8">Recommended Resets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec) => {
                const inPlan = wellnessPlan.some(p => p.recommendationId === rec.id || p.title === rec.title);
                return (
                  <Card key={rec.id} className="flex flex-col h-full border-[var(--color-border)]">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider">{rec.type}</span>
                        {rec.durationMinutes && <span className="text-xs text-[var(--color-text-secondary)]">{rec.durationMinutes} min</span>}
                      </div>
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between pt-0">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-2">{rec.reason}</p>
                      <Button 
                        variant={inPlan ? "secondary" : "primary"} 
                        className="w-full text-sm" 
                        disabled={inPlan}
                        onClick={() => {
                          addWellnessPlanItem({
                            title: rec.title,
                            type: rec.type,
                            recommendationId: rec.id
                          });
                        }}
                      >
                        {inPlan ? 'Added to Plan' : rec.actionLabel}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
