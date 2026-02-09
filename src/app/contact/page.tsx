export default function ContactPage() {
  return (
    <div>
      <h1 className="text-[2rem] mb-6 font-bold text-foreground">Contact</h1>
      <div className="text-base leading-relaxed text-secondary">
        <p className="mb-4">お問い合わせは以下のSNSからお願いします。</p>
        <ul className="list-none p-0">
          <li className="mb-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline"
            >
              X (Twitter)
            </a>
          </li>
          <li className="mb-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
