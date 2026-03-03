import type { Meta, StoryObj } from '@storybook/react';
import { AccentCard } from './AccentCard';

const meta = {
  title: 'Atoms/AccentCard',
  component: AccentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="pl-4">
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem' }}>カードタイトル</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
          左アクセントライン付きカードのデフォルト表示
        </p>
      </div>
    ),
  },
};

export const BlogHeader: Story = {
  args: {
    children: (
      <div className="pl-4 flex items-center justify-between">
        <div>
          <h1 style={{ fontWeight: 700, fontSize: '1.5rem' }}>Blog</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            全 42 件
          </p>
        </div>
      </div>
    ),
  },
};

export const ArticleHeader: Story = {
  args: {
    children: (
      <div className="pl-4" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1 style={{ fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
          Next.js App Router で microCMS を使う方法
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          2024.03.15
        </p>
      </div>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'max-w-sm',
    children: (
      <div className="pl-4">
        <p>className で幅を制限した例</p>
      </div>
    ),
  },
};
