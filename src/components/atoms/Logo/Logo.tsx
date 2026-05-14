import Link from 'next/link';

export interface LogoProps {
  href?: string;
  text?: string;
  className?: string;
}

export function Logo({
  href = '/',
  text = 'fumiblog',
  className = '',
}: LogoProps) {
  return (
    <Link
      href={href}
      className={`mono inline-flex items-center gap-1.5 text-foreground font-bold text-base no-underline hover:opacity-80 transition-opacity ${className}`.trim()}
    >
      <span className="text-cat-accent" aria-hidden="true">▶</span>
      <span>{text}</span>
    </Link>
  );
}
