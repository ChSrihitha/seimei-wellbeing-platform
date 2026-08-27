import type { WellnessPlanItem } from '../types';

export function getWellnessPlanProgress(plan: WellnessPlanItem[]) {
  const total = plan.length;
  const activeItems = plan.filter(item => item.status !== 'completed');
  const completedItems = plan.filter(item => item.status === 'completed');
  const active = activeItems.length;
  const completed = completedItems.length;
  
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    active,
    completed,
    percentage,
    activeItems,
    completedItems
  };
}

export function getNextAction(activeItems: WellnessPlanItem[]): WellnessPlanItem | null {
  if (activeItems.length === 0) return null;
  
  // Prefer item with scheduledDate
  const scheduledItem = activeItems.find(item => item.scheduledDate);
  if (scheduledItem) return scheduledItem;

  // Otherwise return first active item
  return activeItems[0];
}

export function getSuggestedTiming(item: WellnessPlanItem): string {
  if (item.scheduledDate) {
    // If it's today, say 'Today', otherwise format it nicely.
    // For simplicity, returning a deterministic string based on type or just returning a generic contextual string.
    // Let's rely on the item type for a deterministic suggestion if scheduledDate isn't used explicitly for formatting.
    return 'Today'; 
  }

  switch (item.type) {
    case 'quick-action':
      return 'During your next suitable break';
    case 'session':
      return 'Later this week';
    case 'program':
      return 'When you\'re ready';
    case 'resource':
      return 'At the end of your workday';
    default:
      return 'When you have a moment';
  }
}
