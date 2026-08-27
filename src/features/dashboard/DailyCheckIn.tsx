import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { usePrototypeStore } from '../../store/usePrototypeStore';
import type { WellbeingCheckIn } from '../../types';

export function DailyCheckIn() {
  const { setCurrentCheckIn } = usePrototypeStore();
  const [selectedMood, setSelectedMood] = useState<WellbeingCheckIn['mood'] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const moods: { value: WellbeingCheckIn['mood']; label: string; emoji: string }[] = [
    { value: 'great', label: 'Great', emoji: '🌟' },
    { value: 'good', label: 'Good', emoji: '😊' },
    { value: 'okay', label: 'Okay', emoji: '😐' },
    { value: 'struggling', label: 'Struggling', emoji: '😓' },
    { value: 'exhausted', label: 'Exhausted', emoji: '🔋' },
  ];

  const handleCheckIn = () => {
    if (!selectedMood) return;

    setCurrentCheckIn({
      id: `chk-${Date.now()}`,
      date: new Date().toISOString(),
      mood: selectedMood,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="bg-[var(--color-surface-secondary)] border-transparent shadow-sm">
        <CardContent className="p-6 flex flex-col items-center text-center justify-center space-y-4">
          <div className="text-4xl">🌱</div>
          <div className="space-y-1">
            <h3 className="font-medium text-lg">Thank you for checking in</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Your dashboard has been updated based on how you're feeling today.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
            Update Check-In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Check-In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-[var(--color-text-secondary)]">
          How are you feeling right now?
        </p>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <Button
              key={m.value}
              variant={selectedMood === m.value ? 'primary' : 'secondary'}
              onClick={() => setSelectedMood(m.value)}
              className="flex-1 min-w-[100px] flex flex-col items-center py-6 h-auto gap-2"
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-medium">{m.label}</span>
            </Button>
          ))}
        </div>
        <Button 
          className="w-full mt-4" 
          disabled={!selectedMood} 
          onClick={handleCheckIn}
        >
          Complete Check-In
        </Button>
      </CardContent>
    </Card>
  );
}
