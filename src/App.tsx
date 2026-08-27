import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { AssessmentsHub } from './features/assessments/AssessmentsHub';
import { StressMappingFlow } from './features/stress-mapping/StressMappingFlow';
import { StressMappingResults } from './features/stress-mapping/StressMappingResults';

// We'll replace the Wellness Plan placeholder with our test surface in Stage 4
import { WellnessPlanPage } from './pages/WellnessPlanPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<DashboardPage />} />
        
        <Route path="assessments" element={<AssessmentsHub />} />
        
        <Route path="assessments/stress-mapping" element={<StressMappingFlow />} />
        
        <Route path="results/stress-mapping" element={<StressMappingResults />} />
        
        <Route path="insights" element={
          <PlaceholderPage title="Insights & Trends" description="Visual understanding of your wellbeing patterns over time." />
        } />
        
        <Route path="ai-companion" element={
          <PlaceholderPage title="AI Wellness Companion" description="Contextual guidance and supportive next steps." />
        } />
        
        <Route path="wellness-plan" element={<WellnessPlanPage />} />
        
        <Route path="programs" element={
          <PlaceholderPage title="Programs" description="Guided SEIMEI experiences and Wellbeing Hive offerings." />
        } />
        
        <Route path="resources" element={
          <PlaceholderPage title="Resources" description="Self-guided wellbeing content and reset tools." />
        } />

        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-2">404</h1>
            <p className="text-[var(--color-text-secondary)]">The requested page could not be found.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}
