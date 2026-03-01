/**
 * 左アクセントライン付きカード
 * ページヘッダーなど、左端に縦線のアクセントを持つカードの共通コンポーネント
 */
export function AccentCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-border bg-card p-6 overflow-hidden ${className}`.trim()}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: 'var(--text)' }}
      />
      {children}
    </div>
  );
}
