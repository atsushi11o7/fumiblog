'use client';

import { useTypingLoop } from '@/hooks/useTypingLoop';
import { HeroHeading } from '@/components/molecules/HeroHeading';
import { CodeEditorTabBar } from '@/components/atoms/CodeEditorTabBar';
import { CodeEditorBreadcrumb } from '@/components/atoms/CodeEditorBreadcrumb';
import { CodeEditorStatusBar } from '@/components/atoms/CodeEditorStatusBar';
import { CodeEditorMinimap } from '@/components/atoms/CodeEditorMinimap';

const HEADING = 'A space to share daily learnings';
const ACCENT = 'learnings';

const TABS = [
  { name: 'hero.tsx', active: true },
  { name: 'about.md' },
  { name: 'README.md' },
];

const BREADCRUMB = ['src', 'components', 'organisms', 'HeroSection', 'hero.tsx'];

// Decorative gutter marks (visual diff indicators)
const GUTTER_MARKS = [
  '', '+', '+', '+', '+', '', '~', '~', '', '~', '', '+', '+', '+', '+', '', '',
];

export interface HeroSectionProps {
  author?: string;
  role?: string;
  stack?: string;
  loc?: string;
  subtitle?: string;
  className?: string;
}

export function HeroSection({
  author = 'Atsushi (@atsushi11o7)',
  role = 'ENGINEER — AI / DEV',
  stack = 'Python · PyTorch',
  loc = 'Yokohama, JP',
  subtitle = '技術と日常の学びを記録しています。',
  className = '',
}: HeroSectionProps) {
  const { displayLen } = useTypingLoop(HEADING);
  const buildSha = process.env.NEXT_PUBLIC_GIT_SHA ?? 'dev';

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-border bg-background ${className}`.trim()}
      aria-label="Hero"
    >
      <CodeEditorTabBar tabs={TABS} />
      <CodeEditorBreadcrumb segments={BREADCRUMB} />

      <div className="grid grid-cols-[24px_56px_1fr] md:grid-cols-[24px_56px_1fr_80px]">
        {/* Gutter (diff marks) */}
        <div
          className="bg-bg-secondary border-r border-border pt-6 text-center mono text-[11px] text-muted"
          aria-hidden="true"
        >
          {GUTTER_MARKS.map((mark, i) => {
            const color =
              mark === '+'
                ? 'text-gutter-added'
                : mark === '~'
                ? 'text-cat-accent'
                : '';
            return (
              <span key={i} className={`block leading-relaxed ${color}`.trim()}>
                {mark || ' '}
              </span>
            );
          })}
        </div>

        {/* Line numbers */}
        <div className="bg-bg-secondary border-r border-border py-6 px-3 text-right mono text-[13px] text-muted select-none">
          {Array.from({ length: 17 }, (_, i) => {
            const n = i + 1;
            const isHighlighted = n === 7 || n === 8;
            return (
              <span
                key={n}
                className={`block leading-relaxed ${isHighlighted ? 'text-cat-accent font-semibold' : ''}`.trim()}
              >
                {n}
              </span>
            );
          })}
        </div>

        {/* Code */}
        <div className="py-6 px-7 mono text-sm leading-relaxed bg-background">
          <div className="text-syntax-comment">{`// ─ hero · v0.1 ────────────────`}</div>
          <div className="text-syntax-comment">{`// @author  ${author}`}</div>
          <div className="text-syntax-comment">{`// @role    ${role}`}</div>
          <div className="text-syntax-comment">{`// @stack   ${stack}`}</div>
          <div className="text-syntax-comment">{`// @loc     ${loc}`}</div>
          <div>&nbsp;</div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-[1.15] tracking-tight my-4"
            aria-label={HEADING}
          >
            <HeroHeading text={HEADING} accent={ACCENT} displayLen={displayLen} />
          </h1>
          <div>&nbsp;</div>
          <div className="text-syntax-comment">{`/* ${subtitle} */`}</div>
          <div>&nbsp;</div>
          <div>
            <span className="text-syntax-keyword font-semibold">export const </span>
            <span className="text-syntax-type">meta</span>
            <span> = {'{'}</span>
          </div>
          <div>
            {'  '}
            <span className="text-syntax-type">build</span>
            <span>: </span>
            <span className="text-syntax-string">{`"${buildSha}"`}</span>
            <span>,</span>
          </div>
          <div>
            {'  '}
            <span className="text-syntax-type">since</span>
            <span>: </span>
            <span className="text-syntax-string">{`"2026"`}</span>
            <span>,</span>
          </div>
          <div>{'};'}</div>
          <div>&nbsp;</div>
          <div className="text-syntax-comment">{`// ─────────────────────────────`}</div>
        </div>

        {/* Minimap (md+) */}
        <CodeEditorMinimap className="hidden md:flex" />
      </div>

      <CodeEditorStatusBar branch="develop" warnings={0} errors={0} line={7} column={12} />
    </section>
  );
}
