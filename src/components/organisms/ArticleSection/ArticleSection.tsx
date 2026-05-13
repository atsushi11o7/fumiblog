import Link from 'next/link';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { ScrollReveal } from '@/components/atoms/ScrollReveal/ScrollReveal';
import type { Article, ViewMode } from '@/types/article';

export interface ArticleSectionProps {
  title: string;
  articles: Article[];
  viewMode?: ViewMode;
  columns?: 2 | 3;
  viewMoreHref?: string;
  className?: string;
}

export function ArticleSection({
  title,
  articles,
  viewMode = 'grid',
  columns = 3,
  viewMoreHref,
  className = '',
}: ArticleSectionProps) {
  const gridCols = columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';
  const containerClass = viewMode === 'list'
    ? 'flex flex-col gap-5'
    : `grid ${gridCols} gap-5`;

  return (
    <section className={className.trim()}>
      {title && (
        <h2 className="mono text-sm uppercase tracking-widest text-syntax-comment mb-6">
          <span className="text-cat-accent" aria-hidden="true">▶ </span>
          {title}
        </h2>
      )}
      <div className={containerClass}>
        {articles.map((article, index) => (
          <ScrollReveal key={article.id} delay={index * 60}>
            <ArticleCard article={article} viewMode={viewMode} />
          </ScrollReveal>
        ))}
      </div>
      {viewMoreHref && (
        <div className="mt-6 text-center">
          <Link
            href={viewMoreHref}
            className="mono inline-flex items-center gap-1 text-xs uppercase tracking-widest text-secondary hover:text-cat-accent transition-colors no-underline"
          >
            <span aria-hidden="true">▸</span>
            more
          </Link>
        </div>
      )}
    </section>
  );
}
