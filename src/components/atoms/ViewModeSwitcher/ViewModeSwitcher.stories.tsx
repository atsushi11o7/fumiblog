import type { Meta, StoryObj } from '@storybook/react';
import { ViewModeSwitcher } from './ViewModeSwitcher';

const meta = {
  title: 'Atoms/ViewModeSwitcher',
  component: ViewModeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ViewModeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridActive: Story = {
  args: {
    viewMode: 'grid',
    onViewModeChange: () => {},
  },
};

export const ListActive: Story = {
  args: {
    viewMode: 'list',
    onViewModeChange: () => {},
  },
};
