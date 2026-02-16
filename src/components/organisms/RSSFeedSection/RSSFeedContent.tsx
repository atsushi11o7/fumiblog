import { ArticleSection } from '@/components/organisms/ArticleSection';
import type { Article } from '@/types/article';

export interface RSSFeedContentProps {
  articles: Article[];
  label: string;
  color: string;
  maxArticles?: number;
  viewMoreHref?: string;
}

export function RSSFeedContent({
  articles,
  label,
  color,
  maxArticles = 4,
  viewMoreHref,
}: RSSFeedContentProps) {
  return (
    <section>
      <h2
        className="mono font-normal tracking-[0.05em] uppercase mb-4"
        style={{ color, fontSize: '13px' }}
      >
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
