export default function AboutPage() {
  return (
    <div>
      <h1 className="text-[2rem] mb-6 font-bold text-foreground">About</h1>
      <div className="text-base leading-relaxed text-secondary">
        <p className="mb-4">FumiBlogへようこそ。</p>
        <p className="mb-4">技術や日常で学んだことを記録しています。</p>
        <p>このブログは Next.js と microCMS を使用して構築されています。</p>
      </div>
    </div>
  );
}
