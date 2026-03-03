import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface IconProps {
  /**
   * Lucide icon component
   */
  icon: LucideIcon;
  /**
   * Icon size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Icon color (defaults to currentColor)
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export function Icon({
  icon: IconComponent,
  size = 'medium',
  color,
  className = '',
  'aria-label': ariaLabel,
}: IconProps) {
  const sizeMap = {
    small: 16,
    medium: 20,
    large: 24,
  };

  const pixelSize = sizeMap[size];

  return (
    <IconComponent
      size={pixelSize}
      color={color}
      className={className}
      aria-label={ariaLabel}
    />
  );
}
