import type { Meta, StoryObj } from '@storybook/react';
import { ExternalFeedContent } from './ExternalFeedContent';
import type { Article } from '@/types/article';

const meta = {
  title: 'Organisms/ExternalFeedContent',
  component: ExternalFeedContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExternalFeedContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockQiitaArticles: Article[] = [
  {
    id: 'q1',
    title: 'TypeScript 5.0の新機能まとめ',
    publishedAt: '2025-01-15T00:00:00Z',
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    tags: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'JavaScript', slug: 'javascript' },
    ],
    href: 'https://qiita.com/example/typescript-5',
  },
  {
    id: 'q2',
    title: 'React Server Componentsの実践ガイド',
    publishedAt: '2025-01-12T00:00:00Z',
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    tags: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextjs' },
    ],
    href: 'https://qiita.com/example/react-server-components',
  },
  {
    id: 'q3',
    title: 'Docker Composeで開発環境を構築する',
    publishedAt: '2025-01-10T00:00:00Z',
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    tags: [{ name: 'Docker', slug: 'docker' }],
    href: 'https://qiita.com/example/docker-compose',
  },
];

const mockZennArticles: Article[] = [
  {
    id: 'z1',
    title: 'Bunで始めるモダンJavaScript開発',
    publishedAt: '2025-01-14T00:00:00Z',
    category: { name: 'Zenn', slug: 'zenn' },
    source: 'zenn',
    tags: [
      { name: 'Bun', slug: 'bun' },
      { name: 'JavaScript', slug: 'javascript' },
    ],
    href: 'https://zenn.dev/example/bun-modern-js',
  },
  {
    id: 'z2',
    title: 'TailwindCSS v4の変更点を解説',
    publishedAt: '2025-01-11T00:00:00Z',
    category: { name: 'Zenn', slug: 'zenn' },
    source: 'zenn',
    tags: [{ name: 'CSS', slug: 'css' }],
    href: 'https://zenn.dev/example/tailwind-v4',
  },
];

export const Qiita: Story = {
  args: {
    articles: mockQiitaArticles,
    label: 'FROM QIITA',
    color: '#55C500',
    maxArticles: 4,
    viewMoreHref: '/blog',
  },
};

export const Zenn: Story = {
  args: {
    articles: mockZennArticles,
    label: 'FROM ZENN',
    color: '#3EA8FF',
    maxArticles: 4,
    viewMoreHref: '/blog',
  },
};

export const WithoutViewMore: Story = {
  args: {
    articles: mockQiitaArticles,
    label: 'FROM QIITA',
    color: '#55C500',
  },
};
