'use client';

import { Terminal, MapPin, Code2, type LucideIcon } from 'lucide-react';
import { useTypingLoop } from '@/hooks/useTypingLoop';
import { HeroHeading } from '@/components/molecules/HeroHeading';

const HEADING = 'A space to share daily learnings';
const ACCENT = 'learnings';

const META_BADGES: { icon: LucideIcon; text: string }[] = [
  { icon: Code2, text: 'Python' },
  { icon: Code2, text: 'PyTorch' },
  { icon: MapPin, text: 'Yokohama, JP' },
];

export interface HeroSectionProps {
  label?: string;
  subtitle?: string;
  className?: string;
}

export function HeroSection({
  label = 'ENGINEER — AI / DEV',
  subtitle = '技術と日常の学びを記録しています。',
  className = '',
}: HeroSectionProps) {
  const { displayLen } = useTypingLoop(HEADING);

  return (
    <section
      className={`relative overflow-hidden rounded-2xl py-16 px-8 md:py-24 md:px-12 ${className}`.trim()}
    >
      {/* Background: dot grid */}
      <div
        className="hero-dot-grid absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Corner brackets — terminal frame */}
      <span className="absolute top-3 left-3 mono text-sm text-muted opacity-50 pointer-events-none select-none" aria-hidden="true">┌─</span>
      <span className="absolute top-3 right-3 mono text-sm text-muted opacity-50 pointer-events-none select-none" aria-hidden="true">─┐</span>
      <span className="absolute bottom-3 left-3 mono text-sm text-muted opacity-50 pointer-events-none select-none" aria-hidden="true">└─</span>
      <span className="absolute bottom-3 right-3 mono text-sm text-muted opacity-50 pointer-events-none select-none" aria-hidden="true">─┘</span>

      {/* Vertical accent bar */}
      <div
        className="absolute left-0 top-12 bottom-12 w-[3px] rounded-full hero-accent-line"
        style={{ backgroundColor: 'var(--cat-accent)' }}
        aria-hidden="true"
      />

      {/* Right-side hex index column (md+) */}
      <div
        className="absolute top-1/2 right-6 -translate-y-1/2 hidden md:flex flex-col gap-1 mono text-[10px] text-muted opacity-25 pointer-events-none select-none"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>0x{i.toString(16).padStart(2, '0').toUpperCase()}</span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        {/* Status line */}
        <div className="flex items-center gap-2 mb-8">
          <Terminal size={14} className="text-cat-accent" />
          <p className="mono text-xs tracking-widest text-muted uppercase">
            [ {label} ]
          </p>
        </div>

        {/* Heading */}
        <h1
          className="mono text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          aria-label={HEADING}
        >
          <HeroHeading text={HEADING} accent={ACCENT} displayLen={displayLen} />
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-secondary mb-10 max-w-xl">
          {subtitle}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2">
          {META_BADGES.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="mono inline-flex items-center gap-1.5 text-xs text-muted border border-border rounded-md px-2.5 py-1 bg-card"
            >
              <Icon size={12} />
              {text}
            </span>
          ))}
        </div>

        {/* Compiled-at-runtime indicator */}
        <div className="mt-12 flex items-center gap-2 mono text-[11px] text-muted opacity-60">
          <span className="text-cat-accent" aria-hidden="true">▶</span>
          <span className="uppercase tracking-widest">compiled at runtime</span>
        </div>
      </div>

      {/* Bottom horizontal line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px hero-accent-line"
        style={{ backgroundColor: 'var(--border)' }}
        aria-hidden="true"
      />
    </section>
  );
}
