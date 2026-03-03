import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';

const meta = {
  title: 'Molecules/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Atsushi',
    handle: '@atsushi11o7',
    bio: 'Web Engineer. React / TypeScript / Next.js',
    avatarSrc: '/icon.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/atsushi11o7', icon: 'github' },
      { label: 'X', href: 'https://x.com/atsushi11o7', icon: 'twitter' },
    ],
  },
};

export const WithoutHandle: Story = {
  args: {
    name: 'Atsushi',
    bio: 'Web Engineer. React / TypeScript / Next.js',
    avatarSrc: '/icon.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/atsushi11o7', icon: 'github' },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    name: 'Atsushi',
    handle: '@atsushi11o7',
    bio: 'Web Engineer. React / TypeScript / Next.js',
    avatarSrc: '/icon.png',
  },
};
