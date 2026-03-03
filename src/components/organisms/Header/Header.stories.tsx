import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithActiveLink: Story = {
  args: {
    navigationItems: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const CustomNavigation: Story = {
  args: {
    navigationItems: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog', active: true },
      { href: '/projects', label: 'Projects' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const WithContent: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="tt min-h-screen bg-background">
        <Story />
        <div style={{ padding: '32px' }}>
          <h1 className="tt" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Content below header</h1>
          <p className="tt text-secondary">
            This demonstrates the sticky header behavior. The header stays at the top when scrolling.
          </p>
        </div>
      </div>
    ),
  ],
};


export const WithScrollContent: Story = {
  args: {
    navigationItems: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  render: (args) => (
    <div className="tt min-h-[200vh] bg-background">
      <Header {...args} />
      <div className="max-w-[1140px] mx-auto" style={{ padding: '32px' }}>
        <h1 className="tt" style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Scroll to see sticky header</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="tt text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const WithMobileNavigation: Story = {
  args: {
    navigationItems: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    mobileNavigationItems: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const InFullLayout: Story = {
  render: () => (
    <div className="tt min-h-screen bg-background">
      <Header
        navigationItems={[
          { href: '/blog', label: 'Blog', active: true },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ]}
        mobileNavigationItems={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog', active: true },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ]}
      />
      <main className="max-w-[1140px] mx-auto" style={{ padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p className="tt mono text-muted" style={{ fontSize: '12px', marginBottom: '8px', letterSpacing: '0.05em' }}>WEB ENGINEER — TOKYO</p>
          <h1 className="tt" style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.2', marginBottom: '12px', letterSpacing: '-0.03em' }}>
            A space to share daily learnings
          </h1>
          <p className="tt text-secondary" style={{ fontSize: '15px', lineHeight: '1.7' }}>技術と日常の学びを記録しています。</p>
        </div>
        <div className="tt bg-bg-secondary border border-border" style={{ borderRadius: '12px', padding: '24px' }}>
          <h2 className="tt" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Blog Post</h2>
          <p className="tt text-secondary">
            This is a sample layout showing how the Header organism integrates with page content. On mobile, open the menu to see "Home" link added.
          </p>
        </div>
      </main>
    </div>
  ),
};
