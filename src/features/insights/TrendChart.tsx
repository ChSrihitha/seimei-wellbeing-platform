import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import type { TrendDataPoint } from '../../types';

interface TrendChartProps {
  data: TrendDataPoint[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis 
            dataKey="period" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-surface)', 
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-text-primary)'
            }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line 
            type="monotone" 
            name="Stress"
            dataKey="stressLevel" 
            stroke="var(--color-accent)" 
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--color-accent)' }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            name="Recovery"
            dataKey="recoveryLevel" 
            stroke="var(--color-status-positive, #10b981)" 
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--color-status-positive, #10b981)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
