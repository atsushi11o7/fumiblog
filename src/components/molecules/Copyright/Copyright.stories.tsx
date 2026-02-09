import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Copyright } from './Copyright';

const meta = {
  title: 'Molecules/Copyright',
  component: Copyright,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Copyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomYear: Story = {
  args: {
    year: 2024,
  },
};
