import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavLink } from './NavLink';

const meta = {
  title: 'Atoms/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Blog',
  },
};

export const Active: Story = {
  args: {
    href: '#',
    children: 'Blog',
    active: true,
  },
};
