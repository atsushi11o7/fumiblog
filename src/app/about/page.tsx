import type { Metadata } from 'next';
import Image from 'next/image';
import { AccentCard } from '@/components/atoms/AccentCard';

export const metadata: Metadata = {
  title: 'About',
  description: 'FumiBlog と書いている人について。',
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <AccentCard>
        <div className="pl-4">
          <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-1">
            {'// about'}
          </p>
          <h1 className="text-2xl font-bold text-foreground">About</h1>
          <p className="mono text-xs text-muted mt-1">
            <span className="text-cat-accent" aria-hidden="true">▶ </span>
            このブログと書いている人について
          </p>
        </div>
      </AccentCard>

      {/* 自己紹介 */}
      <section className="bg-card border border-border rounded-md p-6 flex flex-col sm:flex-row gap-6 items-start">
        <Image
          src="/icon.png"
          alt="Atsushi"
          width={80}
          height={80}
          className="rounded-md border border-border object-cover shrink-0"
        />
        <div>
          <h2 className="text-xl font-bold text-foreground mb-0.5">Atsushi</h2>
          <p className="mono text-xs text-muted mb-4">@atsushi11o7</p>
          <p className="text-base text-secondary leading-relaxed">
            機械学習関連の開発を仕事にしながら、趣味でアプリ制作について勉強しています。
            日々の学びを言語化・整理することで理解を深めることを目的に、このブログを書いています。
          </p>
        </div>
      </section>

      {/* このブログについて */}
      <section className="bg-card border border-border rounded-md p-6 space-y-3">
        <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment">
          {'// about this blog'}
        </p>
        <h2 className="text-lg font-bold text-foreground">このブログについて</h2>
        <p className="text-base text-secondary leading-relaxed">
          FumiBlog は、技術と日常で学んだことを記録・共有するためのブログです。
          学んだことをアウトプットする場として、気づきや実装メモを気軽に残しています。
        </p>
        <p className="text-base text-secondary leading-relaxed">
          ブログ名は AtsushiBlog だと語呂が悪いため、名前から一文字取って Fumi（史）Blog としています。
        </p>
        <p className="text-base text-secondary leading-relaxed">
          このブログは Next.js で作成し、Vercel でホスティング、コンテンツは microCMS で管理しています。
          Qiita や Zenn への投稿も一緒に閲覧できるようになっています。
        </p>
      </section>
    </div>
  );
}
