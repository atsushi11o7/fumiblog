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

export const CustomLabel: Story = {
  args: {
    label: 'FRONTEND ENGINEER — TOKYO',
    subtitle: '目的を持ったインターフェースを構築しています。',
  },
};
