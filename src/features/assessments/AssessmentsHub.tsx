import { useNavigate } from 'react-router-dom';
import { ClipboardList, Brain, Flame, ArrowRight, Users, ShieldCheck } from 'lucide-react';

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
      icon: <ClipboardList size={28} strokeWidth={1.5} />,
    },
    {
      id: 'mental-wellness',
      title: 'Mental Wellness Check',
      description: 'A comprehensive review of your emotional baseline and mental clarity.',
      duration: '10 min',
      interactive: true,
      action: 'Start Assessment',
      icon: <Brain size={28} strokeWidth={1.5} />,
    },
    {
      id: 'burnout-risk',
      title: 'Burnout Risk Index',
      description: 'Evaluate your current risk factors for professional fatigue and burnout.',
      duration: '5 min',
      interactive: true,
      action: 'Start Assessment',
      icon: <Flame size={28} strokeWidth={1.5} />,
    },
    { id: 'sentiment', title: 'Sentiment Analysis', description: 'Track team mood and sentiment trends.', duration: '5 min', interactive: true, action: 'Start Assessment', icon: <Users size={28} strokeWidth={1.5} /> },
    { id: 'engagement', title: 'Engagement Prediction', description: 'Identify risk of disengagement early.', duration: '5–7 min', interactive: true, action: 'Start Assessment', icon: <ShieldCheck size={28} strokeWidth={1.5} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-[var(--color-text-primary)] mb-3">
            AI-Powered Assessments
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Choose a tool to understand, manage and improve wellbeing.
          </p>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] p-7 md:p-9">
        <div className="absolute -right-8 -top-10 text-[150px] font-serif text-[var(--color-brand-200)] opacity-40">✧</div>
        <div className="relative max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-600)]">SEIMEI approach</p><h2 className="mb-3 text-2xl font-semibold text-[var(--color-brand-900)] md:text-3xl">AI-Assisted &amp; Human Led</h2><p className="text-sm leading-relaxed text-[var(--color-brand-800)]">AI helps us see patterns, predict risks, and personalize interventions.<br />But the healing happens human to human.<br />We use AI only as a tool — <strong>never as a replacement for empathy.</strong></p></div>
      </section>

      <div><h2 className="mb-1 text-xl font-semibold">Assessment Tools</h2><p className="text-sm text-[var(--color-text-secondary)]">Select a tool below to get started with your assessment.</p></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {catalog.map((assessment) => (
          <div 
            key={assessment.id} 
            className={`flex flex-col p-6 rounded-2xl border transition-all ${
              assessment.interactive 
                ? 'bg-[var(--color-surface-secondary)] border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] shadow-sm hover:shadow-md' 
                : 'bg-[var(--color-surface-primary)] border-[var(--color-border)]/50 opacity-80'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                assessment.interactive 
                  ? 'bg-[var(--color-brand-100)] text-[var(--color-accent)]' 
                  : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]'
              }`}>
                {assessment.icon}
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] bg-[var(--color-surface-primary)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                  {assessment.duration}
                </span>
                {assessment.interactive && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-brand-100)] px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="text-lg font-display font-semibold text-[var(--color-text-primary)] mb-3">
              {assessment.title}
            </h3>
            
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-7 flex-1">
              {assessment.description}
            </p>
            
            <button
              onClick={() => {
                navigate(`/assessments/${assessment.id}`);
              }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium transition-all ${
                assessment.interactive 
                  ? 'bg-[var(--color-brand-900)] text-white hover:bg-[var(--color-brand-800)] shadow-sm' 
                  : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] cursor-default'
              }`}
            >
              <>{assessment.action} <ArrowRight size={18} /></>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
