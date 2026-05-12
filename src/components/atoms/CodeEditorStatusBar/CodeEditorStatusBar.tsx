export interface CodeEditorStatusBarProps {
  branch?: string;
  warnings?: number;
  errors?: number;
  line?: number;
  column?: number;
  indent?: string;
  encoding?: string;
  language?: string;
  className?: string;
}

export function CodeEditorStatusBar({
  branch = 'develop',
  warnings = 0,
  errors = 0,
  line = 1,
  column = 1,
  indent = 'Spaces: 2',
  encoding = 'UTF-8',
  language = 'TypeScript',
  className = '',
}: CodeEditorStatusBarProps) {
  return (
    <div
      className={`flex items-center gap-4 px-3.5 py-1.5 bg-cat-accent text-white mono text-[11px] ${className}`.trim()}
      role="status"
      aria-label="Editor status"
    >
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true">🌿</span>
        {branch}
      </span>
      <span className="inline-flex items-center gap-1.5">⚠ {warnings}</span>
      <span className="inline-flex items-center gap-1.5">✗ {errors}</span>
      <span className="flex-1" />
      <span>Ln {line}, Col {column}</span>
      <span>{indent}</span>
      <span>{encoding}</span>
      <span>{language}</span>
    </div>
  );
}
