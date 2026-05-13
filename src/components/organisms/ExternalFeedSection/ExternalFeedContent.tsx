import { ArticleSection } from '@/components/organisms/ArticleSection';
import type { Article } from '@/types/article';

export interface ExternalFeedContentProps {
  articles: Article[];
  label: string;
  color: string;
  maxArticles?: number;
  viewMoreHref?: string;
}

export function ExternalFeedContent({
  articles,
  label,
  color,
  maxArticles = 4,
  viewMoreHref,
}: ExternalFeedContentProps) {
  return (
    <section>
      <h2
        className="mono tracking-widest uppercase mb-6 inline-flex items-center gap-1.5 text-sm"
        style={{ color }}
      >
        <span aria-hidden="true">▶</span>
        {label}
      </h2>
      <ArticleSection
        title=""
        articles={articles.slice(0, maxArticles)}
        viewMode="list"
        viewMoreHref={viewMoreHref}
      />
    </section>
  );
}
