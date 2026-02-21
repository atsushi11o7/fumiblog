import type { Meta, StoryObj } from '@storybook/react';
import { SourceBadge } from './SourceBadge';

const meta = {
  title: 'Atoms/SourceBadge',
  component: SourceBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SourceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MicroCMS: Story = {
  args: {
    source: 'microcms',
    categoryName: 'Next.js',
  },
};

export const Qiita: Story = {
  args: {
    source: 'qiita',
  },
};

export const Zenn: Story = {
  args: {
    source: 'zenn',
  },
};

export const Note: Story = {
  args: {
    source: 'note',
  },
};

export const AllSources: Story = {
  args: { source: 'microcms' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <SourceBadge source="microcms" categoryName="Next.js" />
      <SourceBadge source="qiita" />
      <SourceBadge source="zenn" />
      <SourceBadge source="note" />
    </div>
  ),
};

const badgeStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 600,
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block',
  lineHeight: 1.4,
  color: '#fff',
};

const colors = [
  { name: 'Indigo', hex: '#818CF8' },
  { name: 'Slate', hex: '#94A3B8' },
  { name: 'Emerald', hex: '#34D399' },
  { name: 'Amber', hex: '#F59E0B' },
  { name: 'Rose', hex: '#FB7185' },
  { name: 'Violet', hex: '#A78BFA' },
  { name: 'Teal', hex: '#2DD4BF' },
  { name: 'Orange', hex: '#FB923C' },
];

export const DarkBadgeColorComparison: Story = {
  args: { source: 'microcms' },
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', background: '#2A2A2E', borderRadius: '12px' }}>
      <p style={{ fontSize: '12px', color: '#A0A0A8', marginBottom: '4px' }}>Dark mode badge color candidates</p>
      {colors.map(({ name, hex }) => (
        <div key={hex} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ ...badgeStyle, backgroundColor: hex }}>Next.js</span>
          <span style={{ ...badgeStyle, backgroundColor: hex }}>React</span>
          <SourceBadge source="qiita" />
          <SourceBadge source="zenn" />
          <span style={{ fontSize: '11px', color: '#A0A0A8' }}>{name} ({hex})</span>
        </div>
      ))}
    </div>
  ),
};
