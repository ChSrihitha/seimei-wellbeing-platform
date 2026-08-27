import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import { demoHistoricalTrends } from '../../data/insightsData';
import { TrendChart } from './TrendChart';
import { Activity, Brain, Battery } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const navigate = useNavigate();
  const latestStressMappingResult = usePrototypeStore(state => state.latestStressMappingResult);
  const snapshot = usePrototypeStore(state => state.snapshot);
  
  // Use latest assessment result if available, otherwise fall back to demo snapshot
  const interpretationText = latestStressMappingResult 
    ? latestStressMappingResult.insightSummary
    : "Your recent stress and recovery patterns indicate a stable period. Maintaining consistent resets will help sustain this balance.";

  const highlightContributor = latestStressMappingResult && latestStressMappingResult.primaryContributors.length > 0
    ? latestStressMappingResult.primaryContributors[0]
    : "General Workload";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-2">
          Insights & Trends
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Understand your wellbeing patterns and what they mean for your recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[var(--color-text-primary)]">Wellbeing Trend</h3>
          </div>
          <div className="text-3xl font-semibold text-[var(--color-text-primary)] mb-1">
            {snapshot.overallScore}/100
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {snapshot.trend === 'improving' ? '↑ Improving' : snapshot.trend === 'declining' ? '↓ Declining' : '→ Stable'} compared to last period
          </p>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[var(--color-text-primary)]">Key Pattern</h3>
          </div>
          <div className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
            {highlightContributor}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Primary contextual factor
          </p>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Battery className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[var(--color-text-primary)]">Focus Area</h3>
          </div>
          <div className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
            Active Recovery
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Recommended priority
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">Historical Stress & Recovery</h2>
        <TrendChart data={demoHistoricalTrends} />
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Contextual Interpretation</h2>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
          {interpretationText}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/ai-companion')}
            className="px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            Get AI Guidance
          </button>
          {!latestStressMappingResult && (
            <button 
              onClick={() => navigate('/assessments/stress-mapping')}
              className="px-6 py-3 bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] font-medium rounded-lg hover:bg-[var(--color-border)] transition-colors border border-[var(--color-border)]"
            >
              Take Stress Mapping
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
