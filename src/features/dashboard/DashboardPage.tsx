import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { DailyCheckIn } from './DailyCheckIn';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { profile, snapshot, recommendations, latestStressMappingResult } = usePrototypeStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title={`Good morning, ${profile.name.split(' ')[0]}`}
        description="Here is your wellbeing snapshot for today."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Primary Wellbeing Summary */}
          <Card className="bg-[var(--color-surface-secondary)] border-transparent overflow-hidden">
            <div className="p-8 pb-0">
              <h2 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Overall Wellbeing</h2>
              <div className="flex items-end gap-4 mb-6">
                <span className="text-6xl font-bold tracking-tight text-[var(--color-accent)]">{snapshot.overallScore}</span>
                <span className="text-lg text-[var(--color-text-secondary)] mb-2">/ 100</span>
              </div>
            </div>
            
            <div className="bg-white/50 border-t border-[var(--color-border)] p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Stress Level</p>
                <p className="font-medium capitalize">{latestStressMappingResult?.category || snapshot.stressLevel}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Energy Level</p>
                <p className="font-medium capitalize">{snapshot.energyLevel}</p>
              </div>
            </div>
          </Card>

          {/* Trend & Insight */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text-primary)] leading-relaxed">
                {latestStressMappingResult?.insightSummary || 
                 "Your wellbeing has remained stable this week. Your energy is holding steady, but there's a slight buildup of afternoon stress."}
              </p>
            </CardContent>
          </Card>

          {/* Next Actions Area */}
          <div>
            <h3 className="text-lg font-medium mb-4">Recommended for you</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.slice(0, 2).map((rec) => (
                <Card key={rec.id} className="flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider">{rec.type}</span>
                      {rec.durationMinutes && <span className="text-xs text-[var(--color-text-secondary)]">{rec.durationMinutes} min</span>}
                    </div>
                    <CardTitle className="text-base">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between pt-0">
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">{rec.reason}</p>
                    <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/wellness-plan')}>
                      {rec.actionLabel}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <DailyCheckIn />

          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                <p className="text-xs font-medium text-[var(--color-accent)] mb-1">TODAY • 2:00 PM</p>
                <p className="font-medium mb-1">The 15-Minute Reset</p>
                <p className="text-sm text-[var(--color-text-secondary)]">SEIMEI Wellbeing Hive</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
