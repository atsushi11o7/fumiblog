type LineWidth = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';

interface MinimapLine {
  width: LineWidth;
  emphasized?: boolean;
}

const DEFAULT_LINES: MinimapLine[] = [
  { width: 's2' },
  { width: 's5' },
  { width: 's5' },
  { width: 's5' },
  { width: 's5' },
  { width: 's3' },
  { width: 's4', emphasized: true },
  { width: 's7' },
  { width: 's6' },
  { width: 's3' },
  { width: 's2' },
  { width: 's5' },
  { width: 's5' },
  { width: 's7' },
  { width: 's2' },
];

const WIDTH_CLASS: Record<LineWidth, string> = {
  s1: 'w-3/5',
  s2: 'w-4/5',
  s3: 'w-2/5',
  s4: 'w-full',
  s5: 'w-[70%]',
  s6: 'w-[90%]',
  s7: 'w-1/2',
};

export interface CodeEditorMinimapProps {
  lines?: MinimapLine[];
  className?: string;
}

export function CodeEditorMinimap({
  lines = DEFAULT_LINES,
  className = '',
}: CodeEditorMinimapProps) {
  return (
    <div
      className={`bg-bg-secondary border-l border-border px-3 py-5 flex flex-col gap-1 ${className}`.trim()}
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.emphasized
              ? `${WIDTH_CLASS[line.width]} h-2 bg-cat-accent rounded`
              : `${WIDTH_CLASS[line.width]} h-1 bg-border rounded`
          }
        />
      ))}
    </div>
  );
}
