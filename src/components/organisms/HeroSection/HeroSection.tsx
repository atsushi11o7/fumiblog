'use client';

import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { Terminal, MapPin, Code2 } from 'lucide-react';

const HEADING = 'A space to share daily\u00A0learnings';
const ACCENT = 'learnings';
const TYPE_SPEED = 60; // ms per char
const HOLD_DURATION = 20_000; // ms to display before re-typing

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
  const [displayLen, setDisplayLen] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fullText = HEADING;

  const scheduleNext = useCallback((fn: () => void, delay: number) => {
    timerRef.current = setTimeout(fn, delay);
  }, []);

  useEffect(() => {
    if (displayLen < fullText.length) {
      scheduleNext(() => setDisplayLen((n) => n + 1), TYPE_SPEED);
    } else {
      // Hold for 20s then re-type
      scheduleNext(() => setDisplayLen(0), HOLD_DURATION);
    }
    return () => clearTimeout(timerRef.current);
  }, [displayLen, fullText.length, scheduleNext]);

  /* ── Render heading with anti-reflow (full text always in DOM) ── */
  const renderHeading = () => {
    const accentStart = fullText.toLowerCase().indexOf(ACCENT.toLowerCase());
    const accentEnd = accentStart >= 0 ? accentStart + ACCENT.length : -1;

    // Build segments: [before?, accent?, after?] or [full]
    type Seg = { text: string; isAccent: boolean; startIdx: number };
    const segments: Seg[] = [];

    if (accentStart >= 0) {
      if (accentStart > 0)
        segments.push({ text: fullText.slice(0, accentStart), isAccent: false, startIdx: 0 });
      segments.push({ text: fullText.slice(accentStart, accentEnd), isAccent: true, startIdx: accentStart });
      if (accentEnd < fullText.length)
        segments.push({ text: fullText.slice(accentEnd), isAccent: false, startIdx: accentEnd });
    } else {
      segments.push({ text: fullText, isAccent: false, startIdx: 0 });
    }

    // Determine which segment holds the cursor
    const cursorSegIdx = segments.findIndex(
      (seg) => displayLen >= seg.startIdx && displayLen < seg.startIdx + seg.text.length,
    );
    // If cursor is past all segments (fully typed), it belongs to the last one
    const cursorIn = cursorSegIdx >= 0 ? cursorSegIdx : segments.length - 1;

    return (
      <>
        {segments.map((seg, si) => {
          const visibleLen = Math.max(0, Math.min(displayLen - seg.startIdx, seg.text.length));
          const visiblePart = seg.text.slice(0, visibleLen);
          const hiddenPart = seg.text.slice(visibleLen);
          const showCursor = si === cursorIn;

          if (seg.isAccent) {
            // hiddenPart must be outside the gradient span to avoid WebKit
            // background-clip:text bug where visibility:hidden is ignored
            return (
              <Fragment key={si}>
                <span className="hero-gradient-text">
                  {visiblePart}
                  {showCursor && (
                    <span className="hero-cursor-blink-inline" aria-hidden="true">{'\u2060'}</span>
                  )}
                </span>
                {hiddenPart && (
                  <span style={{ visibility: 'hidden' }} aria-hidden="true">{hiddenPart}</span>
                )}
              </Fragment>
            );
          }

          return (
            <span key={si}>
              {visiblePart}
              {showCursor && (
                <span className="hero-cursor-blink-inline" aria-hidden="true">{'\u2060'}</span>
              )}
              {hiddenPart && (
                <span style={{ visibility: 'hidden' }} aria-hidden="true">{hiddenPart}</span>
              )}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <section
      className={`relative overflow-hidden rounded-2xl py-16 px-8 md:py-20 md:px-12 ${className}`.trim()}
    >
      {/* Background: Dot Grid */}
      <div
        className="hero-dot-grid absolute inset-0 opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Background: Gradient Orb */}
      <div
        className="hero-orb absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.07] pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--cat-accent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative: Vertical Accent Line */}
      <div
        className="absolute left-0 top-12 bottom-12 w-[3px] rounded-full hero-accent-line"
        style={{ backgroundColor: 'var(--cat-accent)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        {/* Status line */}
        <div className="flex items-center gap-2 mb-6">
          <Terminal size={14} className="text-muted" />
          <p className="mono text-xs tracking-widest text-muted uppercase">
            {label}
          </p>
        </div>

        {/* Heading — typing loop */}
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4"
          aria-label={fullText}
        >
          {renderHeading()}
        </h1>

        {/* Subtitle */}
        <p className="text-base text-secondary mb-8">
          {subtitle}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="mono inline-flex items-center gap-1.5 text-xs text-muted border border-border rounded-md px-2.5 py-1 bg-card">
            <Code2 size={12} />
            Python
          </span>
          <span className="mono inline-flex items-center gap-1.5 text-xs text-muted border border-border rounded-md px-2.5 py-1 bg-card">
            <Code2 size={12} />
            PyTorch
          </span>
          <span className="mono inline-flex items-center gap-1.5 text-xs text-muted border border-border rounded-md px-2.5 py-1 bg-card">
            <MapPin size={12} />
            Yokohama, JP
          </span>
        </div>
      </div>

      {/* Decorative: Floating Geometric Shapes */}
      <div
        className="absolute inset-y-0 right-0 w-3/4 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        {/* Circle — XL, top-right — indigo */}
        <svg
          className="absolute -top-4 right-4 opacity-[0.20]"
          width="120" height="120" viewBox="0 0 120 120"
          style={{ animation: 'hero-shape-drift-1 6s ease-in-out infinite' }}
        >
          <circle cx="60" cy="60" r="56" fill="none" stroke="#6366f1" strokeWidth="1.5" />
        </svg>

        {/* Square — large, mid-right — emerald */}
        <svg
          className="absolute top-1/2 -translate-y-1/2 right-12 opacity-[0.20]"
          width="72" height="72" viewBox="0 0 72 72"
          style={{ animation: 'hero-shape-drift-2 8s ease-in-out 0.5s infinite' }}
        >
          <rect x="3" y="3" width="66" height="66" fill="none" stroke="#34d399" strokeWidth="1.5" rx="3" />
        </svg>

        {/* Triangle — large, top-center — amber */}
        <svg
          className="absolute top-6 right-[52%] opacity-[0.22]"
          width="64" height="58" viewBox="0 0 64 58"
          style={{ animation: 'hero-shape-drift-3 7s ease-in-out 1s infinite' }}
        >
          <polygon points="32,2 62,56 2,56" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Circle — medium, bottom-right — rose */}
        <svg
          className="absolute bottom-4 right-10 opacity-[0.22]"
          width="56" height="56" viewBox="0 0 56 56"
          style={{ animation: 'hero-shape-orbit 9s ease-in-out 1.5s infinite' }}
        >
          <circle cx="28" cy="28" r="25" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
        </svg>

        {/* Square — medium, rotated — sky */}
        <svg
          className="absolute bottom-1/4 right-[62%] opacity-[0.18]"
          width="52" height="52" viewBox="0 0 52 52"
          style={{ animation: 'hero-shape-drift-1 9s ease-in-out 2s infinite' }}
        >
          <rect x="3" y="3" width="46" height="46" fill="none" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(20 26 26)" />
        </svg>

        {/* Triangle — medium, bottom-center — violet */}
        <svg
          className="absolute bottom-6 right-[46%] opacity-[0.18]"
          width="48" height="44" viewBox="0 0 48 44"
          style={{ animation: 'hero-shape-drift-2 10s ease-in-out 3s infinite' }}
        >
          <polygon points="24,2 46,42 2,42" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Diamond — large, center — cat-accent */}
        <svg
          className="absolute top-1/3 right-[36%] opacity-[0.14]"
          width="80" height="80" viewBox="0 0 80 80"
          style={{ animation: 'hero-shape-orbit 14s linear infinite' }}
        >
          <rect x="8" y="8" width="64" height="64" fill="none" stroke="var(--cat-accent)" strokeWidth="1.2" transform="rotate(45 40 40)" />
        </svg>

        {/* Pentagon — mid-right — orange */}
        <svg
          className="absolute top-[28%] right-4 opacity-[0.18]"
          width="58" height="58" viewBox="0 0 58 58"
          style={{ animation: 'hero-shape-drift-3 12s ease-in-out 0.8s infinite' }}
        >
          <polygon points="29,3 55,21 45,53 13,53 3,21" fill="none" stroke="#fb923c" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Hexagon — top-mid — teal */}
        <svg
          className="absolute top-2 right-[32%] opacity-[0.16]"
          width="56" height="56" viewBox="0 0 56 56"
          style={{ animation: 'hero-shape-drift-2 11s ease-in-out 0.3s infinite' }}
        >
          <polygon points="28,2 50,14 50,42 28,54 6,42 6,14" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Circle — small, center-left — pink */}
        <svg
          className="absolute top-[55%] right-[58%] opacity-[0.15]"
          width="40" height="40" viewBox="0 0 40 40"
          style={{ animation: 'hero-shape-orbit 8s ease-in-out 2.5s infinite' }}
        >
          <circle cx="20" cy="20" r="17" fill="none" stroke="#ec4899" strokeWidth="1.5" />
        </svg>

        {/* Triangle — tiny, upper-mid — lime */}
        <svg
          className="absolute top-[18%] right-[48%] opacity-[0.20]"
          width="32" height="30" viewBox="0 0 32 30"
          style={{ animation: 'hero-shape-drift-1 7s ease-in-out 4s infinite' }}
        >
          <polygon points="16,2 30,28 2,28" fill="none" stroke="#a3e635" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Square — tiny, bottom-left — cyan */}
        <svg
          className="absolute bottom-[18%] right-[70%] opacity-[0.14]"
          width="28" height="28" viewBox="0 0 28 28"
          style={{ animation: 'hero-shape-drift-3 13s ease-in-out 1.2s infinite' }}
        >
          <rect x="2" y="2" width="24" height="24" fill="none" stroke="#22d3ee" strokeWidth="1.5" transform="rotate(35 14 14)" />
        </svg>
      </div>

      {/* Decorative: Bottom horizontal line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px hero-accent-line"
        style={{ backgroundColor: 'var(--border)' }}
        aria-hidden="true"
      />
    </section>
  );
}
