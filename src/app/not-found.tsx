import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - ページが見つかりません',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <p className="text-8xl font-bold text-foreground opacity-10 select-none">404</p>
      <div className="-mt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          ページが見つかりません
        </h1>
        <p className="text-sm text-muted">
          お探しのページは移動・削除されたか、URL が間違っている可能性があります。
        </p>
      </div>
      <Link
        href="/"
        className="tt inline-flex items-center gap-2 border border-border rounded-lg px-5 py-2.5 text-sm font-medium text-foreground hover:bg-tag-bg no-underline"
      >
        トップに戻る
      </Link>
    </div>
  );
}
