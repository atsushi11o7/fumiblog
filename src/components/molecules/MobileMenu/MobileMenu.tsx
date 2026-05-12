'use client';

import { useEffect } from 'react';
import { NavLink } from '@/components/atoms/NavLink';
import type { NavigationItem } from '@/components/molecules/Navigation';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems?: NavigationItem[];
  className?: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navigationItems = [],
  className = '',
}: MobileMenuProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
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
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-bg-secondary border-l border-border transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Header label */}
        <div className="px-6 pt-20 pb-4 border-b border-border">
          <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment">
            {'// menu'}
          </p>
        </div>

        {/* Corner brackets */}
        <span
          className="absolute top-3 right-3 mono text-sm text-muted opacity-50 pointer-events-none select-none"
          aria-hidden="true"
        >
          ─┐
        </span>
        <span
          className="absolute bottom-3 right-3 mono text-sm text-muted opacity-50 pointer-events-none select-none"
          aria-hidden="true"
        >
          ─┘
        </span>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-5 pt-6 px-6 pb-8">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={item.active}
              onClick={onClose}
              className="!text-base"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
