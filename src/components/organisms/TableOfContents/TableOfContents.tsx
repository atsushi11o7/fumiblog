'use client';

import { useState, useEffect } from 'react';
import type { HeadingItem } from '@/libs/article-processor';

export interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -70% 0%' },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-3">
        {'// table of contents'}
      </p>
      <nav aria-label="目次">
        <ul className="flex flex-col gap-0.5">
          {headings.map(({ id, text, level }) => {
            const isActive = activeId === id;
            const indent = level === 3 ? 'pl-6' : level === 2 ? 'pl-3' : 'pl-1';
            const fontSize = level === 3 ? 'text-[11px]' : 'text-xs';
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`mono group flex items-center gap-1.5 py-1 pr-2 ${indent} ${fontSize} rounded-sm no-underline transition-colors ${
                    isActive
                      ? 'text-cat-accent font-semibold bg-background'
                      : 'text-muted hover:text-foreground hover:bg-background'
                  }`}
                >
                  <span aria-hidden="true" className={isActive ? 'text-cat-accent' : 'text-muted/60 group-hover:text-cat-accent'}>
                    {isActive ? '▶' : '·'}
                  </span>
                  <span className="truncate">{text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
