import Link from 'next/link';
import type { Article } from '@/types/article';

export interface FeaturedCardProps {
  article: Article;
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  const { title, description, publishedAt, tags, href, thumbnail } = article;

  const formattedDate = new Date(publishedAt)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');

  const displayTags = tags?.slice(0, 3);

  return (
    <Link
      href={href}
      className="tt bg-featured rounded-xl overflow-hidden no-underline text-white hover:opacity-90 h-[220px] grid grid-cols-1 md:grid-cols-[1fr_280px]"
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
          <p className="text-sm leading-relaxed opacity-85 line-clamp-2 whitespace-pre-line">
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
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </Link>
  );
}
