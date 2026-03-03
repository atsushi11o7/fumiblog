import type { Meta, StoryObj } from '@storybook/react';
import { FeaturedCard } from './FeaturedCard';
import type { Article } from '@/types/article';

const meta = {
  title: 'Molecules/FeaturedCard',
  component: FeaturedCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArticle: Article = {
  id: 'featured-1',
  title: 'Next.js 15のServer Actionsを活用した実践的なフォーム処理',
  description:
    'Server Actionsの基本概念から、バリデーション、エラーハンドリング、楽観的更新まで、実践的なパターンを解説します。',
  publishedAt: '2025-01-20T00:00:00Z',
  category: { name: 'Tech', slug: 'tech' },
  source: 'microcms',
  tags: [
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'React', slug: 'react' },
    { name: 'TypeScript', slug: 'typescript' },
  ],
  href: '/blog/nextjs-server-actions',
  thumbnail: 'https://images.microcms-assets.io/assets/placeholder/featured.png',
};

export const WithThumbnail: Story = {
  args: {
    article: baseArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...baseArticle,
      thumbnail: undefined,
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    article: {
      ...baseArticle,
      description: undefined,
    },
  },
};

export const WithoutTags: Story = {
  args: {
    article: {
      ...baseArticle,
      tags: [],
    },
  },
};
