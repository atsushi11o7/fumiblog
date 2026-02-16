import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';
import type { Article } from '@/types/article';

const meta = {
  title: 'Molecules/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ
const mockMicroCMSArticle: Article = {
  id: '1',
  title: 'Next.js 15のApp Router完全ガイド',
  description: 'Next.js 15の新機能であるApp Routerについて詳しく解説します。',
  publishedAt: '2025-01-15T00:00:00Z',
  category: { name: 'Next.js', slug: 'nextjs' },
  source: 'microcms',
  tags: [
    { name: 'React', slug: 'react' },
    { name: 'SSR', slug: 'ssr' },
    { name: 'TypeScript', slug: 'typescript' },
  ],
  href: '/blog/nextjs-15-app-router',
  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
};

const mockQiitaArticle: Article = {
  id: 'q1',
  title: 'Qiitaで学ぶReact Hooks完全ガイド',
  description: 'React Hooksの基本から応用まで詳しく解説します。',
  publishedAt: '2025-01-12T00:00:00Z',
  category: { name: 'Qiita', slug: 'qiita' },
  source: 'qiita',
  href: 'https://qiita.com/example/react-hooks',
};

const mockZennArticle: Article = {
  id: 'z1',
  title: 'Zennで学ぶモダンCSS設計',
  description: 'モダンCSSの機能を活用した実践的な設計方法を紹介します。',
  publishedAt: '2025-01-11T00:00:00Z',
  category: { name: 'Zenn', slug: 'zenn' },
  source: 'zenn',
  href: 'https://zenn.dev/example/modern-css',
};

const mockNoteArticle: Article = {
  id: 'n1',
  title: 'noteで綴る技術ブログの書き方',
  description: '技術記事を書く際のポイントについて解説します。',
  publishedAt: '2025-01-09T00:00:00Z',
  category: { name: 'Note', slug: 'note' },
  source: 'note',
  href: 'https://note.com/example/tech-writing',
};

// microCMS Articles
export const MicroCMSGridView: Story = {
  args: {
    article: mockMicroCMSArticle,
    viewMode: 'grid',
  },
};

export const MicroCMSListView: Story = {
  args: {
    article: mockMicroCMSArticle,
    viewMode: 'list',
  },
};

// Qiita Articles
export const QiitaGridView: Story = {
  args: {
    article: mockQiitaArticle,
    viewMode: 'grid',
  },
};

export const QiitaListView: Story = {
  args: {
    article: mockQiitaArticle,
    viewMode: 'list',
  },
};

// Zenn Articles
export const ZennGridView: Story = {
  args: {
    article: mockZennArticle,
    viewMode: 'grid',
  },
};

export const ZennListView: Story = {
  args: {
    article: mockZennArticle,
    viewMode: 'list',
  },
};

// note Articles
export const NoteGridView: Story = {
  args: {
    article: mockNoteArticle,
    viewMode: 'grid',
  },
};

export const NoteListView: Story = {
  args: {
    article: mockNoteArticle,
    viewMode: 'list',
  },
};

// 長いタイトル
export const LongTitleGrid: Story = {
  args: {
    article: {
      ...mockMicroCMSArticle,
      title: 'とても長いタイトルの記事です。この記事のタイトルは非常に長く、複数行にわたって表示される可能性があります。line-clampによって適切に省略されることを確認します。',
    },
    viewMode: 'grid',
  },
};

export const LongTitleList: Story = {
  args: {
    article: {
      ...mockMicroCMSArticle,
      title: 'とても長いタイトルの記事です。この記事のタイトルは非常に長く、複数行にわたって表示される可能性があります。line-clampによって適切に省略されることを確認します。',
    },
    viewMode: 'list',
  },
};

// すべてのソースを並べて表示
export const AllSourcesGrid: Story = {
  args: { article: mockMicroCMSArticle, viewMode: 'grid' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '1200px' }}>
      <ArticleCard article={mockMicroCMSArticle} viewMode="grid" />
      <ArticleCard article={mockQiitaArticle} viewMode="grid" />
      <ArticleCard article={mockZennArticle} viewMode="grid" />
      <ArticleCard article={mockNoteArticle} viewMode="grid" />
    </div>
  ),
};

export const AllSourcesList: Story = {
  args: { article: mockMicroCMSArticle, viewMode: 'list' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
      <ArticleCard article={mockMicroCMSArticle} viewMode="list" />
      <ArticleCard article={mockQiitaArticle} viewMode="list" />
      <ArticleCard article={mockZennArticle} viewMode="list" />
      <ArticleCard article={mockNoteArticle} viewMode="list" />
    </div>
  ),
};

// タグが多い記事（最大3個まで表示される）
export const ManyTagsGrid: Story = {
  args: {
    article: {
      ...mockMicroCMSArticle,
      tags: [
        { name: 'React', slug: 'react' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Next.js', slug: 'nextjs' },
        { name: 'Prisma', slug: 'prisma' },
        { name: 'Docker', slug: 'docker' },
        { name: 'Tailwind', slug: 'tailwind' },
      ],
    },
    viewMode: 'grid',
  },
};

export const ManyTagsList: Story = {
  args: {
    article: {
      ...mockMicroCMSArticle,
      tags: [
        { name: 'React', slug: 'react' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Next.js', slug: 'nextjs' },
        { name: 'Prisma', slug: 'prisma' },
        { name: 'Docker', slug: 'docker' },
        { name: 'Tailwind', slug: 'tailwind' },
      ],
    },
    viewMode: 'list',
  },
};
