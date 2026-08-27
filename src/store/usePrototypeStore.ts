import { create } from 'zustand';
import type {
  EmployeeProfile,
  WellbeingSnapshot,
  WellbeingCheckIn,
  StressMappingResult,
  Recommendation,
  WellnessPlanItem
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
  
  // Actions
  addCheckIn: (checkIn: WellbeingCheckIn) => void;
  setStressMappingResult: (result: StressMappingResult) => void;
  addWellnessPlanItem: (item: Omit<WellnessPlanItem, 'id' | 'addedDate' | 'status'>) => void;
  updateWellnessPlanItemStatus: (id: string, status: WellnessPlanItem['status']) => void;
  removeWellnessPlanItem: (id: string) => void;
}

export const usePrototypeStore = create<PrototypeState>((set) => ({
  profile: demoProfile,
  snapshot: demoWellbeingSnapshot,
  checkIns: demoCheckIns,
  latestStressMappingResult: demoStressMappingResult,
  recommendations: demoRecommendations,
  wellnessPlan: demoWellnessPlan,

  addCheckIn: (checkIn) => set((state) => ({
    checkIns: [checkIn, ...state.checkIns],
    snapshot: {
      ...state.snapshot,
      lastCheckInDate: checkIn.date
    }
  })),

  setStressMappingResult: (result) => set({
    latestStressMappingResult: result
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
  }))
}));
