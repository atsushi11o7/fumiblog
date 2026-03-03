'use client';

import { useState } from 'react';
import { Logo } from '@/components/atoms/Logo';
import { Navigation } from '@/components/molecules/Navigation';
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher';
import { IconButton } from '@/components/atoms/IconButton';
import { AnimatedMenuIcon } from '@/components/atoms/AnimatedMenuIcon';
import { MobileMenu } from '@/components/molecules/MobileMenu';
import type { NavigationItem } from '@/components/molecules/Navigation';

export interface HeaderProps {
  /**
   * デスクトップナビゲーションバーの項目
   * 画面幅 >= 768px (md ブレークポイント) で表示
   * @default [{ href: '/blog', label: 'Blog' }, { href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }]
   */
  navigationItems?: NavigationItem[];
  /**
   * モバイルメニューのナビゲーション項目
   * 未指定の場合は navigationItems がデフォルトとして使用されます
   */
  mobileNavigationItems?: NavigationItem[];
  /**
   * ヘッダー要素に適用する追加のCSSクラス
   */
  className?: string;
}

export function Header({
  navigationItems = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  mobileNavigationItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  className = '',
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ハンドラー関数
  const handleMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  // z-index の階層構造: Header (300) > MobileMenu (200), Header content (350) > Header (300)
  const baseClasses = 'tt w-full bg-bg-secondary border-b border-border sticky top-0 z-[300]';
  const classes = `${baseClasses} ${className}`.trim();

  return (
    <header className={classes}>
      <div
        className="flex items-center relative z-[350] max-w-[1024px] mx-auto py-3 px-6 w-full"
      >
        <Logo />
        <div className="flex items-center gap-6 ml-auto">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex">
            <Navigation items={navigationItems} />
          </div>

          {/* Theme Switcher - Always visible */}
          <ThemeSwitcher />

          {/* Mobile Menu Button - Visible on mobile only */}
          <IconButton
            onClick={handleMenuToggle}
            variant="ghost"
            size="medium"
            className="flex md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatedMenuIcon isOpen={isMobileMenuOpen} />
          </IconButton>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        navigationItems={mobileNavigationItems}
      />
    </header>
  );
}
