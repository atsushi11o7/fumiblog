import Link from 'next/link';
import type { Article, ArticleSource, ViewMode } from '@/types/article';
import { SourceBadge } from '@/components/atoms/SourceBadge';
import { TagBadge } from '@/components/atoms/TagBadge';

export interface ArticleCardProps {
  /**
   * 記事データ
   */
  article: Article;
  /**
   * 表示モード
   */
  viewMode?: ViewMode;
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

/** タグ表示の最大数 */
const MAX_DISPLAY_TAGS = 3;

export function ArticleCard({
  article,
  viewMode = 'grid',
  className = '',
}: ArticleCardProps) {
  const {
    title,
    publishedAt,
    category,
    source,
    href,
    thumbnail,
    tags,
  } = article;

  const isExternal = source === 'qiita' || source === 'zenn' || source === 'note';
  const displayTags = tags?.slice(0, MAX_DISPLAY_TAGS);

  const formattedDate = new Date(publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');

  // タグ要素（Grid/List共通）
  const tagsElement = displayTags && displayTags.length > 0 ? (
    <div className="flex gap-1">
      {displayTags.map(tag => (
        <TagBadge key={tag} label={tag} size="small" />
      ))}
    </div>
  ) : null;

  // Grid表示
  if (viewMode === 'grid') {
    const gridThumbnail = thumbnail ? (
      <img
        src={thumbnail}
        alt={title}
        className="w-full object-cover"
        style={{ height: '160px' }}
      />
    ) : (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: '160px', ...sourceColors[source] }}
      >
        <span className="font-bold text-lg uppercase">{source}</span>
      </div>
    );

    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`tt block bg-card border border-border rounded-xl overflow-hidden no-underline text-foreground hover:opacity-80 ${className}`.trim()}
      >
        {gridThumbnail}
        <div style={{ padding: '20px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '10px' }}>
            <SourceBadge source={source} categoryName={category[0]} />
            <span className="text-muted" style={{ fontSize: '12px' }}>{formattedDate}</span>
          </div>
          <h3
            className="font-semibold leading-snug line-clamp-2"
            style={{ fontSize: '16px', marginBottom: '8px' }}
          >
            {title}
          </h3>
          {tagsElement}
        </div>
      </Link>
    );
  }

  // List表示
  const listThumbnail = thumbnail ? (
    <img
      src={thumbnail}
      alt={title}
      className="object-cover rounded-lg"
      style={{ width: '120px', height: '80px', flexShrink: 0 }}
    />
  ) : (
    <div
      className="flex items-center justify-center rounded-lg"
      style={{ width: '120px', height: '80px', flexShrink: 0, ...sourceColors[source] }}
    >
      <span className="font-bold text-sm uppercase">{source}</span>
    </div>
  );

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`tt flex bg-card border border-border rounded-xl no-underline text-foreground hover:opacity-80 ${className}`.trim()}
      style={{ padding: '16px', gap: '20px' }}
    >
      {listThumbnail}
      <div className="flex-1">
        <div className="flex justify-between" style={{ marginBottom: '6px' }}>
          <SourceBadge source={source} categoryName={category[0]} />
          <span className="text-muted" style={{ fontSize: '12px' }}>{formattedDate}</span>
        </div>
        <h3
          className="font-semibold leading-snug line-clamp-2"
          style={{ fontSize: '15px', marginBottom: '6px' }}
        >
          {title}
        </h3>
        {tagsElement}
      </div>
    </Link>
  );
}
