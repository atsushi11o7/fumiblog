export interface TagBadgeProps {
  label: string;
  href?: string;
  size?: 'small' | 'medium';
  className?: string;
}

const SIZE_CLASSES: Record<string, string> = {
  small: 'text-[10px] px-1.5 py-0.5',
  medium: 'text-[11px] px-2 py-0.5',
};

export function TagBadge({
  label,
  href,
  size = 'small',
  className = '',
}: TagBadgeProps) {
  const classes = `mono inline-flex items-center gap-0.5 ${SIZE_CLASSES[size]} text-tag-text border border-border rounded-sm hover:border-cat-accent hover:text-cat-accent transition-colors no-underline leading-tight ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        <span className="opacity-60" aria-hidden="true">#</span>
        {label}
      </a>
    );
  }

  return (
    <span className={classes}>
      <span className="opacity-60" aria-hidden="true">#</span>
      {label}
    </span>
  );
}
