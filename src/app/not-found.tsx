import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - ページが見つかりません',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <p className="mono text-7xl md:text-8xl font-bold text-cat-accent opacity-60 select-none tracking-tight">
        404
      </p>
      <div className="space-y-2">
        <p className="mono text-xs uppercase tracking-widest text-syntax-comment">
          {'// error: not found'}
        </p>
        <h1 className="text-xl font-bold text-foreground">
          ページが見つかりません
        </h1>
        <p className="text-sm text-muted max-w-md">
          お探しのページは移動・削除されたか、URL が間違っている可能性があります。
        </p>
      </div>
      <Link
        href="/"
        className="mono inline-flex items-center gap-1.5 border border-border rounded-md px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-cat-accent hover:text-cat-accent transition-colors no-underline"
      >
        <span aria-hidden="true">◂</span>
        cd /
      </Link>
    </div>
  );
}
