import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './Icon';
import { Search, Moon, Sun, Menu, X, ChevronRight, Home, User, Settings, Heart, MessageCircle } from 'lucide-react';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
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
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search_Icon: Story = {
  args: {
    icon: Search,
    'aria-label': 'Search',
  },
};

export const Moon_Icon: Story = {
  args: {
    icon: Moon,
    'aria-label': 'Dark mode',
  },
};

export const Sun_Icon: Story = {
  args: {
    icon: Sun,
    'aria-label': 'Light mode',
  },
};

export const Small: Story = {
  args: {
    icon: Search,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    icon: Search,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    icon: Search,
    size: 'large',
  },
};

export const WithColor: Story = {
  args: {
    icon: Heart,
    color: '#EF4444',
    size: 'large',
  },
};

export const CommonIcons: Story = {
  args: {
    icon: Search,
  },
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Icon icon={Search} aria-label="Search" />
      <Icon icon={Moon} aria-label="Moon" />
      <Icon icon={Sun} aria-label="Sun" />
      <Icon icon={Menu} aria-label="Menu" />
      <Icon icon={X} aria-label="Close" />
      <Icon icon={ChevronRight} aria-label="Next" />
      <Icon icon={Home} aria-label="Home" />
      <Icon icon={User} aria-label="User" />
      <Icon icon={Settings} aria-label="Settings" />
      <Icon icon={Heart} aria-label="Like" />
      <Icon icon={MessageCircle} aria-label="Comment" />
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    icon: Search,
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  args: {
    icon: Search,
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon icon={Search} size="small" aria-label="Small" />
      <Icon icon={Search} size="medium" aria-label="Medium" />
      <Icon icon={Search} size="large" aria-label="Large" />
    </div>
  ),
};
