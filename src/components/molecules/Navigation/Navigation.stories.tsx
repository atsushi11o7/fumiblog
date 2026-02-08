import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Navigation } from './Navigation';
import { NavLink } from '@/components/atoms/NavLink';

const meta = {
  title: 'Molecules/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const WithChildren: Story = {
  render: () => (
    <Navigation>
      <NavLink href="/blog" active>Blog</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </Navigation>
  ),
};

export const ManyItems: Story = {
  args: {
    items: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/projects', label: 'Projects' },
      { href: '/archive', label: 'Archive' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    items: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-background">
        <Story />
      </div>
    ),
  ],
};

export const InHeader: Story = {
  render: () => (
    <div className="w-full bg-bg-secondary border-b border-border p-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-bold text-lg">FumiBlog</span>
        <Navigation items={[
          { href: '/blog', label: 'Blog', active: true },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ]} />
      </div>
    </div>
  ),
};

export const InHeaderDark: Story = {
  render: () => (
    <div data-theme="dark" className="w-full bg-bg-secondary border-b border-border p-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-bold text-lg text-foreground">FumiBlog</span>
        <Navigation items={[
          { href: '/blog', label: 'Blog', active: true },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ]} />
      </div>
    </div>
  ),
};
