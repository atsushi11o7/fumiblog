import type { Meta, StoryObj } from '@storybook/react';
import { TagBadge } from './TagBadge';

const meta = {
  title: 'Atoms/TagBadge',
  component: TagBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'React',
  },
};

export const Small: Story = {
  args: {
    label: 'TypeScript',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Next.js',
    size: 'medium',
  },
};

export const AsLink: Story = {
  args: {
    label: 'React',
    href: '/tags/react',
    size: 'medium',
  },
};

export const ArticleCardTags: Story = {
  args: { label: 'React' },
  render: () => (
    <div style={{ display: 'flex', gap: '4px' }}>
      <TagBadge label="React" size="small" />
      <TagBadge label="TypeScript" size="small" />
      <TagBadge label="Server Components" size="small" />
    </div>
  ),
};

export const SidebarTags: Story = {
  args: { label: 'React' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '300px' }}>
      <TagBadge label="React" href="/tags/react" size="medium" />
      <TagBadge label="TypeScript" href="/tags/typescript" size="medium" />
      <TagBadge label="Next.js" href="/tags/nextjs" size="medium" />
      <TagBadge label="Prisma" href="/tags/prisma" size="medium" />
      <TagBadge label="Tailwind" href="/tags/tailwind" size="medium" />
      <TagBadge label="Docker" href="/tags/docker" size="medium" />
      <TagBadge label="Node.js" href="/tags/nodejs" size="medium" />
      <TagBadge label="CSS" href="/tags/css" size="medium" />
    </div>
  ),
};
