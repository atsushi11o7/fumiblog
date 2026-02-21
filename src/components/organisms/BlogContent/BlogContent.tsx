'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { ViewModeSwitcher } from '@/components/atoms/ViewModeSwitcher';
import type { Category, Article, ArticleSource, ViewMode } from '@/types/article';

const SOURCE_CATEGORIES: Category[] = [
  { name: 'FumiBlog', slug: 'microcms' },
  { name: 'Qiita', slug: 'qiita' },
  { name: 'Zenn', slug: 'zenn' },
];

const SOURCE_NAMES: ArticleSource[] = ['microcms', 'qiita', 'zenn', 'note'];

function searchArticles(articles: Article[], query: string): Article[] {
  const lower = query.toLowerCase();
  const matchedSource = SOURCE_NAMES.find((s) => s === lower);

  return articles.filter((a) => {
    if (matchedSource && a.source === matchedSource) return true;
    if (a.title.toLowerCase().includes(lower)) return true;
    if (a.description?.toLowerCase().includes(lower)) return true;
    if (a.category.name.toLowerCase().includes(lower)) return true;
    if (a.tags?.some((t) => t.name.toLowerCase().includes(lower))) return true;
    return false;
  });
}

export interface BlogContentProps {
  articles: Article[];
  initialQuery?: string;
}

export function BlogContent({ articles, initialQuery = '' }: BlogContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('all');

  const searchedArticles = initialQuery
    ? searchArticles(articles, initialQuery)
    : articles;

  const filteredArticles =
    activeCategory === 'all'
      ? searchedArticles
      : searchedArticles.filter((article) => article.source === activeCategory);

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-bold text-foreground">Blog</h1>
          {initialQuery && (
            <p className="text-secondary mt-1">
              「{initialQuery}」の検索結果: {searchedArticles.length}件
            </p>
          )}
        </div>
        <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* ソースフィルター */}
      {!initialQuery && (
        <CategoryFilter
          categories={SOURCE_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {/* 記事一覧 */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 text-secondary">
          <p>
            {initialQuery
              ? '該当する記事が見つかりませんでした。'
              : '記事が見つかりませんでした。'}
          </p>
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
