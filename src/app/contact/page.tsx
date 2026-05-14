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
          <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-1">
            {'// contact'}
          </p>
          <h1 className="text-2xl font-bold text-foreground">Contact</h1>
          <p className="mono text-xs text-muted mt-1">
            <span className="text-cat-accent" aria-hidden="true">▶ </span>
            お問い合わせは以下の SNS から
          </p>
        </div>
      </AccentCard>

      {/* SNSリンク */}
      <a
        href="https://x.com/atsushi11o7"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-card border border-border rounded-md p-5 flex items-center gap-4 hover:border-cat-accent transition-colors no-underline group"
      >
        <SiX size={24} className="text-secondary group-hover:text-cat-accent transition-colors shrink-0" />
        <div>
          <p className="font-bold text-foreground text-sm">X (Twitter)</p>
          <p className="mono text-xs text-muted">@atsushi11o7</p>
        </div>
      </a>
    </div>
  );
}
