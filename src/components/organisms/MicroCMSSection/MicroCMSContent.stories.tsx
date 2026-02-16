import type { Meta, StoryObj } from '@storybook/react';
import { MicroCMSContent } from './MicroCMSContent';
import type { Article, Category } from '@/types/article';

const meta = {
  title: 'Organisms/MicroCMSContent',
  component: MicroCMSContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MicroCMSContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories: Category[] = [
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Life', slug: 'life' },
];

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Next.js 15のApp Router完全ガイド',
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
  {
    id: '4',
    title: '在宅ワークのデスク環境2025',
    publishedAt: '2025-01-08T00:00:00Z',
    category: { name: 'Life', slug: 'life' },
    source: 'microcms',
    tags: [{ name: 'ガジェット', slug: 'gadget' }],
    href: '/blog/desk-setup-2025',
    thumbnail: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=250&fit=crop',
  },
  {
    id: '5',
    title: 'Next.jsでISRを活用する',
    publishedAt: '2025-01-05T00:00:00Z',
    category: { name: 'Next.js', slug: 'nextjs' },
    source: 'microcms',
    tags: [{ name: 'Next.js', slug: 'nextjs' }],
    href: '/blog/nextjs-isr',
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
    categories: mockCategories,
    maxArticles: 4,
    viewMoreHref: '/blog',
  },
};

export const WithoutCategories: Story = {
  args: {
    articles: mockArticles,
    categories: [],
    maxArticles: 4,
  },
};

export const FewArticles: Story = {
  args: {
    articles: mockArticles.slice(0, 2),
    categories: mockCategories,
    maxArticles: 4,
    viewMoreHref: '/blog',
  },
};

export const NoArticles: Story = {
  args: {
    articles: [],
    categories: mockCategories,
  },
};
