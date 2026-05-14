export interface CodeEditorTab {
  name: string;
  active?: boolean;
}

export interface CodeEditorTabBarProps {
  tabs: CodeEditorTab[];
  showAddButton?: boolean;
  className?: string;
}

export function CodeEditorTabBar({
  tabs,
  showAddButton = true,
  className = '',
}: CodeEditorTabBarProps) {
  return (
    <div
      className={`flex items-stretch bg-tag-bg border-b border-border mono text-xs ${className}`.trim()}
      role="tablist"
      aria-label="Open files"
    >
      {tabs.map((tab) => (
        <div
          key={tab.name}
          role="tab"
          aria-selected={tab.active}
          className={
            tab.active
              ? 'flex items-center gap-2 px-3.5 py-2 border-r border-border border-t-2 border-t-cat-accent -mt-px bg-background text-foreground'
              : 'flex items-center gap-2 px-3.5 py-2.5 border-r border-border text-secondary'
          }
        >
          {tab.active && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-cat-accent"
              aria-hidden="true"
            />
          )}
          <span>{tab.name}</span>
          <span className="text-muted" aria-hidden="true">×</span>
        </div>
      ))}
      {showAddButton && (
        <div
          className="flex items-center px-3.5 py-2.5 text-muted"
          aria-hidden="true"
        >
          +
        </div>
      )}
    </div>
  );
}
