import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditorBreadcrumb } from './CodeEditorBreadcrumb';

const meta = {
  title: 'Atoms/CodeEditorBreadcrumb',
  component: CodeEditorBreadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeEditorBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    segments: ['src', 'components', 'organisms', 'HeroSection', 'hero.tsx'],
  },
};

export const Short: Story = {
  args: {
    segments: ['src', 'about.md'],
  },
};
