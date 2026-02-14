import { ArticleSection } from '@/components/organisms/ArticleSection';
import type { Article } from '@/types/article';

// モックデータ（後でAPIから取得）
const mockMicroCMSArticles: Article[] = [
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
];

const mockQiitaArticles: Article[] = [
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
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* ヒーローセクション */}
      <div>
        <h1 className="text-[2rem] mb-4 font-bold text-foreground">Welcome to FumiBlog</h1>
        <p className="text-base leading-normal text-secondary">
          技術と日常の学びを記録しています
        </p>
      </div>

      {/* microCMS記事セクション */}
      <ArticleSection
        title="📝 microCMS記事"
        articles={mockMicroCMSArticles}
        columns={3}
        viewMoreHref="/blog"
      />

      {/* Qiita記事セクション */}
      <ArticleSection
        title="📘 Qiita記事"
        articles={mockQiitaArticles}
        columns={3}
        viewMoreHref="/blog"
      />
    </div>
  );
}
