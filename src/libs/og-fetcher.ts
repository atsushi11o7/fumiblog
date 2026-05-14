/**
 * Fetch Open Graph metadata from a remote URL for link card rendering.
 */

export interface OgData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const FETCH_TIMEOUT_MS = 5000;
const REVALIDATE_SECONDS = 86400; // 1 day

export async function fetchOgData(url: string): Promise<OgData> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; FumiBlog Link Preview; +https://fumiblog.com)',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return { url };

    const html = await res.text();
    const head = html.slice(0, 16_000); // limit parse range for perf

    const title =
      pickMeta(head, 'og:title') ??
      pickMeta(head, 'twitter:title') ??
      pickTitleTag(head);

    const description =
      pickMeta(head, 'og:description') ??
      pickMeta(head, 'twitter:description') ??
      pickName(head, 'description');

    const image =
      pickMeta(head, 'og:image') ??
      pickMeta(head, 'twitter:image') ??
      pickMeta(head, 'twitter:image:src');

    const siteName = pickMeta(head, 'og:site_name');

    return {
      url,
      title: title ? decodeHtml(title) : undefined,
      description: description ? decodeHtml(description) : undefined,
      image: image ? resolveUrl(image, url) : undefined,
      siteName: siteName ? decodeHtml(siteName) : undefined,
    };
  } catch {
    return { url };
  }
}

function pickMeta(html: string, prop: string): string | undefined {
  const propEscaped = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const a = new RegExp(
    `<meta\\s+[^>]*property=["']${propEscaped}["']\\s+[^>]*content=["']([^"']+)["']`,
    'i',
  ).exec(html)?.[1];
  if (a) return a;
  const b = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']+)["']\\s+[^>]*property=["']${propEscaped}["']`,
    'i',
  ).exec(html)?.[1];
  return b;
}

function pickName(html: string, name: string): string | undefined {
  const a = new RegExp(
    `<meta\\s+[^>]*name=["']${name}["']\\s+[^>]*content=["']([^"']+)["']`,
    'i',
  ).exec(html)?.[1];
  return a;
}

function pickTitleTag(html: string): string | undefined {
  return /<title>([^<]+)<\/title>/i.exec(html)?.[1];
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function resolveUrl(maybeRelative: string, base: string): string {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}
