import type { ViewMode } from '@/types/article';

export interface ViewModeSwitcherProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

const modes: { value: ViewMode; label: string }[] = [
  { value: 'grid', label: 'grid' },
  { value: 'list', label: 'list' },
];

export function ViewModeSwitcher({
  viewMode,
  onViewModeChange,
  className = '',
}: ViewModeSwitcherProps) {
  return (
    <div
      className={`inline-flex gap-1 p-1 bg-tag-bg border border-border rounded-md ${className}`.trim()}
      role="group"
      aria-label="View mode"
    >
      {modes.map(({ value, label }) => {
        const isActive = viewMode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onViewModeChange(value)}
            aria-pressed={isActive}
            className={`mono uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-sm transition-colors ${
              isActive
                ? 'bg-cat-accent text-white'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
