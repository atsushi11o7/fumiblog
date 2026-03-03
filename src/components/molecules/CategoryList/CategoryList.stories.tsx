import type { Meta, StoryObj } from '@storybook/react';
import { CategoryList } from './CategoryList';

const meta = {
  title: 'Molecules/CategoryList',
  component: CategoryList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories = [
  { name: 'Next.js', slug: 'nextjs', count: 18 },
  { name: 'React', slug: 'react', count: 15 },
  { name: 'TypeScript', slug: 'typescript', count: 12 },
  { name: 'Life', slug: 'life', count: 10 },
  { name: 'Tools', slug: 'tools', count: 6 },
];

export const Default: Story = {
  args: {
    categories: mockCategories,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleCategory: Story = {
  args: {
    categories: [mockCategories[0]],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ManyCategories: Story = {
  args: {
    categories: [
      ...mockCategories,
      { name: 'Docker', slug: 'docker', count: 4 },
      { name: 'Database', slug: 'database', count: 3 },
      { name: 'CSS', slug: 'css', count: 2 },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};
