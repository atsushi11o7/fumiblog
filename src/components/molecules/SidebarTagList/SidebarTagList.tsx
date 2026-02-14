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
    <div className={`flex flex-wrap ${className}`.trim()} style={{ gap: '4px' }}>
      {tags.map((tag) => (
        <TagBadge
          key={tag.slug}
          label={tag.name}
          href={`/blog?tag=${tag.slug}`}
          size="medium"
        />
      ))}
    </div>
  );
}
