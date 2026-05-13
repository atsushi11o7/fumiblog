import type { ArticleSource } from '@/types/article';
import { SOURCE_COLORS } from '@/constants/sourceConfig';

export interface SourceBadgeProps {
  source: ArticleSource;
  categoryName?: string;
  className?: string;
}

const baseStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 600,
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block',
  lineHeight: 1.4,
  letterSpacing: '0.05em',
};

export function SourceBadge({
  source,
  categoryName,
  className = '',
}: SourceBadgeProps) {
  const label = source === 'microcms' && categoryName
    ? categoryName
    : source.charAt(0).toUpperCase() + source.slice(1);

  const style = source === 'microcms'
    ? { ...baseStyle }
    : { ...baseStyle, ...SOURCE_COLORS[source] };

  const themeClasses = source === 'microcms'
    ? 'bg-cat-accent text-white'
    : '';

  return (
    <span
      className={`mono uppercase ${themeClasses} ${className}`.trim()}
      style={style}
    >
      {label}
    </span>
  );
}
