import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditorMinimap } from './CodeEditorMinimap';

const meta = {
  title: 'Atoms/CodeEditorMinimap',
  component: CodeEditorMinimap,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 80, height: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeEditorMinimap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
