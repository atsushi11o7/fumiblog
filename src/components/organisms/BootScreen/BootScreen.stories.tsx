import type { Meta, StoryObj } from '@storybook/react';
import { BootScreen } from './BootScreen';

const meta = {
  title: 'Organisms/BootScreen',
  component: BootScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BootScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
