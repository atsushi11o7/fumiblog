export interface CopyrightProps {
  siteName?: string;
  year?: number;
  className?: string;
}

export function Copyright({
  siteName = 'fumiblog',
  year = new Date().getFullYear(),
  className = '',
}: CopyrightProps) {
  return (
    <p className={`mono text-[11px] text-syntax-comment ${className}`.trim()}>
      {`// © ${year} ${siteName}`}
    </p>
  );
}
