'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { ScrollReveal } from '@/components/atoms/ScrollReveal/ScrollReveal';
import { ViewModeSwitcher } from '@/components/atoms/ViewModeSwitcher';
import { AccentCard } from '@/components/atoms/AccentCard';
import type { Article, ViewMode } from '@/types/article';

export interface FilteredArticleContentProps {
  type: 'category' | 'tag';
  name: string;
  articles: Article[];
}

export function FilteredArticleContent({ type, name, articles }: FilteredArticleContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const displayName = type === 'tag' ? `#${name}` : name;
  const label = type === 'tag' ? '// tag' : '// category';

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <AccentCard>
        <div className="pl-4 space-y-3">
          <Link
            href="/blog"
            className="mono inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted hover:text-cat-accent transition-colors no-underline"
          >
            <span aria-hidden="true">◂</span>
            cd /blog
          </Link>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-1">
                {label}
              </p>
              <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
              <p className="mono text-xs text-muted mt-1">
                <span className="text-cat-accent" aria-hidden="true">▶ </span>
                {articles.length} entries
              </p>
            </div>
            <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
        </div>
      </AccentCard>

      {/* 記事一覧 */}
      {articles.length === 0 ? (
        <div className="text-center py-12 mono text-sm text-syntax-comment">
          <p>{'// no articles found'}</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'flex flex-col gap-6'
          }
        >
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 60}>
              <ArticleCard article={article} viewMode={viewMode} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
