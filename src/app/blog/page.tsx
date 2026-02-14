'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { ViewModeSwitcher } from '@/components/atoms/ViewModeSwitcher';
import type { Category, Article, ViewMode } from '@/types/article';

// モックデータ（後でAPIから取得）
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Next.js 15のApp Router完全ガイド',
    description: 'Next.js 15の新機能であるApp Routerについて詳しく解説します。',
    publishedAt: '2025-01-15T00:00:00Z',
    category: ['Next.js'],
    source: 'microcms',
    tags: ['React', 'SSR'],
    href: '/blog/nextjs-15-app-router',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    title: 'TypeScriptのベストプラクティス2025',
    description: 'TypeScriptを使った開発のベストプラクティスを紹介します。',
    publishedAt: '2025-01-14T00:00:00Z',
    category: ['TypeScript'],
    source: 'microcms',
    tags: ['TypeScript', 'JavaScript'],
    href: '/blog/typescript-best-practices',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    title: 'Reactのパフォーマンス最適化',
    description: 'Reactアプリケーションのパフォーマンスを最適化する方法。',
    publishedAt: '2025-01-10T00:00:00Z',
    category: ['React'],
    source: 'microcms',
    tags: ['React', 'Performance'],
    href: '/blog/react-performance',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
  },
  {
    id: 'q1',
    title: 'Qiitaで学ぶReact Hooks',
    description: 'React Hooksの基本から応用まで。',
    publishedAt: '2025-01-12T00:00:00Z',
    category: ['React'],
    source: 'qiita',
    href: 'https://qiita.com/example/react-hooks',
  },
  {
    id: 'q2',
    title: 'TypeScript 5.0の新機能まとめ',
    description: 'TypeScript 5.0の新機能を詳しく解説。',
    publishedAt: '2025-01-08T00:00:00Z',
    category: ['TypeScript'],
    source: 'qiita',
    href: 'https://qiita.com/example/typescript-5',
  },
  {
    id: 'q3',
    title: 'Docker ComposeでNext.js開発環境',
    description: 'Docker Composeを使ったNext.js開発環境の構築方法。',
    publishedAt: '2025-01-05T00:00:00Z',
    category: ['Docker'],
    source: 'qiita',
    href: 'https://qiita.com/example/docker-nextjs',
  },
  {
    id: 'z1',
    title: 'Zennで学ぶモダンCSS',
    description: 'CSS Grid、Flexbox、カスタムプロパティの活用法。',
    publishedAt: '2025-01-11T00:00:00Z',
    category: ['CSS'],
    source: 'zenn',
    href: 'https://zenn.dev/example/modern-css',
  },
  {
    id: 'z2',
    title: 'GraphQLとREST APIの比較',
    description: 'GraphQLとREST APIの違いと使い分け。',
    publishedAt: '2025-01-06T00:00:00Z',
    category: ['API'],
    source: 'zenn',
    href: 'https://zenn.dev/example/graphql-vs-rest',
  },
];

export default function BlogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories: Category[] = [
    { name: 'FumiBlog', slug: 'microcms' },
    { name: 'Qiita', slug: 'qiita' },
    { name: 'Zenn', slug: 'zenn' },
  ];

  // フィルタリングされた記事
  const filteredArticles =
    activeCategory === 'all'
      ? mockArticles
      : mockArticles.filter((article) => article.source === activeCategory);

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[2rem] font-bold text-foreground">Blog</h1>
        <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* カテゴリーフィルター */}
      <CategoryFilter
        categories={categories}
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
