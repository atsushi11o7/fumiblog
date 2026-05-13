import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'ghost' | 'primary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const sizeStyles: Record<string, React.CSSProperties> = {
  small: { padding: '4px 12px', fontSize: '10px', borderRadius: '4px' },
  medium: { padding: '6px 14px', fontSize: '12px', borderRadius: '4px' },
  large: { padding: '8px 20px', fontSize: '13px', borderRadius: '4px' },
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
    default: 'bg-card text-foreground border border-border hover:border-cat-accent',
    ghost: 'bg-transparent text-secondary border border-transparent hover:text-foreground hover:bg-tag-bg',
    primary: 'bg-cat-accent text-white border border-cat-accent hover:opacity-90',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `mono uppercase tracking-wider inline-flex items-center justify-center cursor-pointer transition-colors duration-200 ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

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
