export interface TagBadgeProps {
  /**
   * タグ名
   */
  label: string;
  /**
   * リンク先（指定するとaタグになる）
   */
  href?: string;
  /**
   * サイズ
   * - small: 記事カード内のタグ (padding: 3px 8px)
   * - medium: サイドバーのタグ (padding: 4px 8px)
   */
  size?: 'small' | 'medium';
  /**
   * Additional CSS classes
   */
  className?: string;
}

const sizeStyles: Record<string, React.CSSProperties> = {
  small: { padding: '3px 8px' },
  medium: { padding: '4px 8px' },
};

const baseStyle: React.CSSProperties = {
  fontSize: '11px',
  borderRadius: '4px',
  display: 'inline-block',
  lineHeight: 1.4,
  textDecoration: 'none',
};

export function TagBadge({
  label,
  href,
  size = 'small',
  className = '',
}: TagBadgeProps) {
  const style = { ...baseStyle, ...sizeStyles[size] };
  const classes = `tt bg-tag-bg text-tag-text ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {label}
      </a>
    );
  }

  return (
    <span className={classes} style={style}>
      {label}
    </span>
  );
}
