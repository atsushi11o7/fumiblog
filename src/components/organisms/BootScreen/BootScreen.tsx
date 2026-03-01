'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ── Line model ── */
type LinePart = { text: string; className?: string; style?: React.CSSProperties };
type Line = LinePart[];

/* ── Step engine ── */
interface Step {
  action: () => void;
  delay: number;
}

const SESSION_KEY = 'bootPlayed';
const BANNER_COLOR = '#CBA6F7';

const getTimestamp = () => {
  const now = new Date();
  return `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
};

/* Progress bar renderer */
const renderProgressBar = (percent: number) => {
  const width = 26;
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return `  [${'█'.repeat(filled)}${'░'.repeat(empty)}] ${String(percent).padStart(3)}%`;
};

/* Braille spinner */
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const SPIN_INTERVAL = 60; // ms per frame
const SPIN_COUNT = 7;     // frames to show before done

export function BootScreen() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typingText, setTypingText] = useState('');
  const [phase, setPhase] = useState<'init' | 'running' | 'fading' | 'revealing' | 'done'>('init');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const terminalRef = useRef<HTMLDivElement>(null);
  const barLineIdxRef = useRef(-1);

  /* Auto-scroll terminal */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, typingText]);

  const addLine = useCallback((parts: LinePart[]) => {
    setLines((prev) => [...prev, parts]);
  }, []);

  const replaceLast = useCallback((parts: LinePart[]) => {
    setLines((prev) => {
      const next = [...prev];
      next[next.length - 1] = parts;
      return next;
    });
  }, []);

  const buildSteps = useCallback((): Step[] => {
    const steps: Step[] = [];
    const push = (action: () => void, delay: number) =>
      steps.push({ action, delay });

    const typeChars = (text: string, speed: number) => {
      for (let i = 1; i <= text.length; i++) {
        push(() => setTypingText(text.slice(0, i)), speed);
      }
      push(() => {
        addLine([{ text }]);
        setTypingText('');
      }, 0);
    };

    const TOTAL_TASKS = 5;
    let taskIndex = 0;

    const task = (label: string) => {
      taskIndex++;
      const currentTask = taskIndex;
      let ts = '';

      /* Add line with first spinner frame */
      push(
        () => {
          ts = getTimestamp();
          addLine([
            { text: `  ${ts}  `, style: { color: '#6C7086' } },
            { text: `${SPINNER_FRAMES[0]} `, style: { color: '#89B4FA' } },
            { text: `${label}...`, style: { color: '#8B949E' } },
          ]);
        },
        130 + Math.floor(Math.random() * 80),
      );

      /* Cycle through spinner frames */
      for (let i = 1; i < SPIN_COUNT; i++) {
        const frame = SPINNER_FRAMES[i % SPINNER_FRAMES.length];
        push(
          () =>
            replaceLast([
              { text: `  ${ts}  `, style: { color: '#6C7086' } },
              { text: `${frame} `, style: { color: '#89B4FA' } },
              { text: `${label}...`, style: { color: '#8B949E' } },
            ]),
          SPIN_INTERVAL,
        );
      }

      /* Finalize: show done */
      push(
        () =>
          replaceLast([
            { text: `  ${ts}  `, style: { color: '#6C7086' } },
            { text: `\u25B8 ${label}...  ` },
            { text: 'done', style: { color: '#A6E3A1' } },
          ]),
        SPIN_INTERVAL,
      );

      /* Update progress bar in-place */
      push(() => {
        const pct = Math.round((currentTask / TOTAL_TASKS) * 100);
        setLines((prev) => {
          if (barLineIdxRef.current < 0) return prev;
          const next = [...prev];
          next[barLineIdxRef.current] = [
            { text: renderProgressBar(pct), style: { color: '#89B4FA' } },
          ];
          return next;
        });
      }, 0);
    };

    /* ── Sequence ── */
    typeChars('$ fumiblog start', 30);
    push(() => {}, 400);
    push(() => addLine([{ text: '' }]), 0);

    /* ASCII banner */
    const bannerLines = [
      '  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2563\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2563 \u2588\u2588\u2557      \u2588\u2588\u2588\u2588\u2588\u2588\u2563  \u2588\u2588\u2588\u2588\u2588\u2588\u2563  ',
      '  \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2563 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2563\u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2563\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d  ',
      '  \u2588\u2588\u2588\u2588\u2588\u2563  \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551     \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2588\u2563 ',
      '  \u2588\u2588\u2554\u2550\u2550\u255d  \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2588\u2588\u2554\u255d\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2563\u2588\u2588\u2551     \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551 ',
      '  \u2588\u2588\u2551     \u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551 \u255a\u2550\u255d \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2563\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d ',
      '  \u255a\u2550\u255d      \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d     \u255a\u2550\u255d\u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d  ',
    ];
    bannerLines.forEach((lineText) => {
      push(
        () => addLine([{ text: lineText, style: { color: BANNER_COLOR, fontWeight: 'bold' } }]),
        60,
      );
    });

    /* Separator */
    push(() => addLine([{ text: '  ' + '\u2500'.repeat(68), style: { color: '#313244' } }]), 100);

    push(() => addLine([{ text: '' }]), 200);
    push(() => addLine([{ text: '  \uD83D\uDE80 v3.0.0', style: { color: '#89B4FA' } }]), 300);
    push(() => addLine([{ text: '' }]), 200);

    /* Progress bar — initial 0% */
    push(() => {
      setLines((prev) => {
        barLineIdxRef.current = prev.length;
        return [...prev, [{ text: renderProgressBar(0), style: { color: '#4A4F6A' } }]];
      });
    }, 0);
    push(() => addLine([{ text: '' }]), 200);

    /* Tasks */
    task('Loading configuration');
    task('Connecting to CMS');
    task('Fetching articles');
    task('Building pages');
    task('Starting server');

    push(() => addLine([{ text: '' }]), 300);
    push(
      () =>
        addLine([
          { text: '  \u2713 Ready on https://fumiblog.com', style: { color: '#A6E3A1', fontWeight: 'bold' } },
        ]),
      400,
    );
    push(() => addLine([{ text: '' }]), 300);

    return steps;
  }, [addLine, replaceLast]);

  /* ── Run sequence ── */
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === '1';

    if (reducedMotion || alreadyPlayed) {
      setPhase('done');
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.bootPhase = '0';

    setPhase('running');
    const steps = buildSteps();

    /* Pause → fade out → reveal */
    steps.push({ action: () => {}, delay: 800 });
    steps.push({ action: () => setPhase('fading'), delay: 1400 });
    steps.push({
      action: () => {
        setPhase('revealing');
        document.documentElement.dataset.bootPhase = '1';
      },
      delay: 500,
    });
    steps.push({ action: () => { document.documentElement.dataset.bootPhase = '2'; }, delay: 600 });
    steps.push({ action: () => { document.documentElement.dataset.bootPhase = '3'; }, delay: 800 });
    steps.push({
      action: () => {
        delete document.documentElement.dataset.bootPhase;
        document.body.style.overflow = prevOverflow;
        sessionStorage.setItem(SESSION_KEY, '1');
        setPhase('done');
      },
      delay: 0,
    });

    let index = 0;
    function next() {
      if (index >= steps.length) return;
      const step = steps[index];
      step.action();
      index++;
      if (index < steps.length) {
        timerRef.current = setTimeout(next, step.delay);
      }
    }
    next();

    return () => {
      clearTimeout(timerRef.current);
      document.body.style.overflow = prevOverflow;
      delete document.documentElement.dataset.bootPhase;
    };
  }, [buildSteps]);

  if (phase !== 'running' && phase !== 'fading') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background p-4 md:p-8 transition-opacity duration-[1400ms] ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
    >
      {/* Mac-style terminal window */}
      <div
        className="w-full h-full max-w-5xl max-h-[85vh] flex flex-col rounded-xl border border-[#313244] bg-[#1E1E2E] overflow-hidden relative"
        style={{
          boxShadow: '0 0 60px rgba(203,166,247,0.15), 0 0 120px rgba(137,180,250,0.08), 0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Scanline CRT overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-xl"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
          }}
        />

        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#313244] shrink-0 relative z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-mono text-xs text-[#6C7086]">atsushi — ~/blog</span>
          <div className="w-16" />
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="flex-1 p-6 md:p-8 font-mono text-sm md:text-base overflow-y-auto overflow-x-auto relative z-20"
          style={{
            color: '#CDD6F4',
            whiteSpace: 'pre',
            lineHeight: '1.3',
            fontFamily:
              '"JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", "Menlo", "DejaVu Sans Mono", "Courier New", var(--font-geist-mono), monospace',
          }}
        >
          {lines.map((parts, i) => (
            <div key={i}>
              {parts.length === 0 || (parts.length === 1 && parts[0].text === '') ? (
                <span>{'\u00A0'}</span>
              ) : (
                parts.map((part, j) => (
                  <span key={j} className={part.className ?? ''} style={part.style}>
                    {part.text}
                  </span>
                ))
              )}
            </div>
          ))}

          {typingText && (
            <div>
              {typingText}
              <span
                className="inline-block w-2.5 h-[1.1em] ml-px align-text-bottom animate-pulse"
                style={{ backgroundColor: '#CDD6F4' }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {/* Footer status bar */}
        <div className="flex items-center px-4 py-2 border-t border-[#313244] bg-[#181825] shrink-0 relative z-20">
          <span className="font-mono text-[11px] text-[#6C7086]">✦ fumiblog  v3.0.0</span>
        </div>
      </div>
    </div>
  );
}
