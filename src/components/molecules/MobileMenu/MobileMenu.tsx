'use client';

import { useEffect } from 'react';
import { NavLink } from '@/components/atoms/NavLink';
import type { NavigationItem } from '@/components/molecules/Navigation';

export interface MobileMenuProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;
  /**
   * Close handler
   */
  onClose: () => void;
  /**
   * Navigation items to display
   */
  navigationItems?: NavigationItem[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navigationItems = [],
  className = '',
}: MobileMenuProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[200] ${isOpen ? 'visible' : 'invisible'} ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 tt"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-bg-secondary border-l border-border tt ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 pt-20 px-6 pb-8">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={item.active}
              onClick={onClose}
              style={{ fontSize: '18px' }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
