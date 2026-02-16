'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { ViewModeSwitcher } from '@/components/atoms/ViewModeSwitcher';
import type { Category, Article, ViewMode } from '@/types/article';

const SOURCE_CATEGORIES: Category[] = [
  { name: 'FumiBlog', slug: 'microcms' },
  { name: 'Qiita', slug: 'qiita' },
  { name: 'Zenn', slug: 'zenn' },
];

interface BlogContentProps {
  articles: Article[];
}

export function BlogContent({ articles }: BlogContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((article) => article.source === activeCategory);

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[2rem] font-bold text-foreground">Blog</h1>
        <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* ソースフィルター */}
      <CategoryFilter
        categories={SOURCE_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 記事一覧 */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 text-secondary">
          <p>記事が見つかりませんでした。</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'flex flex-col gap-6'
          }
        >
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
