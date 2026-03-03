import React from 'react';
import { NavLink } from '@/components/atoms/NavLink';

export interface NavigationItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface NavigationProps {
  /**
   * Navigation items (alternative to children)
   */
  items?: NavigationItem[];
  /**
   * NavLink children (alternative to items)
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Navigation({
  items,
  children,
  className = '',
}: NavigationProps) {
  const baseClasses = 'flex gap-6';
  const classes = `${baseClasses} ${className}`.trim();

  return (
    <nav className={classes}>
      {items
        ? items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={item.active}
            >
              {item.label}
            </NavLink>
          ))
        : children}
    </nav>
  );
}
