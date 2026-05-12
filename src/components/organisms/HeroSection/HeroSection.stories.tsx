import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomMeta: Story = {
  args: {
    author: 'Jane Doe (@jane)',
    role: 'FRONTEND ENGINEER',
    stack: 'TypeScript · React',
    loc: 'Tokyo, JP',
    subtitle: '目的を持ったインターフェースを構築しています。',
  },
};
