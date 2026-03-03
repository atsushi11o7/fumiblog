import type { ViewMode } from '@/types/article';

export interface ViewModeSwitcherProps {
  /**
   * 現在の表示モード
   */
  viewMode: ViewMode;
  /**
   * 表示モード変更時のコールバック
   */
  onViewModeChange: (mode: ViewMode) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const modes: { value: ViewMode; label: string }[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
];

const containerStyle: React.CSSProperties = {
  display: 'inline-flex',
  gap: '4px',
  padding: '4px',
  borderRadius: '8px',
};

const buttonBaseStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '12px',
  cursor: 'pointer',
};

export function ViewModeSwitcher({
  viewMode,
  onViewModeChange,
  className = '',
}: ViewModeSwitcherProps) {
  return (
    <div
      className={`tt bg-tag-bg ${className}`.trim()}
      style={containerStyle}
      role="group"
      aria-label="View mode"
    >
      {modes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`tt ${viewMode === value ? 'bg-card text-foreground' : 'text-muted'}`}
          style={{
            ...buttonBaseStyle,
            fontWeight: viewMode === value ? 600 : 400,
            backgroundColor: viewMode === value ? undefined : 'transparent',
          }}
          onClick={() => onViewModeChange(value)}
          aria-pressed={viewMode === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
