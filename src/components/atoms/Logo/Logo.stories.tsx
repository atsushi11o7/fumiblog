import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DarkTheme: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-background">
        <Story />
      </div>
    ),
  ],
};

export const InHeader: Story = {
  args: {},
  render: () => (
    <header className="w-full bg-bg-secondary border-b border-border p-4">
      <div className="max-w-6xl mx-auto">
        <Logo />
      </div>
    </header>
  ),
};

export const InHeaderDark: Story = {
  args: {},
  render: () => (
    <div data-theme="dark">
      <header className="w-full bg-bg-secondary border-b border-border p-4">
        <div className="max-w-6xl mx-auto">
          <Logo />
        </div>
      </header>
    </div>
  ),
};
