'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { ScrollReveal } from '@/components/atoms/ScrollReveal/ScrollReveal';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { ViewModeSwitcher } from '@/components/atoms/ViewModeSwitcher';
import { AccentCard } from '@/components/atoms/AccentCard';
import { LAYOUT } from '@/constants/layout';
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

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [];
  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);

  pages.push(1);
  if (rangeStart > 2) pages.push('...');
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

export interface BlogContentProps {
  articles: Article[];
  initialQuery?: string;
  initialPage?: number;
}

export function BlogContent({ articles, initialQuery = '', initialPage = 1 }: BlogContentProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(initialPage);

  const searchedArticles = initialQuery
    ? searchArticles(articles, initialQuery)
    : articles;

  const filteredArticles =
    activeCategory === 'all'
      ? searchedArticles
      : searchedArticles.filter((article) => article.source === activeCategory);

  const totalPages = Math.ceil(filteredArticles.length / LAYOUT.ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const paginatedArticles = filteredArticles.slice(
    (safePage - 1) * LAYOUT.ITEMS_PER_PAGE,
    safePage * LAYOUT.ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
    const params = new URLSearchParams();
    if (initialQuery) params.set('q', initialQuery);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    router.push(`/blog${qs ? `?${qs}` : ''}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <AccentCard>
        <div className="pl-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BookOpen size={22} style={{ color: 'var(--text)' }} />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {initialQuery ? `「${initialQuery}」の検索結果` : 'Blog'}
              </h1>
              <p className="text-sm text-muted mt-0.5">
                {initialQuery
                  ? `${searchedArticles.length} 件`
                  : `全 ${filteredArticles.length} 件`}
              </p>
            </div>
          </div>
          <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </AccentCard>

      {/* ソースフィルター */}
      {!initialQuery && (
        <CategoryFilter
          categories={SOURCE_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
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
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                : 'flex flex-col gap-6'
            }
          >
            {paginatedArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 60}>
                <ArticleCard article={article} viewMode={viewMode} />
              </ScrollReveal>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-4">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage <= 1}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted hover:bg-tag-bg hover:text-foreground tt disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="前のページ"
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers(safePage, totalPages).map((p, i) =>
                p === '...' ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="w-9 h-9 flex items-center justify-center text-muted text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium tt ${
                      p === safePage
                        ? 'bg-[var(--cat-accent)] text-white border border-transparent'
                        : 'border border-border text-foreground hover:bg-tag-bg'
                    }`}
                    aria-current={p === safePage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted hover:bg-tag-bg hover:text-foreground tt disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="次のページ"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
