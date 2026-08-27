import type { TrendDataPoint } from '../types';

export const demoHistoricalTrends: TrendDataPoint[] = [
  {
    id: 'wk-1',
    period: '4 weeks ago',
    wellbeingScore: 68,
    stressLevel: 55,
    energyLevel: 60,
    recoveryLevel: 50,
  },
  {
    id: 'wk-2',
    period: '3 weeks ago',
    wellbeingScore: 65,
    stressLevel: 60,
    energyLevel: 55,
    recoveryLevel: 45,
  },
  {
    id: 'wk-3',
    period: '2 weeks ago',
    wellbeingScore: 62,
    stressLevel: 70,
    energyLevel: 45,
    recoveryLevel: 40,
  },
  {
    id: 'wk-4',
    period: 'Last week',
    wellbeingScore: 60,
    stressLevel: 75,
    energyLevel: 40,
    recoveryLevel: 35,
  },
  {
    id: 'wk-5',
    period: 'This week',
    wellbeingScore: 58,
    stressLevel: 80,
    energyLevel: 35,
    recoveryLevel: 30,
  },
];
