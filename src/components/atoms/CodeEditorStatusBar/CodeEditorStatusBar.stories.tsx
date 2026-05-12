import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditorStatusBar } from './CodeEditorStatusBar';

const meta = {
  title: 'Atoms/CodeEditorStatusBar',
  component: CodeEditorStatusBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeEditorStatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    branch: 'develop',
    warnings: 0,
    errors: 0,
    line: 7,
    column: 12,
  },
};

export const WithIssues: Story = {
  args: {
    branch: 'feature/wip',
    warnings: 3,
    errors: 1,
    line: 42,
    column: 5,
  },
};
