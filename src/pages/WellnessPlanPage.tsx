import { PageHeader } from '../components/ui/PageHeader';
import { usePrototypeStore } from '../store/usePrototypeStore';
import { Button } from '../components/ui/Button';

export const WellnessPlanPage = () => {
  const { wellnessPlan, recommendations, addWellnessPlanItem } = usePrototypeStore();
  
  const handleAddTestItem = () => {
    if (recommendations.length > 0) {
      const rec = recommendations[0];
      addWellnessPlanItem({
        title: rec.title,
        type: rec.type,
        recommendationId: rec.id
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Wellness Plan" description="Your personalized wellbeing journey." />
      
      <div className="flex-1 rounded-xl border border-dashed border-[var(--color-border)] bg-gray-50/50 flex flex-col p-8">
        <div className="text-center mb-8">
          <p className="text-[var(--color-text-secondary)]">
            This area is designated for <strong>Wellness Plan</strong>.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">
            Feature implementation will occur in a future PIP.
          </p>
        </div>

        {/* Foundation Verification Block - Isolated for PIP-001 */}
        <div className="mt-8 p-6 bg-white border border-blue-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">PIP-001 Foundation Verification</h3>
          <p className="text-sm text-blue-600 mb-4">
            This temporary block verifies that cross-route shared state (Zustand) is working.
            Add an item below, navigate to another page (like Dashboard), and return here to verify it persists.
          </p>
          
          <Button onClick={handleAddTestItem} variant="secondary" className="mb-6">
            Add Demo Recommendation to Plan
          </Button>

          <div className="space-y-3">
            <h4 className="font-medium text-[var(--color-text-primary)]">Current Plan Items: {wellnessPlan.length}</h4>
            {wellnessPlan.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No items in the plan yet.</p>
            ) : (
              <ul className="space-y-2">
                {wellnessPlan.map(item => (
                  <li key={item.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <span className="ml-2 text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-200 rounded-full">{item.type}</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(item.addedDate).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
