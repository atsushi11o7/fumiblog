import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types/article';
import { LAYOUT } from '@/constants/layout';
import { formatDate } from '@/libs/utils';

export interface FeaturedCardProps {
  article: Article;
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  const { title, description, publishedAt, tags, href, thumbnail } = article;

  const formattedDate = formatDate(publishedAt);
  const displayTags = tags?.slice(0, LAYOUT.MAX_DISPLAY_TAGS);

  return (
    <Link
      href={href}
      className={`group block bg-card border border-border rounded-md overflow-hidden no-underline text-foreground hover:border-cat-accent transition-colors ${
        thumbnail ? 'md:grid md:grid-cols-[1fr_280px]' : ''
      }`}
    >
      {/* Image — first on mobile, right column on desktop */}
      {thumbnail && (
        <div className="relative h-40 md:h-auto md:order-2 border-b md:border-b-0 md:border-l border-border">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 280px"
            priority
          />
        </div>
      )}

      {/* Text content */}
      <div className="md:order-1 p-6 flex flex-col gap-3 min-w-0">
        <span className="mono inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-syntax-comment self-start">
          <span className="text-cat-accent" aria-hidden="true">★</span>
          [ FEATURED ]
        </span>

        <h3 className="text-[22px] font-bold leading-[1.35] line-clamp-2 text-foreground">
          {title}
        </h3>

        {description && (
          <p className="text-sm leading-relaxed text-secondary line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center gap-3 mono text-[11px] text-muted tracking-wider mt-auto">
          <time>
            <span className="text-cat-accent mr-1" aria-hidden="true">▶</span>
            {formattedDate}
          </time>
          {displayTags && displayTags.length > 0 && (
            <div className="flex gap-1">
              {displayTags.map((tag) => (
                <span
                  key={tag.slug}
                  className="text-syntax-comment"
                >
                  <span className="opacity-60" aria-hidden="true">#</span>
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
