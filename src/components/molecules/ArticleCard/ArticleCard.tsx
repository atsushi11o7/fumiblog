import Link from 'next/link';
import Image from 'next/image';
import type { Article, ViewMode } from '@/types/article';
import { SourceBadge } from '@/components/atoms/SourceBadge';
import { TagBadge } from '@/components/atoms/TagBadge';
import { SOURCE_COLORS } from '@/constants/sourceConfig';
import { LAYOUT } from '@/constants/layout';
import { formatDate } from '@/libs/utils';

export interface ArticleCardProps {
  article: Article;
  viewMode?: ViewMode;
  className?: string;
}

export function ArticleCard({
  article,
  viewMode = 'grid',
  className = '',
}: ArticleCardProps) {
  const { title, publishedAt, category, source, href, thumbnail, tags } = article;

  const isExternal = source === 'qiita' || source === 'zenn' || source === 'note';
  const displayTags = tags?.slice(0, LAYOUT.MAX_DISPLAY_TAGS);
  const formattedDate = formatDate(publishedAt);

  const tagsElement = displayTags && displayTags.length > 0 ? (
    <div className="flex gap-1 overflow-hidden">
      {displayTags.map((tag) => (
        <TagBadge key={tag.slug} label={tag.name} size="small" className="shrink-0" />
      ))}
    </div>
  ) : null;

  // Grid view
  if (viewMode === 'grid') {
    const gridThumbnail = thumbnail ? (
      <div className="relative overflow-hidden h-40 border-b border-border">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
        />
      </div>
    ) : (
      <div
        className="flex items-center justify-center h-40 border-b border-border"
        style={SOURCE_COLORS[source]}
      >
        <span className="mono font-bold text-lg uppercase tracking-widest">{source}</span>
      </div>
    );

    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`group block bg-card border border-border rounded-md overflow-hidden no-underline text-foreground hover:border-cat-accent transition-colors ${className}`.trim()}
      >
        {gridThumbnail}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2.5">
            <SourceBadge source={source} categoryName={category.name} />
            <time className="mono text-muted text-[10px] tracking-wider">{formattedDate}</time>
          </div>
          <h3 className="font-semibold leading-snug line-clamp-2 text-[15px] mb-2 h-11">
            {title}
          </h3>
          {tagsElement}
        </div>
      </Link>
    );
  }

  // List view
  const listThumbnail = thumbnail ? (
    <div className="relative overflow-hidden rounded-sm w-30 h-20 shrink-0 border border-border">
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="120px"
      />
    </div>
  ) : (
    <div
      className="flex items-center justify-center rounded-sm w-30 h-20 shrink-0 border border-border"
      style={SOURCE_COLORS[source]}
    >
      <span className="mono font-bold text-sm uppercase tracking-widest">{source}</span>
    </div>
  );

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`group flex bg-card border border-border rounded-md no-underline text-foreground hover:border-cat-accent transition-colors p-4 gap-5 ${className}`.trim()}
    >
      {listThumbnail}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1.5">
          <SourceBadge source={source} categoryName={category.name} />
          <time className="mono text-muted text-[10px] tracking-wider">{formattedDate}</time>
        </div>
        <h3 className="font-semibold leading-snug line-clamp-1 text-[15px] mb-1.5">
          {title}
        </h3>
        {tagsElement}
      </div>
    </Link>
  );
}
