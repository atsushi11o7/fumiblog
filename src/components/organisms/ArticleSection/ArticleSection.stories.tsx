import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSection } from './ArticleSection';
import type { Article } from '@/types/article';

const meta = {
  title: 'Organisms/ArticleSection',
  component: ArticleSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ
const mockMicroCMSArticles: Article[] = [
  {
    id: '1',
    title: 'Next.js 15のApp Router完全ガイド',
    description: 'Next.js 15の新機能であるApp Routerについて詳しく解説します。',
    publishedAt: '2025-01-15T00:00:00Z',
    category: { name: 'Next.js', slug: 'nextjs' },
    source: 'microcms',
    tags: [
      { name: 'React', slug: 'react' },
      { name: 'SSR', slug: 'ssr' },
    ],
    href: '/blog/nextjs-15-app-router',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    title: 'TypeScriptのベストプラクティス2025',
    description: 'TypeScriptを使った開発のベストプラクティスを紹介します。',
    publishedAt: '2025-01-14T00:00:00Z',
    category: { name: 'TypeScript', slug: 'typescript' },
    source: 'microcms',
    tags: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'JavaScript', slug: 'javascript' },
    ],
    href: '/blog/typescript-best-practices',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    title: 'Reactのパフォーマンス最適化',
    description: 'Reactアプリケーションのパフォーマンスを最適化する方法。',
    publishedAt: '2025-01-10T00:00:00Z',
    category: { name: 'React', slug: 'react' },
    source: 'microcms',
    tags: [
      { name: 'React', slug: 'react' },
      { name: 'Performance', slug: 'performance' },
    ],
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
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    href: 'https://qiita.com/example/react-hooks',
  },
  {
    id: 'q2',
    title: 'TypeScript 5.0の新機能まとめ',
    description: 'TypeScript 5.0の新機能を詳しく解説。',
    publishedAt: '2025-01-08T00:00:00Z',
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    href: 'https://qiita.com/example/typescript-5',
  },
  {
    id: 'q3',
    title: 'Docker ComposeでNext.js開発環境',
    description: 'Docker Composeを使ったNext.js開発環境の構築方法。',
    publishedAt: '2025-01-05T00:00:00Z',
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    href: 'https://qiita.com/example/docker-nextjs',
  },
];

const mockZennArticles: Article[] = [
  {
    id: 'z1',
    title: 'Zennで学ぶモダンCSS',
    description: 'CSS Grid、Flexbox、カスタムプロパティの活用法。',
    publishedAt: '2025-01-11T00:00:00Z',
    category: { name: 'Zenn', slug: 'zenn' },
    source: 'zenn',
    href: 'https://zenn.dev/example/modern-css',
  },
  {
    id: 'z2',
    title: 'GraphQLとREST APIの比較',
    description: 'GraphQLとREST APIの違いと使い分け。',
    publishedAt: '2025-01-06T00:00:00Z',
    category: { name: 'Zenn', slug: 'zenn' },
    source: 'zenn',
    href: 'https://zenn.dev/example/graphql-vs-rest',
  },
  {
    id: 'z3',
    title: 'Prismaで始めるデータベース設計',
    description: 'PrismaとPostgreSQLを使った実践的なデータベース設計。',
    publishedAt: '2025-01-03T00:00:00Z',
    category: { name: 'Zenn', slug: 'zenn' },
    source: 'zenn',
    href: 'https://zenn.dev/example/prisma-db',
  },
];

// microCMS記事セクション（3カラム）
export const MicroCMSSection3Columns: Story = {
  args: {
    title: '📝 microCMS記事',
    articles: mockMicroCMSArticles,
    columns: 3,
    viewMoreHref: '/blog',
  },
};

// Qiita記事セクション（3カラム）
export const QiitaSection3Columns: Story = {
  args: {
    title: '📘 Qiita記事',
    articles: mockQiitaArticles,
    columns: 3,
    viewMoreHref: '/blog',
  },
};

// Zenn記事セクション（3カラム）
export const ZennSection3Columns: Story = {
  args: {
    title: '📙 Zenn記事',
    articles: mockZennArticles,
    columns: 3,
    viewMoreHref: '/blog',
  },
};

// 2カラムレイアウト
export const MicroCMSSection2Columns: Story = {
  args: {
    title: '📝 microCMS記事',
    articles: mockMicroCMSArticles,
    columns: 2,
    viewMoreHref: '/blog',
  },
};

// View Moreリンクなし
export const WithoutViewMore: Story = {
  args: {
    title: '📝 最新記事',
    articles: mockMicroCMSArticles,
    columns: 3,
  },
};

// 記事が少ない場合（1件）
export const SingleArticle: Story = {
  args: {
    title: '📝 最新記事',
    articles: [mockMicroCMSArticles[0]],
    columns: 3,
    viewMoreHref: '/blog',
  },
};

// 記事が2件の場合
export const TwoArticles: Story = {
  args: {
    title: '📝 最新記事',
    articles: mockMicroCMSArticles.slice(0, 2),
    columns: 3,
    viewMoreHref: '/blog',
  },
};

// 複数セクションを並べた例（トップページのイメージ）
export const MultipleSection: Story = {
  args: {
    title: '📝 microCMS記事',
    articles: mockMicroCMSArticles,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <ArticleSection
        title="📝 microCMS記事"
        articles={mockMicroCMSArticles}
        columns={3}
        viewMoreHref="/blog"
      />
      <ArticleSection
        title="📘 Qiita記事"
        articles={mockQiitaArticles}
        columns={3}
        viewMoreHref="/blog"
      />
      <ArticleSection
        title="📙 Zenn記事"
        articles={mockZennArticles}
        columns={3}
        viewMoreHref="/blog"
      />
    </div>
  ),
};

// レスポンシブ確認用（モバイル）
export const MobileView: Story = {
  args: {
    title: '📝 microCMS記事',
    articles: mockMicroCMSArticles,
    columns: 3,
    viewMoreHref: '/blog',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// レスポンシブ確認用（タブレット）
export const TabletView: Story = {
  args: {
    title: '📝 microCMS記事',
    articles: mockMicroCMSArticles,
    columns: 3,
    viewMoreHref: '/blog',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
