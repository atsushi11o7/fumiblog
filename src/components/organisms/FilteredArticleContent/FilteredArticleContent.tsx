'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Folder, Tag } from 'lucide-react';
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

  const Icon = type === 'category' ? Folder : Tag;
  const displayName = type === 'tag' ? `#${name}` : name;

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <AccentCard>
        <div className="pl-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground tt no-underline mb-4"
          >
            <ChevronLeft size={14} />
            ブログ一覧
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Icon size={22} style={{ color: 'var(--text)' }} />
              <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
            </div>
            <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
          <p className="text-sm text-muted mt-2">{articles.length} 件の記事</p>
        </div>
      </AccentCard>

      {/* 記事一覧 */}
      {articles.length === 0 ? (
        <p className="text-center py-12 text-secondary">記事が見つかりませんでした。</p>
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
