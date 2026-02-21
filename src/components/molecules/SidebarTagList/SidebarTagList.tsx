import { TagBadge } from '@/components/atoms/TagBadge';
import type { Tag } from '@/types/article';

export interface SidebarTagListProps {
  /**
   * microCMS から取得したタグ一覧
   */
  tags: Tag[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SidebarTagList({ tags, className = '' }: SidebarTagListProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`.trim()}>
      <h3 className="text-xs tracking-widest text-secondary mb-3">TAGS</h3>
      <div className="flex flex-wrap" style={{ gap: '4px' }}>
        {tags.map((tag) => (
          <TagBadge
            key={tag.slug}
            label={tag.name}
            href={`/tag/${tag.slug}`}
            size="medium"
          />
        ))}
      </div>
    </div>
  );
}
