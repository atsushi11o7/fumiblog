import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileIcon } from './ProfileIcon';
import { User, UserCircle, Settings, Star, Heart } from 'lucide-react';

const meta = {
  title: 'Atoms/ProfileIcon',
  component: ProfileIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof ProfileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'Profile Icon',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    alt: 'Small Icon',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    alt: 'Medium Icon',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    alt: 'Large Icon',
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: UserCircle,
    alt: 'User Circle Icon',
  },
};

export const WithImage: Story = {
  args: {
    src: '/icon.png',
    alt: 'Profile Image',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <ProfileIcon size="small" alt="Small" />
      <ProfileIcon size="medium" alt="Medium" />
      <ProfileIcon size="large" alt="Large" />
    </div>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <ProfileIcon icon={User} alt="User" />
      <ProfileIcon icon={UserCircle} alt="User Circle" />
      <ProfileIcon icon={Settings} alt="Settings" />
      <ProfileIcon icon={Star} alt="Star" />
      <ProfileIcon icon={Heart} alt="Heart" />
    </div>
  ),
};

export const ProfileCardExample: Story = {
  render: () => (
    <div className="max-w-sm p-5 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <ProfileIcon icon={User} alt="Fumi" />
        <div>
          <p className="font-semibold text-sm text-foreground">Fumi</p>
          <p className="mono text-[11px] text-muted">@fumi_dev</p>
        </div>
      </div>
      <p className="text-[13px] text-secondary leading-relaxed">
        Web Engineer. React / TypeScript / Next.js
      </p>
    </div>
  ),
};
