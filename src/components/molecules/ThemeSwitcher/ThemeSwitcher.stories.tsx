import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'Molecules/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <ThemeSwitcher size="small" />
      <ThemeSwitcher size="medium" />
      <ThemeSwitcher size="large" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <ThemeSwitcher variant="default" />
      <ThemeSwitcher variant="ghost" />
    </div>
  ),
};

export const InHeader: Story = {
  render: () => (
    <div className="w-full bg-bg-secondary border-b border-border p-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-bold text-lg">FumiBlog</span>
        <ThemeSwitcher />
      </div>
    </div>
  ),
};
