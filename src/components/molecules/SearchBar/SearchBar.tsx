'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/blog?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={`bg-card border border-border rounded-md p-4 ${className}`.trim()}>
      <h3 className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-3">
        {'// search'}
      </h3>
      <div className="flex items-center gap-2 bg-background border border-border rounded-md px-2.5 py-1.5 focus-within:border-cat-accent transition-colors">
        <span className="mono text-cat-accent text-xs" aria-hidden="true">▶</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="記事を検索..."
          className="flex-1 bg-transparent mono text-sm text-foreground placeholder:text-muted outline-none"
        />
        <button
          onClick={handleSearch}
          aria-label="検索"
          className="text-secondary hover:text-cat-accent transition-colors"
        >
          <Search size={14} />
        </button>
      </div>
    </div>
  );
}
