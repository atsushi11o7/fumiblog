import Link from 'next/link';
import type { Category } from '@/types/article';

export interface CategoryWithCount extends Category {
  count: number;
}

export interface CategoryListProps {
  categories: CategoryWithCount[];
  className?: string;
}

export function CategoryList({ categories, className = '' }: CategoryListProps) {
  return (
    <div className={`bg-card border border-border rounded-md p-4 ${className}`.trim()}>
      <h3 className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-3">
        {'// categories'}
      </h3>
      <ul className="flex flex-col gap-1">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              className="group flex items-center justify-between mono text-[13px] text-foreground no-underline px-2 py-1.5 rounded-sm hover:bg-background transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-muted group-hover:text-cat-accent transition-colors" aria-hidden="true">›</span>
                <span>{cat.name}</span>
              </span>
              <span className="text-muted text-xs">[{cat.count}]</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
