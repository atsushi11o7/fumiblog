import type { Metadata } from 'next';
import { AccentCard } from '@/components/atoms/AccentCard';
import { SiX } from 'react-icons/si';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'FumiBlog へのお問い合わせは X (Twitter) からどうぞ。',
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <AccentCard>
        <div className="pl-4">
          <h1 className="text-2xl font-bold text-foreground">Contact</h1>
          <p className="text-sm text-muted mt-1">お問い合わせは以下の SNS から</p>
        </div>
      </AccentCard>

      {/* SNSリンク */}
      <a
        href="https://x.com/atsushi11o7"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 tt hover:-translate-y-0.5 hover:shadow-md no-underline group"
      >
        <SiX size={28} className="text-secondary group-hover:text-foreground tt shrink-0" />
        <div>
          <p className="font-bold text-foreground text-sm">X (Twitter)</p>
          <p className="text-xs text-muted">@atsushi11o7</p>
        </div>
      </a>
    </div>
  );
}
