import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SocialLinks } from './SocialLinks';

const meta = {
  title: 'Molecules/SocialLinks',
  component: SocialLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomLinks: Story = {
  args: {
    links: [
      { platform: 'x', href: 'https://x.com/example', ariaLabel: 'Follow on X' },
      { platform: 'github', href: 'https://github.com/example', ariaLabel: 'View on GitHub' },
    ],
  },
};
