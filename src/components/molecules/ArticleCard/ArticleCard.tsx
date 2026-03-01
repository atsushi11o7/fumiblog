import Link from 'next/link';
import type { Article, ViewMode } from '@/types/article';
import { SourceBadge } from '@/components/atoms/SourceBadge';
import { TagBadge } from '@/components/atoms/TagBadge';
import { SOURCE_COLORS } from '@/constants/sourceConfig';
import { LAYOUT } from '@/constants/layout';
import { formatDate } from '@/libs/utils';

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
  const displayTags = tags?.slice(0, LAYOUT.MAX_DISPLAY_TAGS);
  const formattedDate = formatDate(publishedAt);

  // タグ要素（Grid/List共通）
  const tagsElement = displayTags && displayTags.length > 0 ? (
    <div className="flex gap-1 overflow-hidden">
      {displayTags.map(tag => (
        <TagBadge key={tag.slug} label={tag.name} size="small" className="shrink-0" />
      ))}
    </div>
  ) : null;

  // Grid表示
  if (viewMode === 'grid') {
    const gridThumbnail = thumbnail ? (
      <div className="overflow-hidden h-40">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    ) : (
      <div
        className="w-full flex items-center justify-center h-40"
        style={SOURCE_COLORS[source]}
      >
        <span className="font-bold text-lg uppercase">{source}</span>
      </div>
    );

    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`group block bg-card border border-border rounded-xl overflow-hidden no-underline text-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`.trim()}
      >
        {gridThumbnail}
        <div className="p-5">
          <div className="flex justify-between items-center mb-2.5">
            <SourceBadge source={source} categoryName={category.name} />
            <span className="text-muted text-xs">{formattedDate}</span>
          </div>
          <h3
            className="font-semibold leading-snug line-clamp-2 text-base mb-2 h-[2.75rem]"
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
    <div className="overflow-hidden rounded-lg w-[120px] h-20 shrink-0">
      <img
        src={thumbnail}
        alt={title}
        className="object-cover w-full h-full block group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  ) : (
    <div
      className="flex items-center justify-center rounded-lg w-[120px] h-20 shrink-0"
      style={SOURCE_COLORS[source]}
    >
      <span className="font-bold text-sm uppercase">{source}</span>
    </div>
  );

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`group flex bg-card border border-border rounded-xl no-underline text-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-4 gap-5 ${className}`.trim()}
    >
      {listThumbnail}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1.5">
          <SourceBadge source={source} categoryName={category.name} />
          <span className="text-muted text-xs">{formattedDate}</span>
        </div>
        <h3
          className="font-semibold leading-snug line-clamp-1 text-[15px] mb-1.5"
        >
          {title}
        </h3>
        {tagsElement}
      </div>
    </Link>
  );
}
