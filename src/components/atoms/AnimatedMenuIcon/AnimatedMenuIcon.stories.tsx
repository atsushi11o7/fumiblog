import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AnimatedMenuIcon } from './AnimatedMenuIcon';

const meta = {
  title: 'Atoms/AnimatedMenuIcon',
  component: AnimatedMenuIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AnimatedMenuIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

export const Opened: Story = {
  args: {
    isOpen: true,
  },
};

export const Interactive: Story = {
  args: {
    isOpen: false,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="tt"
        style={{
          padding: '16px',
          cursor: 'pointer',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: '8px',
        }}
      >
        <AnimatedMenuIcon isOpen={isOpen} />
      </button>
    );
  },
};
