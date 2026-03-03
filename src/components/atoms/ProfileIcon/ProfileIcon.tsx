import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ProfileIconProps {
  /**
   * Image source URL (if provided, displays image instead of icon)
   */
  src?: string;
  /**
   * Alt text for image
   */
  alt?: string;
  /**
   * Lucide icon to display (defaults to User icon)
   */
  icon?: LucideIcon;
  /**
   * Icon size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function ProfileIcon({
  src,
  alt = 'Profile Icon',
  icon: IconComponent = User,
  size = 'medium',
  className = '',
}: ProfileIconProps) {
  const sizeMap = {
    small: { container: 32, icon: 16 },
    medium: { container: 48, icon: 22 },
    large: { container: 64, icon: 28 },
  };

  const sizes = sizeMap[size];

  // If image src is provided, display image
  if (src) {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`.trim()}
        style={{ width: sizes.container, height: sizes.container }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${sizes.container}px`}
        />
      </div>
    );
  }

  // Otherwise, display icon with background
  return (
    <div
      className={`rounded-full bg-tag-bg flex items-center justify-center flex-shrink-0 text-secondary ${className}`.trim()}
      style={{ width: sizes.container, height: sizes.container }}
    >
      <IconComponent size={sizes.icon} />
    </div>
  );
}
