'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        <div className="pl-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-1">
              {initialQuery ? '// search results' : '// blog'}
            </p>
            <h1 className="text-2xl font-bold text-foreground">
              {initialQuery ? `「${initialQuery}」` : 'Blog'}
            </h1>
            <p className="mono text-xs text-muted mt-1">
              <span className="text-cat-accent" aria-hidden="true">▶ </span>
              {initialQuery
                ? `${searchedArticles.length} matches`
                : `${filteredArticles.length} entries`}
            </p>
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
        <div className="text-center py-12 mono text-sm text-syntax-comment">
          <p>{'// no articles found'}</p>
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
                className="mono flex items-center justify-center w-9 h-9 rounded-md border border-border text-muted hover:border-cat-accent hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="前のページ"
              >
                <ChevronLeft size={14} />
              </button>

              {getPageNumbers(safePage, totalPages).map((p, i) =>
                p === '...' ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="w-9 h-9 flex items-center justify-center text-muted mono text-sm"
                  >
                    ···
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`mono w-9 h-9 rounded-md text-sm transition-colors ${
                      p === safePage
                        ? 'bg-cat-accent text-white border border-cat-accent font-semibold'
                        : 'border border-border text-foreground hover:border-cat-accent'
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
                className="mono flex items-center justify-center w-9 h-9 rounded-md border border-border text-muted hover:border-cat-accent hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="次のページ"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
