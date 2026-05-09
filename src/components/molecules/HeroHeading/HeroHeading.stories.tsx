import type { Meta, StoryObj } from '@storybook/react';
import { HeroHeading } from './HeroHeading';

const meta = {
  title: 'Molecules/HeroHeading',
  component: HeroHeading,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <h1 className="mono text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
        <Story />
      </h1>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HeroHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

const FULL_TEXT = 'A space to share daily learnings';

export const FullyTyped: Story = {
  args: {
    text: FULL_TEXT,
    accent: 'learnings',
    displayLen: FULL_TEXT.length,
  },
};

export const PartiallyTyped: Story = {
  args: {
    text: FULL_TEXT,
    accent: 'learnings',
    displayLen: 18,
  },
};

export const AtAccent: Story = {
  args: {
    text: FULL_TEXT,
    accent: 'learnings',
    displayLen: 26,
  },
};

export const NoAccentMatch: Story = {
  args: {
    text: FULL_TEXT,
    accent: 'nonexistent',
    displayLen: FULL_TEXT.length,
  },
};
