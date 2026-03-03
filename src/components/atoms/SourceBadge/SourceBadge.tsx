import type { ArticleSource } from '@/types/article';
import { SOURCE_COLORS } from '@/constants/sourceConfig';

export interface SourceBadgeProps {
  /**
   * 記事のソース（プラットフォーム）
   */
  source: ArticleSource;
  /**
   * microCMSの場合のカテゴリ名
   */
  categoryName?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const baseStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 600,
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block',
  lineHeight: 1.4,
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

  // microCMSはテーマカラーを使用
  const themeClasses = source === 'microcms'
    ? 'bg-cat-accent text-white'
    : '';

  return (
    <span
      className={`${themeClasses} ${className}`.trim()}
      style={style}
    >
      {label}
    </span>
  );
}
