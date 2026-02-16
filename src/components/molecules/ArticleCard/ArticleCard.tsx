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
        <TagBadge key={tag.slug} label={tag.name} size="small" />
      ))}
    </div>
  ) : null;

  // Grid表示
  if (viewMode === 'grid') {
    const gridThumbnail = thumbnail ? (
      <img
        src={thumbnail}
        alt={title}
        className="w-full object-cover h-40"
      />
    ) : (
      <div
        className="w-full flex items-center justify-center h-40"
        style={sourceColors[source]}
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
        <div className="p-5">
          <div className="flex justify-between items-center mb-2.5">
            <SourceBadge source={source} categoryName={category.name} />
            <span className="text-muted text-xs">{formattedDate}</span>
          </div>
          <h3
            className="font-semibold leading-snug line-clamp-2 text-base mb-2"
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
      className="object-cover rounded-lg w-[120px] h-20 shrink-0"
    />
  ) : (
    <div
      className="flex items-center justify-center rounded-lg w-[120px] h-20 shrink-0"
      style={sourceColors[source]}
    >
      <span className="font-bold text-sm uppercase">{source}</span>
    </div>
  );

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`tt flex bg-card border border-border rounded-xl no-underline text-foreground hover:opacity-80 p-4 gap-5 ${className}`.trim()}
    >
      {listThumbnail}
      <div className="flex-1">
        <div className="flex justify-between mb-1.5">
          <SourceBadge source={source} categoryName={category.name} />
          <span className="text-muted text-xs">{formattedDate}</span>
        </div>
        <h3
          className="font-semibold leading-snug line-clamp-2 text-[15px] mb-1.5"
        >
          {title}
        </h3>
        {tagsElement}
      </div>
    </Link>
  );
}
