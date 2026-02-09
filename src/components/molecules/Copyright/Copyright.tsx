export interface CopyrightProps {
  /**
   * サイト名
   */
  siteName?: string;
  /**
   * 年
   */
  year?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Copyright({
  siteName = 'FumiBlog',
  year = new Date().getFullYear(),
  className = '',
}: CopyrightProps) {
  return (
    <p className={`text-xs text-muted ${className}`.trim()}>
      © {year} {siteName}
    </p>
  );
}
