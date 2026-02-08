import React from 'react';

export interface IconButtonProps {
  /**
   * Button contents (icon, emoji, or any ReactNode)
   */
  children: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button variant
   */
  variant?: 'default' | 'ghost';
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export function IconButton({
  children,
  onClick,
  size = 'medium',
  variant = 'default',
  type = 'button',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: IconButtonProps) {
  const baseClasses = 'tt flex items-center justify-center cursor-pointer transition-all duration-300 text-foreground';

  const sizeClasses = {
    small: 'w-8 h-8 rounded-lg text-sm',
    medium: 'w-11 h-11 rounded-xl text-lg',
    large: 'w-14 h-14 rounded-[14px] text-[22px]',
  };

  const variantClasses = {
    default: 'bg-card border border-border hover:bg-tag-bg',
    ghost: 'bg-transparent border border-transparent hover:bg-tag-bg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
