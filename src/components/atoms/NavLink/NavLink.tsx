import React from 'react';
import Link from 'next/link';

export interface NavLinkProps {
  /**
   * Link href
   */
  href: string;
  /**
   * Link text
   */
  children: React.ReactNode;
  /**
   * Active state
   */
  active?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

export function NavLink({
  href,
  children,
  active = false,
  className = '',
  onClick,
  style,
}: NavLinkProps) {
  const baseClasses = 'tt text-sm text-secondary no-underline transition-all duration-300 hover:text-foreground';
  const activeClasses = active ? 'text-foreground' : '';
  const classes = `${baseClasses} ${activeClasses} ${className}`.trim();

  return (
    <Link href={href} className={classes} onClick={onClick} style={style}>
      {children}
    </Link>
  );
}
