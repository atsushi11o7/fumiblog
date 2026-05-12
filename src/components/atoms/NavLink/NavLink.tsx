import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export function NavLink({
  href,
  children,
  active = false,
  className = '',
  onClick,
  style,
}: NavLinkProps) {
  const base = 'mono text-xs uppercase tracking-widest no-underline transition-colors duration-200';
  const state = active
    ? 'text-cat-accent font-semibold'
    : 'text-secondary hover:text-foreground';
  const classes = `${base} ${state} ${className}`.trim();

  return (
    <Link href={href} className={classes} onClick={onClick} style={style}>
      {active && <span aria-hidden="true">[ </span>}
      {children}
      {active && <span aria-hidden="true"> ]</span>}
    </Link>
  );
}
