import type { Meta, StoryObj } from '@storybook/react';
import { SidebarTagList } from './SidebarTagList';

const meta = {
  title: 'Molecules/SidebarTagList',
  component: SidebarTagList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarTagList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTags = [
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'Prisma', slug: 'prisma' },
  { name: 'Tailwind', slug: 'tailwind' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Node.js', slug: 'nodejs' },
  { name: 'CSS', slug: 'css' },
];

export const Default: Story = {
  args: {
    tags: mockTags,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FewTags: Story = {
  args: {
    tags: mockTags.slice(0, 3),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};
