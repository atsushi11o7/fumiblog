import React from 'react';
import Link from 'next/link';

export interface LogoProps {
  /**
   * Link href
   */
  href?: string;
  /**
   * Logo text
   */
  text?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Logo({
  href = '/',
  text = 'FumiBlog',
  className = '',
}: LogoProps) {
  return (
    <Link
      href={href}
      className={`tt text-foreground font-extrabold text-[18px] hover:opacity-80 no-underline ${className}`.trim()}
      style={{ letterSpacing: '-0.02em' }}
    >
      {text}
    </Link>
  );
}
