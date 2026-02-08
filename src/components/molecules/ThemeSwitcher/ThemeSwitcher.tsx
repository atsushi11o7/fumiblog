'use client';

import React from 'react';
import { IconButton } from '@/components/atoms/IconButton';
import { Icon } from '@/components/atoms/Icon';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export interface ThemeSwitcherProps {
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button variant
   */
  variant?: 'default' | 'ghost';
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function ThemeSwitcher({
  size = 'medium',
  variant = 'default',
  className = '',
}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <IconButton
      onClick={toggleTheme}
      size={size}
      variant={variant}
      className={className}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon icon={isDark ? Sun : Moon} />
    </IconButton>
  );
}
