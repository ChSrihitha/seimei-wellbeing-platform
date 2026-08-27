import type { StressMappingResponses, StressMappingResult, Recommendation } from '../types';

export function calculateStressMapping(responses: StressMappingResponses): {
  result: StressMappingResult;
  recommendations: Recommendation[];
} {
  // 1. Calculate Score (0-100)
  // Stress level (1-10) contributes 40% (40 points)
  const stressLevelScore = (responses.stressLevel / 10) * 40;
  
  // Workload contributes 30% (30 points)
  const workloadScores = {
    light: 5,
    manageable: 15,
    heavy: 25,
    overwhelming: 30
  };
  const workloadScore = workloadScores[responses.workload];

  // Recovery contributes 30% (30 points) - inverted
  const recoveryScores = {
    often: 5,
    sometimes: 15,
    rarely: 25,
    never: 30
  };
  const recoveryScore = recoveryScores[responses.recovery];

  const totalScore = Math.round(stressLevelScore + workloadScore + recoveryScore);
  const stressIntensity = Math.min(100, Math.max(0, totalScore));

  // 2. Determine Category
  let category: StressMappingResult['category'] = 'low';
  if (stressIntensity >= 75) {
    category = 'high';
  } else if (stressIntensity >= 50) {
    category = 'elevated';
  } else if (stressIntensity >= 25) {
    category = 'manageable';
  }

  // 3. Peak Period & Contributors
  const peakPeriod = responses.peakTime;
  const primaryContributors = [...responses.contributors];

  // 4. Insight Summary
  let insightSummary = '';
  const article = category === 'elevated' ? 'an' : 'a';
  
  if (category === 'high' || category === 'elevated') {
    insightSummary = `Your stress patterns indicate ${article} ${category} load, peaking in the ${peakPeriod}. The combination of ${primaryContributors.join(', ')} is likely driving this. Taking structured resets is highly recommended.`;
  } else {
    insightSummary = `Your stress is currently ${category}. While ${primaryContributors.join(' and ')} are present, you are maintaining balance. A short reset during your ${peakPeriod} can help maintain this.`;
  }

  // 5. Generate Recommendations
  const recommendations: Recommendation[] = [];
  
  if (responses.recovery === 'rarely' || responses.recovery === 'never') {
    recommendations.push({
      id: `rec-gen-${Date.now()}-1`,
      title: 'The 15-Minute Reset',
      type: 'program',
      reason: 'Helps break the cycle of prolonged work without breaks.',
      durationMinutes: 15,
      actionLabel: 'Add to Plan'
    });
  }

  if (responses.workload === 'overwhelming' || responses.workload === 'heavy') {
    recommendations.push({
      id: `rec-gen-${Date.now()}-2`,
      title: 'End-of-Day Dump',
      type: 'quick-action',
      reason: 'Clear heavy workload thoughts before logging off.',
      durationMinutes: 5,
      actionLabel: 'Try Now'
    });
  }

  // Fallback recommendation if none triggered
  if (recommendations.length === 0) {
    recommendations.push({
      id: `rec-gen-${Date.now()}-3`,
      title: 'Weekly Unwind',
      type: 'session',
      reason: 'Maintain your manageable stress levels with guided reflection.',
      durationMinutes: 30,
      actionLabel: 'Add to Plan'
    });
  }

  const result: StressMappingResult = {
    id: `smr-${Date.now()}`,
    date: new Date().toISOString(),
    stressIntensity,
    category,
    primaryContributors,
    peakPeriod,
    insightSummary
  };

  return { result, recommendations };
}
