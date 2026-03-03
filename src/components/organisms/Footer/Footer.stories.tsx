import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSiteName: Story = {
  args: {
    siteName: 'My Tech Blog',
  },
};

export const CustomYear: Story = {
  args: {
    year: 2024,
  },
};

export const CustomSocialLinks: Story = {
  args: {
    socialLinks: [
      {
        platform: 'x',
        href: 'https://x.com/example',
        ariaLabel: 'Follow on X',
      },
      {
        platform: 'github',
        href: 'https://github.com/example',
        ariaLabel: 'View on GitHub',
      },
    ],
  },
};

export const FullCustom: Story = {
  args: {
    siteName: 'Custom Blog',
    year: 2023,
    socialLinks: [
      {
        platform: 'x',
        href: 'https://x.com/custom',
        ariaLabel: 'X',
      },
      {
        platform: 'instagram',
        href: 'https://instagram.com/custom',
        ariaLabel: 'Instagram',
      },
    ],
  },
};
