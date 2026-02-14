'use client';

import { Button } from '@/components/atoms/Button';
import type { Category } from '@/types/article';

export interface CategoryFilterProps {
  /**
   * microCMS から取得したカテゴリ一覧
   */
  categories: Category[];
  /**
   * 選択中のカテゴリ slug（'all' で全件表示）
   */
  activeCategory?: string;
  /**
   * カテゴリ変更時のコールバック（slug を返す）
   */
  onCategoryChange?: (slug: string) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory = 'all',
  onCategoryChange,
  className = '',
}: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant={activeCategory === 'all' ? 'primary' : 'ghost'}
        size="medium"
        onClick={() => onCategoryChange?.('all')}
        className="tt"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.slug}
          variant={activeCategory === category.slug ? 'primary' : 'ghost'}
          size="medium"
          onClick={() => onCategoryChange?.(category.slug)}
          className="tt"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
