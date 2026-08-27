import type { Assessment } from '../types';

export const stressMappingAssessment: Assessment = {
  id: 'assess-stress-mapping',
  title: 'Stress Mapping',
  description: 'Understand your stress patterns, identify key contributors, and discover targeted resets.',
  estimatedMinutes: 3,
  questions: [
    {
      id: 'q-stress-level',
      text: 'How would you rate your overall stress level right now?',
      type: 'scale',
      options: [
        { id: 'opt-sl-1', label: '1 - Very Low', value: 1 },
        { id: 'opt-sl-2', label: '2', value: 2 },
        { id: 'opt-sl-3', label: '3', value: 3 },
        { id: 'opt-sl-4', label: '4 - Moderate', value: 4 },
        { id: 'opt-sl-5', label: '5', value: 5 },
        { id: 'opt-sl-6', label: '6', value: 6 },
        { id: 'opt-sl-7', label: '7 - High', value: 7 },
        { id: 'opt-sl-8', label: '8', value: 8 },
        { id: 'opt-sl-9', label: '9', value: 9 },
        { id: 'opt-sl-10', label: '10 - Overwhelming', value: 10 }
      ]
    },
    {
      id: 'q-contributors',
      text: 'What feels like the primary contributors to your stress right now? (Select up to 3)',
      type: 'multi-choice',
      options: [
        { id: 'opt-c-workload', label: 'Heavy Workload', value: 'Heavy Workload' },
        { id: 'opt-c-deadlines', label: 'Upcoming Deadlines', value: 'Upcoming Deadlines' },
        { id: 'opt-c-meetings', label: 'Back-to-back Meetings', value: 'Back-to-back Meetings' },
        { id: 'opt-c-communication', label: 'Communication/Email Volume', value: 'Communication Volume' },
        { id: 'opt-c-balance', label: 'Work-Life Balance', value: 'Work-Life Balance' },
        { id: 'opt-c-recovery', label: 'Lack of Recovery Time', value: 'Lack of Recovery Time' },
        { id: 'opt-c-personal', label: 'Personal Responsibilities', value: 'Personal Responsibilities' }
      ]
    },
    {
      id: 'q-peak-time',
      text: 'When do you typically feel the most stressed or overwhelmed?',
      type: 'single-choice',
      options: [
        { id: 'opt-pt-morning', label: 'Morning (Start of day)', value: 'morning' },
        { id: 'opt-pt-afternoon', label: 'Afternoon (Mid-day slump)', value: 'afternoon' },
        { id: 'opt-pt-evening', label: 'Evening (After hours)', value: 'evening' },
        { id: 'opt-pt-variable', label: 'It varies day by day', value: 'variable' }
      ]
    },
    {
      id: 'q-workload',
      text: 'How would you describe your recent workload?',
      type: 'single-choice',
      options: [
        { id: 'opt-w-light', label: 'Light', value: 'light' },
        { id: 'opt-w-manageable', label: 'Manageable', value: 'manageable' },
        { id: 'opt-w-heavy', label: 'Heavy', value: 'heavy' },
        { id: 'opt-w-overwhelming', label: 'Overwhelming', value: 'overwhelming' }
      ]
    },
    {
      id: 'q-recovery',
      text: 'How often are you taking meaningful breaks or resets during the day?',
      type: 'single-choice',
      options: [
        { id: 'opt-r-often', label: 'Often (Multiple times a day)', value: 'often' },
        { id: 'opt-r-sometimes', label: 'Sometimes (Once a day)', value: 'sometimes' },
        { id: 'opt-r-rarely', label: 'Rarely (Skipping breaks)', value: 'rarely' },
        { id: 'opt-r-never', label: 'Never', value: 'never' }
      ]
    }
  ]
};
