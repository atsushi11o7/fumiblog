import type { Meta, StoryObj } from '@storybook/react';
import { CategoryFilter } from './CategoryFilter';

const meta = {
  title: 'Molecules/CategoryFilter',
  component: CategoryFilter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories = [
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Life', slug: 'life' },
  { name: 'Tools', slug: 'tools' },
];

export const Default: Story = {
  args: {
    categories: mockCategories,
    activeCategory: 'all',
  },
};

export const WithActiveCategory: Story = {
  args: {
    categories: mockCategories,
    activeCategory: 'react',
  },
};

export const ManyCategories: Story = {
  args: {
    categories: [
      ...mockCategories,
      { name: 'Docker', slug: 'docker' },
      { name: 'Database', slug: 'database' },
      { name: 'CSS', slug: 'css' },
    ],
    activeCategory: 'all',
  },
};
