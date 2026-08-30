import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flame,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { demoAssessmentConfigs } from '../../data/assessmentConfigs';
import { usePrototypeStore } from '../../store/usePrototypeStore';

const icons = {
  'mental-wellness': HeartPulse,
  'burnout-risk': Flame,
  engagement: Users,
  sentiment: Sparkles,
  'personalized-recommendations': Lightbulb,
  'smart-alerts': ShieldCheck,
};

export function DemoAssessmentPage() {
  const navigate = useNavigate();

  const { assessmentId = 'mental-wellness' } = useParams();

  const config =
    demoAssessmentConfigs[assessmentId] ??
    demoAssessmentConfigs['mental-wellness'];

  const Icon =
    icons[assessmentId as keyof typeof icons] ?? HeartPulse;

  const addWellnessPlanItem = usePrototypeStore(
    state => state.addWellnessPlanItem
  );

  const setAssessmentResult = usePrototypeStore(
    state => state.setAssessmentResult
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [text, setText] = useState('');
  const [complete, setComplete] = useState(false);

  const choose = (value: number) => {
    const scoringDirection =
      config.questionScoring?.[step] ?? 'normal';

    const scoredValue =
      scoringDirection === 'reverse'
        ? 6 - value
        : value;

    const next = [...answers, scoredValue];

    setAnswers(next);

    if (step === config.questions.length - 1) {
      const resultScore =
        config.kind === 'sentiment'
          ? value === 3
            ? 78
            : value === 1
              ? 32
              : 55
          : Math.round(
              (next.reduce(
                (sum, answer) => sum + answer,
                0
              ) /
                Math.max(next.length * 5, 1)) *
                100
            );

      setAssessmentResult({
        assessmentId,
        score: resultScore,
        label: config.resultLabel(resultScore),
        completedAt: new Date().toISOString(),
        summary: config.resultText(resultScore),
      });

      setComplete(true);
    } else {
      setStep(current => current + 1);
    }
  };

  const submitSentiment = () => {
    const lower = text.toLowerCase();

    const positive = [
      'great',
      'productive',
      'happy',
      'motivated',
      'good',
    ].some(word => lower.includes(word));

    const negative = [
      'stressful',
      'overwhelmed',
      'tired',
      'exhausted',
      'difficult',
    ].some(word => lower.includes(word));

    choose(
      positive && !negative
        ? 3
        : negative && !positive
          ? 1
          : 2
    );
  };

  const score =
    config.kind === 'sentiment'
      ? answers[0] === 3
        ? 78
        : answers[0] === 1
          ? 32
          : 55
      : Math.round(
          (answers.reduce(
            (sum, value) => sum + value,
            0
          ) /
            Math.max(answers.length * 5, 1)) *
            100
        );

  const currentOptions: string[] =
    Array.isArray(config.options[0])
      ? (config.options as string[][])[step] ?? []
      : (config.options as string[]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Back button */}
      <button
        onClick={() => navigate('/assessments')}
        className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={13} className="mr-1 inline" />
        Back to Assessments
      </button>

      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${config.color}18`,
              color: config.color,
            }}
          >
            <Icon size={27} />
          </span>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {config.title}
            </h1>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {config.intro}
            </p>
          </div>
        </div>

        <span className="whitespace-nowrap text-xs text-[var(--color-text-secondary)]">
          {complete
            ? 'Complete'
            : `${step + 1} / ${config.questions.length}`}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${
              complete
                ? 100
                : ((step + 1) / config.questions.length) * 100
            }%`,
            backgroundColor: config.color,
          }}
        />
      </div>

      {!complete ? (
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-[0_4px_20px_rgba(42,64,38,0.04)]">
          {/* Reflection number */}
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: config.color }}
          >
            Reflection {step + 1}
          </p>

          {/* Question */}
          <h2 className="text-xl font-semibold">
            {config.questions[step]}
          </h2>

          {config.kind === 'sentiment' ? (
            <>
              {/* Sentiment input */}
              <textarea
                value={text}
                onChange={event => setText(event.target.value)}
                placeholder="It was productive, but challenging..."
                className="mt-6 min-h-36 w-full resize-none rounded-xl border border-[var(--color-border)] p-4 text-sm outline-none focus:border-[var(--color-accent)]"
              />

              <Button
                className="mt-4 w-full"
                disabled={!text.trim()}
                onClick={submitSentiment}
              >
                Analyse Response
                <ArrowRight
                  size={15}
                  className="ml-2"
                />
              </Button>
            </>
          ) : (
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(currentOptions.length
                ? currentOptions
                : ['Not at all', 'Sometimes', 'Often']
              ).map((label, index) => (
                <button
                  key={label}
                  onClick={() => choose(index + 1)}
                  className="rounded-xl border border-[var(--color-border)] p-4 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)]"
                >
                  {label}

                  <ArrowRight
                    size={14}
                    className="float-right mt-0.5 text-[var(--color-text-secondary)]"
                  />
                </button>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_4px_20px_rgba(42,64,38,0.04)]">
          {/* Result icon */}
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
            <CheckCircle2 size={30} />
          </span>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            Your result
          </p>

          {/* Result label */}
          <h2
            className="mt-2 text-4xl font-semibold"
            style={{ color: config.color }}
          >
            {config.resultLabel(score)}
          </h2>

          {/* Score */}
          <p className="mt-2 text-2xl font-semibold">
            {score}
            <span className="text-sm font-normal text-[var(--color-text-secondary)]">
              {' '}
              / 100
            </span>
          </p>

          {/* Result description */}
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {config.resultText(score)}
          </p>

          {/* Next steps */}
          <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2">
            <Button
              onClick={() => {
                if (
                  assessmentId ===
                  'personalized-recommendations'
                ) {
                  addWellnessPlanItem({
                    title: 'Daily Breathing Sessions',
                    type: 'program',
                  });
                }

                navigate('/recommendations');
              }}
            >
              View Next Steps
              <ArrowRight
                size={15}
                className="ml-2"
              />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/wellness-plan')}
            >
              Open Wellness Plan
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}