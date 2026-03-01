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
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">目次</p>
      <nav aria-label="目次">
        <ul className="space-y-0.5">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                style={{
                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  paddingRight: '0.5rem',
                  paddingLeft: level === 3 ? '2rem' : level === 2 ? '0.75rem' : '0.25rem',
                  fontSize: level === 3 ? '0.75rem' : '0.875rem',
                }}
                className={`block no-underline tt rounded ${
                  activeId === id
                    ? 'text-foreground font-medium bg-tag-bg'
                    : 'text-muted hover:text-foreground hover:bg-tag-bg'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
