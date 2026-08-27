export type DemoAssessmentKind = 'scale' | 'sentiment';

export type DemoAssessmentConfig = {
  title: string;
  intro: string;
  kind: DemoAssessmentKind;
  color: string;
  questions: string[];
  options: string[];
  resultLabel: (score: number) => string;
  resultText: (score: number) => string;
};

const riskLabel = (score: number) => score >= 67 ? 'High Risk' : score >= 34 ? 'Moderate Risk' : 'Low Risk';
const engagementLabel = (score: number) => score >= 67 ? 'High Engagement' : score >= 34 ? 'Moderate Engagement' : 'At Risk';

export const demoAssessmentConfigs: Record<string, DemoAssessmentConfig> = {
  'mental-wellness': {
    title: 'Mental Wellness Check', intro: 'Reflect on your mood, connection, motivation, and work-life balance.', kind: 'scale', color: '#7653ad',
    questions: ['How would you describe your mood recently?', 'How often have you felt overwhelmed?', 'How satisfied are you with your work-life balance?', 'How connected do you feel to people around you?', 'How often have you felt motivated this week?'],
    options: ['Very Poor', 'Poor', 'Neutral', 'Good', 'Excellent'],
    resultLabel: score => score >= 67 ? 'Strong Wellbeing' : score >= 34 ? 'Steady Wellbeing' : 'Needs Support',
    resultText: score => `Your overall wellbeing score is ${score}/100. Consider one small action that supports your emotional balance today.`,
  },
  'burnout-risk': {
    title: 'Burnout Risk Index', intro: 'Notice the patterns that can signal professional fatigue before they become overwhelming.', kind: 'scale', color: '#d87935',
    questions: ['Do you feel exhausted before your workday starts?', 'How often do you think about work after office hours?', 'Have you lost motivation toward your job?', 'Do you struggle to concentrate?', 'Do you feel appreciated at work?', 'Have you considered quitting recently?', 'How often do you feel overwhelmed?', 'How many hours do you typically work?'],
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], resultLabel: riskLabel,
    resultText: score => `Your demo burnout risk is ${score}%. The strongest signals point to workload recovery and the boundaries around your workday.`,
  },
  engagement: {
    title: 'Engagement Prediction', intro: 'Reflect on meaning, recognition, motivation, and growth at work.', kind: 'scale', color: '#3d73bd',
    questions: ['How motivated do you feel at work?', 'Do you feel your work is meaningful?', 'Do you feel recognized for your contributions?', 'Would you recommend your workplace to others?', 'Do you see opportunities for growth?'],
    options: ['1 - Not at all', '2 - A little', '3 - Somewhat', '4 - Mostly', '5 - Very much'], resultLabel: engagementLabel,
    resultText: score => `Your engagement score is ${score}%. This points to the workplace conditions that most influence your energy and connection.`,
  },
  'personalized-recommendations': {
    title: 'Personalized Recommendation Engine', intro: 'Choose preferences so your next steps fit your day, not the other way around.', kind: 'scale', color: '#c28a25',
    questions: ['What would you most like to improve?', 'How much time can you dedicate each day?', 'What type of support do you prefer?', 'What time do you prefer for wellness activities?'],
    options: ['Stress / Sleep / Focus', '5 / 10 / 15 / 30+ minutes', 'Self-guided / Group / Coaching', 'Morning / Afternoon / Evening'], resultLabel: () => 'Plan Personalised',
    resultText: () => 'Based on your preferences, we recommend Daily Breathing Sessions, Sleep Recovery Program, and a Weekly Wellness Coaching session.',
  },
  sentiment: {
    title: 'Sentiment Analysis', intro: 'Share a few words about your week and receive a simple demo sentiment readout.', kind: 'sentiment', color: '#33867c', questions: ['How has your week been?'], options: [], resultLabel: score => score > 60 ? 'Positive' : score < 40 ? 'Negative' : 'Neutral', resultText: score => score > 60 ? 'Your response suggests positive momentum and a useful sense of progress.' : score < 40 ? 'Your response suggests moderate stress caused primarily by workload and deadlines.' : 'Your response suggests a balanced or mixed week. A short reset may help create more clarity.',
  },
  'smart-alerts': {
    title: 'Smart Alerts', intro: 'Choose the wellbeing signals you would like gentle reminders about.', kind: 'scale', color: '#5c9547', questions: ['Would you like a reminder to take a reset?', 'Would a weekly wellbeing summary help?', 'Would you like alerts about relevant programs?'], options: ['No', 'Yes'], resultLabel: () => 'Preferences Saved', resultText: () => 'Your alert preferences are ready. You can adjust them whenever your rhythm changes.',
  },
};