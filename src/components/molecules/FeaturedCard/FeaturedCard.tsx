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
      className="group tt bg-featured rounded-xl overflow-hidden no-underline text-white h-[220px] grid grid-cols-1 md:grid-cols-[1fr_280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="p-6 flex flex-col justify-center gap-3 min-w-0">
        <div className="flex items-center gap-3">
          <span className="bg-white/15 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
            Featured
          </span>
        </div>
        <h3 className="text-[22px] font-bold leading-[1.35] line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed opacity-85 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs opacity-70">
          <time>{formattedDate}</time>
          {displayTags && displayTags.length > 0 && (
            <div className="flex gap-1.5">
              {displayTags.map((tag) => (
                <span
                  key={tag.slug}
                  className="bg-white/15 px-2 py-0.5 rounded text-[11px]"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {thumbnail && (
        <div className="hidden md:block p-4">
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="280px"
              priority
            />
          </div>
        </div>
      )}
    </Link>
  );
}
