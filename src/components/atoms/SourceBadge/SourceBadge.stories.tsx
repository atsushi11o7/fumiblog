import type { Meta, StoryObj } from '@storybook/react';
import { SourceBadge } from './SourceBadge';

const meta = {
  title: 'Atoms/SourceBadge',
  component: SourceBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SourceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MicroCMS: Story = {
  args: {
    source: 'microcms',
    categoryName: 'Next.js',
  },
};

export const Qiita: Story = {
  args: {
    source: 'qiita',
  },
};

export const Zenn: Story = {
  args: {
    source: 'zenn',
  },
};

export const Note: Story = {
  args: {
    source: 'note',
  },
};

export const AllSources: Story = {
  args: { source: 'microcms' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <SourceBadge source="microcms" categoryName="Next.js" />
      <SourceBadge source="qiita" />
      <SourceBadge source="zenn" />
      <SourceBadge source="note" />
    </div>
  ),
};
