'use client';

import { useState } from 'react';
import { ArticleSection } from '@/components/organisms/ArticleSection';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import type { Article, Category } from '@/types/article';

interface MicroCMSContentProps {
  articles: Article[];
  categories: Category[];
  maxArticles?: number;
  viewMoreHref?: string;
}

export function MicroCMSContent({
  articles,
  categories,
  maxArticles = 4,
  viewMoreHref,
}: MicroCMSContentProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter(
          (article) => article.category.slug === activeCategory
        );

  return (
    <section>
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      <div className="h-px bg-border mt-3 mb-5" />

      {filteredArticles.length > 0 ? (
        <ArticleSection
          title=""
          articles={filteredArticles.slice(0, maxArticles)}
          viewMode="list"
          viewMoreHref={viewMoreHref}
        />
      ) : (
        <p className="text-center py-12 text-secondary">
          このカテゴリの記事はまだありません。
        </p>
      )}
    </section>
  );
}
