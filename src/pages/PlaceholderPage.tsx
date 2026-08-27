import { PageHeader } from '../components/ui/PageHeader';

export const PlaceholderPage = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title={title} description={description} />
      <div className="flex-1 rounded-xl border border-dashed border-[var(--color-border)] bg-gray-50/50 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">
          This area is designated for <strong>{title}</strong>.
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
          Feature implementation will occur in a future PIP.
        </p>
      </div>
    </div>
  );
};
