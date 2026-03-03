import { ArticleCard } from '@/components/molecules/ArticleCard';
import { ScrollReveal } from '@/components/atoms/ScrollReveal/ScrollReveal';
import type { Article, ViewMode } from '@/types/article';

export interface ArticleSectionProps {
  /**
   * セクションタイトル
   */
  title: string;
  /**
   * 記事一覧
   */
  articles: Article[];
  /**
   * 表示モード
   */
  viewMode?: ViewMode;
  /**
   * 表示列数（Grid時のみ有効）
   */
  columns?: 2 | 3;
  /**
   * "もっと見る"リンク
   */
  viewMoreHref?: string;
  /**
   * Additional CSS classes
   */
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
    <section className={`${className}`.trim()}>
      {title && (
        <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
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
          <a
            href={viewMoreHref}
            className="text-sm text-secondary hover:text-foreground tt no-underline"
          >
            もっと見る →
          </a>
        </div>
      )}
    </section>
  );
}
