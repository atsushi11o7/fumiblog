import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditorTabBar } from './CodeEditorTabBar';

const meta = {
  title: 'Atoms/CodeEditorTabBar',
  component: CodeEditorTabBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeEditorTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { name: 'hero.tsx', active: true },
      { name: 'about.md' },
      { name: 'README.md' },
    ],
  },
};

export const SingleTab: Story = {
  args: {
    tabs: [{ name: 'hero.tsx', active: true }],
    showAddButton: false,
  },
};
