import { Fragment } from 'react';

export interface CodeEditorBreadcrumbProps {
  segments: string[];
  className?: string;
}

export function CodeEditorBreadcrumb({
  segments,
  className = '',
}: CodeEditorBreadcrumbProps) {
  return (
    <nav
      className={`px-4 py-2 bg-bg-secondary border-b border-border mono text-[11px] text-muted ${className}`.trim()}
      aria-label="File path"
    >
      {segments.map((segment, i) => {
        const isLast = i === segments.length - 1;
        return (
          <Fragment key={`${i}-${segment}`}>
            <span className={isLast ? 'text-foreground font-semibold' : ''}>
              {segment}
            </span>
            {!isLast && (
              <span className="mx-1.5 opacity-50" aria-hidden="true">
                ›
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
