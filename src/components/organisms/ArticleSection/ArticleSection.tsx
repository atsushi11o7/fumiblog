import { ArticleCard } from '@/components/molecules/ArticleCard';
import type { Article } from '@/types/article';

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
   * 表示列数（Grid）
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
  columns = 3,
  viewMoreHref,
  className = '',
}: ArticleSectionProps) {
  const gridCols = columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';

  return (
    <section className={`${className}`.trim()}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {viewMoreHref && (
          <a
            href={viewMoreHref}
            className="text-sm text-secondary hover:text-foreground tt no-underline"
          >
            もっと見る →
          </a>
        )}
      </div>
      <div className={`grid ${gridCols} gap-5`}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} viewMode="grid" />
        ))}
      </div>
    </section>
  );
}
