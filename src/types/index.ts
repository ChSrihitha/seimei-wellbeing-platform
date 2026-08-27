export type EmployeeProfile = {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  department?: string;
};

export type WellbeingSnapshot = {
  overallScore: number; // 0-100
  stressLevel: 'low' | 'moderate' | 'high' | 'peak';
  energyLevel: 'low' | 'moderate' | 'high';
  trend: 'improving' | 'stable' | 'declining';
  lastCheckInDate: string;
};

export type WellbeingCheckIn = {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'struggling' | 'exhausted';
  primaryFeeling?: string;
};

export type AssessmentQuestion = {
  id: string;
  text: string;
  type: 'single-choice' | 'multi-choice' | 'scale';
  options: { id: string; label: string; value: number | string }[];
};

export type Assessment = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: AssessmentQuestion[];
};

export type AssessmentResponse = {
  questionId: string;
  selectedOptionIds: string[];
};

export type StressMappingResult = {
  id: string;
  date: string;
  stressIntensity: number; // 0-100
  category: 'low' | 'manageable' | 'elevated' | 'high';
  primaryContributors: string[];
  peakPeriod: 'morning' | 'afternoon' | 'evening' | 'variable';
  insightSummary: string;
};

export type WellbeingInsight = {
  id: string;
  type: 'trend' | 'pattern' | 'observation';
  title: string;
  description: string;
  date: string;
};

export type Recommendation = {
  id: string;
  title: string;
  type: 'program' | 'resource' | 'quick-action' | 'session';
  reason: string;
  durationMinutes?: number;
  actionLabel: string;
};

export type WellnessPlanItem = {
  id: string;
  recommendationId?: string;
  title: string;
  type: 'program' | 'resource' | 'quick-action' | 'session';
  status: 'pending' | 'in-progress' | 'completed';
  addedDate: string;
  scheduledDate?: string;
};

export type Program = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  format: 'in-person' | 'digital' | 'hybrid';
  location?: string;
};

export type Resource = {
  id: string;
  title: string;
  type: 'article' | 'audio' | 'video' | 'guide';
  description: string;
  url?: string;
};

export type StressMappingResponses = {
  stressLevel: number;
  contributors: string[];
  peakTime: 'morning' | 'afternoon' | 'evening' | 'variable';
  workload: 'light' | 'manageable' | 'heavy' | 'overwhelming';
  recovery: 'often' | 'sometimes' | 'rarely' | 'never';
  reflection?: string;
};

export type TrendDataPoint = {
  id: string;
  period: string;
  wellbeingScore: number;
  stressLevel: number; // 0-100
  energyLevel: number; // 0-100
  recoveryLevel: number; // 0-100
};

export type CompanionContext = {
  latestStressMappingResult: StressMappingResult | null;
  currentCheckIn: WellbeingCheckIn | null;
  recommendations: Recommendation[];
  wellnessPlan: WellnessPlanItem[];
  snapshot: WellbeingSnapshot;
};

export type CompanionGuidance = {
  title: string;
  summary: string;
  reason: string;
  primaryRecommendationId?: string;
  suggestedActions: {
    id: string;
    label: string;
    actionType: 'add-to-plan' | 'navigate';
    destination?: string;
  }[];
  contextLabel?: string;
};

export type DemoAssessmentResult = {
  assessmentId: string;
  score: number;
  label: string;
  completedAt: string;
  summary: string;
};

export type AlertSettings = {
  highStress: boolean;
  burnoutRisk: boolean;
  weeklyReminder: boolean;
  planReminder: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
};

export type DemoNotification = {
  id: string;
  title: string;
  detail: string;
  destination?: string;
  read: boolean;
};

export type ProgramActivityState = {
  joined: string[];
  registered: string[];
  started: string[];
  bookings: Record<string, { date: string; time: string }>;
};
