import type { CompanionContext, CompanionGuidance, Recommendation } from '../types';

export function resolveCompanionGuidance(context: CompanionContext): CompanionGuidance {
  const { latestStressMappingResult, currentCheckIn, recommendations, snapshot } = context;

  // Helper to find a specific recommendation type or just the first one
  const getRec = (idOrType?: string): Recommendation | undefined => {
    if (!recommendations || recommendations.length === 0) return undefined;
    if (idOrType) {
      const match = recommendations.find(r => r.id === idOrType || r.type === idOrType);
      if (match) return match;
    }
    return recommendations[0];
  };

  const toAction = (rec: Recommendation) => ({
    id: rec.id,
    label: rec.actionLabel || 'Add to Plan',
    actionType: 'add-to-plan' as const,
  });

  const exploreAction = {
    id: 'explore-programs',
    label: 'Explore Programs',
    actionType: 'navigate' as const,
    destination: '/programs'
  };

  // 1. Latest HIGH Stress Mapping result
  if (latestStressMappingResult && latestStressMappingResult.category === 'high') {
    const rec = getRec();
    return {
      title: 'High Stress Detected',
      summary: 'Your recent assessment indicates a high level of stress. It is important to prioritize recovery right now.',
      reason: 'Based on your latest Stress Mapping result showing high intensity.',
      primaryRecommendationId: rec?.id,
      suggestedActions: rec ? [toAction(rec), exploreAction] : [exploreAction],
      contextLabel: 'High Priority',
    };
  }

  // 2. Latest ELEVATED Stress Mapping result
  if (latestStressMappingResult && latestStressMappingResult.category === 'elevated') {
    const rec = getRec();
    return {
      title: 'Elevated Stress Patterns',
      summary: 'Your stress levels are elevated. Building in small resets can help manage this before it escalates.',
      reason: 'Based on your latest Stress Mapping result showing elevated intensity.',
      primaryRecommendationId: rec?.id,
      suggestedActions: rec ? [toAction(rec), exploreAction] : [exploreAction],
      contextLabel: 'Attention Recommended',
    };
  }

  // 3. Relevant primary contributor / poor recovery context
  if (latestStressMappingResult && latestStressMappingResult.primaryContributors?.length > 0) {
    const contributor = latestStressMappingResult.primaryContributors[0];
    const rec = getRec();
    return {
      title: 'Managing Contributors',
      summary: `It looks like ${contributor.toLowerCase()} is a primary contributor to your stress. Let's focus on managing this specific area.`,
      reason: `Based on your identified stress contributor: ${contributor}.`,
      primaryRecommendationId: rec?.id,
      suggestedActions: rec ? [toAction(rec), exploreAction] : [exploreAction],
      contextLabel: 'Targeted Focus',
    };
  } else if (snapshot && snapshot.energyLevel === 'low') {
    const rec = getRec();
    return {
      title: 'Low Energy Detected',
      summary: 'Your recent energy levels are low. Active recovery and rest should be your primary focus right now.',
      reason: 'Based on your overall wellbeing snapshot indicating low energy.',
      primaryRecommendationId: rec?.id,
      suggestedActions: rec ? [toAction(rec), exploreAction] : [exploreAction],
      contextLabel: 'Recovery Focus',
    };
  }

  // 4. Current Daily Check-In context
  if (currentCheckIn && (currentCheckIn.mood === 'struggling' || currentCheckIn.mood === 'exhausted')) {
    const rec = getRec();
    return {
      title: 'Tough Day Today',
      summary: 'Your daily check-in shows you are having a difficult time. Taking a moment for yourself can make a difference.',
      reason: `Based on your check-in mood: ${currentCheckIn.mood}.`,
      primaryRecommendationId: rec?.id,
      suggestedActions: rec ? [toAction(rec), exploreAction] : [exploreAction],
      contextLabel: 'Daily Support',
    };
  }

  // 5. Existing recommendation context
  if (recommendations && recommendations.length > 0) {
    const rec = recommendations[0];
    return {
      title: 'Your Next Step',
      summary: 'You have an active recommendation that might help balance your day.',
      reason: 'Based on your generated wellbeing recommendations.',
      primaryRecommendationId: rec.id,
      suggestedActions: [toAction(rec), exploreAction],
      contextLabel: 'Recommended Action',
    };
  }

  // 6. Default demo wellbeing context
  return {
    title: 'Wellbeing Check',
    summary: 'Consistent small actions lead to better recovery over time.',
    reason: 'Based on your general wellbeing snapshot.',
    primaryRecommendationId: undefined,
    suggestedActions: [exploreAction],
    contextLabel: 'General Guidance',
  };
}
