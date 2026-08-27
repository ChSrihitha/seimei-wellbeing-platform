import type {
  EmployeeProfile,
  WellbeingSnapshot,
  WellbeingCheckIn,
  StressMappingResult,
  Recommendation,
  Program,
  Resource,
  WellnessPlanItem
} from '../types';

export const demoProfile: EmployeeProfile = {
  id: 'emp-001',
  name: 'Alex Mercer',
  role: 'Product Manager',
  department: 'Product & Engineering',
};

export const demoWellbeingSnapshot: WellbeingSnapshot = {
  overallScore: 72,
  stressLevel: 'moderate',
  energyLevel: 'moderate',
  trend: 'stable',
  lastCheckInDate: new Date().toISOString(),
};

export const demoCheckIns: WellbeingCheckIn[] = [
  {
    id: 'chk-001',
    date: new Date().toISOString(),
    mood: 'okay',
    primaryFeeling: 'A bit overwhelmed but managing',
  }
];

export const demoStressMappingResult: StressMappingResult = {
  id: 'smr-001',
  date: new Date().toISOString(),
  stressIntensity: 65,
  category: 'manageable',
  primaryContributors: ['Upcoming Launch Deadlines', 'Back-to-back Meetings'],
  peakPeriod: 'afternoon',
  insightSummary: 'Your stress tends to peak in the mid-afternoon, largely driven by consecutive meetings and approaching deadlines. Taking short resets before 2 PM could help level your energy.',
};

export const demoRecommendations: Recommendation[] = [
  {
    id: 'rec-001',
    title: 'The 15-Minute Reset',
    type: 'program',
    reason: 'Helps break the cycle of back-to-back afternoon meetings.',
    durationMinutes: 15,
    actionLabel: 'Add to Plan'
  },
  {
    id: 'rec-002',
    title: 'End-of-Day Dump',
    type: 'quick-action',
    reason: 'Clear launch deadline thoughts before logging off.',
    durationMinutes: 5,
    actionLabel: 'Try Now'
  }
];

export const demoPrograms: Program[] = [
  {
    id: 'prog-001',
    title: 'The 15-Minute Reset',
    description: 'A guided breath and stretch sequence at the SEIMEI Wellbeing Hive to reset your nervous system.',
    durationMinutes: 15,
    format: 'in-person',
    location: 'SEIMEI Wellbeing Hive - Room A'
  }
];

export const demoResources: Resource[] = [
  {
    id: 'res-001',
    title: 'Managing Launch Anxiety',
    type: 'article',
    description: 'Practical steps to keep perspective when project deadlines loom.',
  }
];

export const demoWellnessPlan: WellnessPlanItem[] = [
  {
    id: 'wpi-001',
    recommendationId: 'rec-002',
    title: 'End-of-Day Dump',
    type: 'quick-action',
    status: 'pending',
    addedDate: new Date().toISOString()
  }
];
