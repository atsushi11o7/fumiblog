/**
 * Type definitions, constants, and pure helpers for BootScreen.
 */

export type LinePart = { text: string; className?: string; style?: React.CSSProperties };
export type Line = LinePart[];

export interface Step {
  action: () => void;
  delay: number;
}

export const SESSION_KEY = 'bootPlayed';
export const BANNER_COLOR = '#CBA6F7';

export const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
export const SPIN_INTERVAL = 60; // ms per frame
export const SPIN_COUNT = 7;     // frames to show before done

export const TOTAL_TASKS = 5;
export const PROGRESS_BAR_WIDTH = 26;

export const TASK_LABELS = [
  'Loading configuration',
  'Connecting to CMS',
  'Fetching articles',
  'Building pages',
  'Starting server',
] as const;

export const BANNER_LINES = [
  '  ███████╣██╗   ██╗███╗   ███╗██╗██████╣ ██╗      ██████╣  ██████╣  ',
  '  ██╔════╝██║   ██║████╣ ████║██║██╔══██╣██║     ██╔═══██╣██╔════╝  ',
  '  █████╣  ██║   ██║██╔████╔██║██║██████╔╝██║     ██║   ██║██║  ███╣ ',
  '  ██╔══╝  ██║   ██║██║╚██╔╝██║██║██╔══██╣██║     ██║   ██║██║   ██║ ',
  '  ██║     ╚██████╔╝██║ ╚═╝ ██║██║██████╔╝███████╣╚██████╔╝╚██████╔╝ ',
  '  ╚═╝      ╚═════╝ ╚═╝     ╚═╝╚═╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝  ',
] as const;

export function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `[${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
}

export function renderProgressBar(percent: number): string {
  const filled = Math.round((percent / 100) * PROGRESS_BAR_WIDTH);
  const empty = PROGRESS_BAR_WIDTH - filled;
  return `  [${'█'.repeat(filled)}${'░'.repeat(empty)}] ${String(percent).padStart(3)}%`;
}
