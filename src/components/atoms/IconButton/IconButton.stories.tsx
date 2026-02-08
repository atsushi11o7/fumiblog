import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from './IconButton';
import { Icon } from '../Icon';
import { Moon, Sun, Menu, Search, X, Home, Settings, User } from 'lucide-react';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Icon icon={Moon} />,
    'aria-label': 'Toggle theme',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: <Icon icon={Search} />,
    'aria-label': 'Search',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: <Icon icon={Sun} />,
    'aria-label': 'Light mode',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: <Icon icon={Menu} />,
    'aria-label': 'Menu',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: <Icon icon={X} />,
    'aria-label': 'Close',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Icon icon={Moon} />,
    'aria-label': 'Toggle theme',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <IconButton size="small" aria-label="Search">
        <Icon icon={Search} />
      </IconButton>
      <IconButton size="medium" aria-label="Theme">
        <Icon icon={Moon} />
      </IconButton>
      <IconButton size="large" aria-label="Menu">
        <Icon icon={Menu} />
      </IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <IconButton aria-label="Home">
        <Icon icon={Home} />
      </IconButton>
      <IconButton variant="ghost" aria-label="Settings">
        <Icon icon={Settings} />
      </IconButton>
      <IconButton aria-label="User">
        <Icon icon={User} />
      </IconButton>
      <IconButton variant="ghost" aria-label="Close">
        <Icon icon={X} />
      </IconButton>
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    children: <Icon icon={Sun} />,
    'aria-label': 'Light mode',
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-background">
        <Story />
      </div>
    ),
  ],
};

export const DarkThemeVariants: Story = {
  render: () => (
    <div data-theme="dark" className="p-8 bg-background">
      <div className="flex gap-4 items-center">
        <IconButton aria-label="Light mode">
          <Icon icon={Sun} />
        </IconButton>
        <IconButton variant="ghost" aria-label="Menu">
          <Icon icon={Menu} />
        </IconButton>
        <IconButton size="small" aria-label="Search">
          <Icon icon={Search} />
        </IconButton>
        <IconButton size="large" aria-label="Settings">
          <Icon icon={Settings} />
        </IconButton>
      </div>
    </div>
  ),
};

export const ThemeToggleExample: Story = {
  render: () => {
    const [isDark, setIsDark] = React.useState(false);
    return (
      <div data-theme={isDark ? 'dark' : 'light'} className="p-8 bg-background">
        <IconButton
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle theme"
        >
          <Icon icon={isDark ? Sun : Moon} />
        </IconButton>
      </div>
    );
  },
};
