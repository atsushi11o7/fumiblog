import Link from 'next/link';
import type { Category } from '@/types/article';

export interface CategoryWithCount extends Category {
  count: number;
}

export interface CategoryListProps {
  /**
   * カテゴリ一覧（記事数付き）
   */
  categories: CategoryWithCount[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

const itemStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: '6px',
  fontSize: '13px',
};

export function CategoryList({ categories, className = '' }: CategoryListProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`.trim()}>
      <h3 className="text-xs tracking-widest text-secondary mb-3">CATEGORIES</h3>
      <div className="flex flex-col" style={{ gap: '4px' }}>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="tt flex justify-between bg-background text-foreground no-underline hover:opacity-80"
            style={itemStyle}
          >
            <span>{cat.name}</span>
            <span className="text-muted">{cat.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
