import { TagBadge } from '@/components/atoms/TagBadge';
import type { Tag } from '@/types/article';

export interface SidebarTagListProps {
  tags: Tag[];
  className?: string;
}

export function SidebarTagList({ tags, className = '' }: SidebarTagListProps) {
  return (
    <div className={`bg-card border border-border rounded-md p-4 ${className}`.trim()}>
      <h3 className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-3">
        {'// tags'}
      </h3>
      <div className="flex flex-wrap gap-1.5">
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
