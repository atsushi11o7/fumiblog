export interface HeroHeadingProps {
  text: string;
  accent: string;
  displayLen: number;
}

interface Segment {
  text: string;
  isAccent: boolean;
  startIdx: number;
}

function buildSegments(text: string, accent: string): Segment[] {
  const accentStart = text.toLowerCase().indexOf(accent.toLowerCase());
  if (accentStart < 0) {
    return [{ text, isAccent: false, startIdx: 0 }];
  }

  const accentEnd = accentStart + accent.length;
  const segments: Segment[] = [];
  if (accentStart > 0) {
    segments.push({ text: text.slice(0, accentStart), isAccent: false, startIdx: 0 });
  }
  segments.push({
    text: text.slice(accentStart, accentEnd),
    isAccent: true,
    startIdx: accentStart,
  });
  if (accentEnd < text.length) {
    segments.push({ text: text.slice(accentEnd), isAccent: false, startIdx: accentEnd });
  }
  return segments;
}

export function HeroHeading({ text, accent, displayLen }: HeroHeadingProps) {
  const segments = buildSegments(text, accent);

  const cursorSegIdx = segments.findIndex(
    (seg) => displayLen >= seg.startIdx && displayLen < seg.startIdx + seg.text.length,
  );
  const cursorIn = cursorSegIdx >= 0 ? cursorSegIdx : segments.length - 1;

  return (
    <>
      {segments.map((seg, si) => {
        const visibleLen = Math.max(0, Math.min(displayLen - seg.startIdx, seg.text.length));
        const visiblePart = seg.text.slice(0, visibleLen);
        const hiddenPart = seg.text.slice(visibleLen);
        const showCursor = si === cursorIn;
        const accentClass = seg.isAccent
          ? 'text-cat-accent underline decoration-cat-accent decoration-[6px] underline-offset-[0.18em]'
          : '';

        return (
          <span key={si} className={accentClass}>
            {visiblePart}
            {showCursor && (
              <span className="hero-cursor-blink-inline" aria-hidden="true">
                {'⁠'}
              </span>
            )}
            {hiddenPart && (
              <span style={{ visibility: 'hidden' }} aria-hidden="true">
                {hiddenPart}
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}
