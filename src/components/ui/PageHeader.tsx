import { cn } from '../../lib/utils';

export const PageHeader = ({
  title,
  description,
  className
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("mb-8 flex flex-col gap-2", className)}>
      <h1 className="text-3xl md:text-[2.15rem] font-semibold tracking-tight text-[var(--color-text-primary)]">
        {title}
      </h1>
      {description && (
        <p className="text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
};
