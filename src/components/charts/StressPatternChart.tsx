import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface StressPatternChartProps {
  peakPeriod: 'morning' | 'afternoon' | 'evening' | 'variable';
  baseIntensity: number;
}

export function StressPatternChart({ peakPeriod, baseIntensity }: StressPatternChartProps) {
  // Derive a simple representative pattern based on the identified peak period
  const generateData = () => {
    const base = Math.max(10, baseIntensity - 30);
    const peak = Math.min(100, baseIntensity + 20);
    
    // Default shape is relatively flat
    let pattern = [
      { time: '8 AM', value: base },
      { time: '11 AM', value: base },
      { time: '2 PM', value: base },
      { time: '5 PM', value: base },
      { time: '8 PM', value: base },
    ];

    if (peakPeriod === 'morning') {
      pattern[0].value = peak;
      pattern[1].value = peak - 10;
    } else if (peakPeriod === 'afternoon') {
      pattern[2].value = peak;
    } else if (peakPeriod === 'evening') {
      pattern[3].value = peak;
      pattern[4].value = peak - 10;
    } else {
      // Variable: bouncy
      pattern = [
        { time: '8 AM', value: base + 10 },
        { time: '11 AM', value: peak },
        { time: '2 PM', value: base },
        { time: '5 PM', value: peak - 10 },
        { time: '8 PM', value: base + 20 },
      ];
    }

    return pattern;
  };

  const data = generateData();

  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-primary)' }}
            itemStyle={{ color: 'var(--color-accent)' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="var(--color-accent)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
