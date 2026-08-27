import { create } from 'zustand';
import type {
  EmployeeProfile,
  WellbeingSnapshot,
  WellbeingCheckIn,
  StressMappingResult,
  Recommendation,
  WellnessPlanItem,
  DemoAssessmentResult,
  AlertSettings,
  DemoNotification,
  ProgramActivityState
} from '../types';
import {
  demoProfile,
  demoWellbeingSnapshot,
  demoCheckIns,
  demoStressMappingResult,
  demoRecommendations,
  demoWellnessPlan
} from '../data/demoScenario';

interface PrototypeState {
  profile: EmployeeProfile;
  snapshot: WellbeingSnapshot;
  checkIns: WellbeingCheckIn[];
  latestStressMappingResult: StressMappingResult | null;
  recommendations: Recommendation[];
  wellnessPlan: WellnessPlanItem[];
  assessmentResults: Record<string, DemoAssessmentResult>;
  alertSettings: AlertSettings;
  notifications: DemoNotification[];
  completedResources: string[];
  programActivity: ProgramActivityState;
  
  // Actions
  addCheckIn: (checkIn: WellbeingCheckIn) => void;
  setCurrentCheckIn: (checkIn: WellbeingCheckIn) => void;
  setStressMappingResult: (result: StressMappingResult) => void;
  setRecommendations: (recs: Recommendation[]) => void;
  addWellnessPlanItem: (item: Omit<WellnessPlanItem, 'id' | 'addedDate' | 'status'>) => void;
  updateWellnessPlanItemStatus: (id: string, status: WellnessPlanItem['status']) => void;
  removeWellnessPlanItem: (id: string) => void;
  setAssessmentResult: (result: DemoAssessmentResult) => void;
  setAlertSettings: (settings: Partial<AlertSettings>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  completeResource: (id: string) => void;
  updateProgramActivity: (activity: Partial<ProgramActivityState>) => void;
}

export const usePrototypeStore = create<PrototypeState>((set) => ({
  profile: demoProfile,
  snapshot: demoWellbeingSnapshot,
  checkIns: demoCheckIns,
  latestStressMappingResult: demoStressMappingResult,
  recommendations: demoRecommendations,
  wellnessPlan: demoWellnessPlan,
  assessmentResults: {},
  alertSettings: {
    highStress: true,
    burnoutRisk: true,
    weeklyReminder: true,
    planReminder: true,
    frequency: 'daily'
  },
  notifications: [
    { id: 'plan-due', title: 'Your Wellness Plan activity is due today', detail: 'Take your next small step.', destination: '/wellness-plan', read: false },
    { id: 'stress-ready', title: 'Your Stress Mapping result is ready', detail: 'Review your latest pattern and triggers.', destination: '/results/stress-mapping', read: false },
    { id: 'reset-time', title: 'Time for your 5-minute reset', detail: 'A short pause can restore your focus.', destination: '/resources/breathing', read: true },
    { id: 'coaching-session', title: 'Upcoming Wellness Coaching session', detail: 'Review available sessions.', destination: '/programs/coaching', read: true },
    { id: 'stress-trend', title: 'Your stress trend increased this week', detail: 'See what may be contributing.', destination: '/insights', read: true }
  ],
  completedResources: [],
  programActivity: { joined: [], registered: [], started: [], bookings: {} },

  addCheckIn: (checkIn) => set((state) => ({
    checkIns: [checkIn, ...state.checkIns],
    snapshot: {
      ...state.snapshot,
      lastCheckInDate: checkIn.date
    }
  })),

  setCurrentCheckIn: (checkIn) => set((state) => ({
    checkIns: [checkIn],
    snapshot: {
      ...state.snapshot,
      lastCheckInDate: checkIn.date
    }
  })),

  setStressMappingResult: (result) => set({
    latestStressMappingResult: result
  }),

  setRecommendations: (recommendations) => set({
    recommendations
  }),

  addWellnessPlanItem: (item) => set((state) => {
    const newItem: WellnessPlanItem = {
      ...item,
      id: `wpi-${Date.now()}`,
      addedDate: new Date().toISOString(),
      status: 'pending'
    };
    return { wellnessPlan: [...state.wellnessPlan, newItem] };
  }),

  updateWellnessPlanItemStatus: (id, status) => set((state) => ({
    wellnessPlan: state.wellnessPlan.map(item => 
      item.id === id ? { ...item, status } : item
    )
  })),

  removeWellnessPlanItem: (id) => set((state) => ({
    wellnessPlan: state.wellnessPlan.filter(item => item.id !== id)
  })),

  setAssessmentResult: (result) => set((state) => ({
    assessmentResults: { ...state.assessmentResults, [result.assessmentId]: result }
  })),

  setAlertSettings: (settings) => set((state) => ({
    alertSettings: { ...state.alertSettings, ...settings }
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(notification => notification.id === id ? { ...notification, read: true } : notification)
  })),

  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(notification => ({ ...notification, read: true }))
  })),

  completeResource: (id) => set((state) => ({
    completedResources: state.completedResources.includes(id) ? state.completedResources : [...state.completedResources, id]
  })),

  updateProgramActivity: (activity) => set((state) => ({
    programActivity: { ...state.programActivity, ...activity }
  }))
}));
