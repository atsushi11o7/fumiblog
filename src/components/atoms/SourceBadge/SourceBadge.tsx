import type { ArticleSource } from '@/types/article';

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

const sourceColors: Record<ArticleSource, React.CSSProperties> = {
  microcms: {},
  qiita: { backgroundColor: '#55C500', color: '#fff' },
  zenn: { backgroundColor: '#3EA8FF', color: '#fff' },
  note: { backgroundColor: '#41C9B4', color: '#fff' },
};

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
    : { ...baseStyle, ...sourceColors[source] };

  // microCMSはテーマカラーを使用
  const themeClasses = source === 'microcms'
    ? 'bg-cat-accent text-accent-text'
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
