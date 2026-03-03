import React from 'react';

export interface ButtonProps {
  /**
   * Button contents
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
  variant?: 'default' | 'ghost' | 'primary';
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

const sizeStyles: Record<string, React.CSSProperties> = {
  small: { padding: '4px 12px', fontSize: '10px', borderRadius: '4px' },
  medium: { padding: '6px 14px', fontSize: '13px', borderRadius: '6px' },
  large: { padding: '8px 20px', fontSize: '12px', borderRadius: '6px' },
};

export function Button({
  children,
  onClick,
  size = 'medium',
  variant = 'default',
  type = 'button',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const variantClasses = {
    default: 'bg-card text-foreground border border-border hover:bg-tag-bg',
    ghost: 'bg-transparent text-foreground border border-transparent hover:bg-tag-bg',
    primary: 'bg-accent text-accent-contrast border border-accent hover:opacity-90',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `tt inline-flex items-center justify-center cursor-pointer font-medium ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      style={sizeStyles[size]}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
