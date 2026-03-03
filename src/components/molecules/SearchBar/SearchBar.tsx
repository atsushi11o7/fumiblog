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
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`.trim()}>
      <h3 className="text-xs tracking-widest text-secondary mb-3">SEARCH</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="記事を検索..."
          className="flex-1 bg-background text-foreground border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:border-foreground tt"
        />
        <button
          onClick={handleSearch}
          aria-label="検索"
          className="tt text-secondary hover:text-foreground shrink-0"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
