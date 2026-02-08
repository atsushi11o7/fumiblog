import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MobileMenu } from './MobileMenu';

const meta = {
  title: 'Molecules/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Menu closed'),
    navigationItems: [
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const Opened: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
    navigationItems: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const WithManyItems: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
    navigationItems: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog', active: true },
      { href: '/projects', label: 'Projects' },
      { href: '/archive', label: 'Archive' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const LightTheme: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
    navigationItems: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
    navigationItems: [
      { href: '/blog', label: 'Blog', active: true },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};
