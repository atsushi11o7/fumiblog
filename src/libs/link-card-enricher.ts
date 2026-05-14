/**
 * Replace standalone URL paragraphs (`<p><a href="X">X</a></p>`) in article HTML
 * with rich link-card HTML using Open Graph metadata.
 */

import { fetchOgData, type OgData } from './og-fetcher';

const LINK_PARAGRAPH_RE =
  /<p>\s*<a\s+href=["']([^"']+)["'][^>]*>\s*([^<]+)\s*<\/a>\s*<\/p>/gi;

export async function enrichLinkCards(html: string): Promise<string> {
  type Match = { full: string; url: string };
  const matches: Match[] = [];

  for (const m of html.matchAll(LINK_PARAGRAPH_RE)) {
    const [full, href, text] = m;
    if (decodeEntities(href).trim() === decodeEntities(text).trim()) {
      matches.push({ full, url: href });
    }
  }
  if (matches.length === 0) return html;

  const uniqueUrls = [...new Set(matches.map((m) => m.url))];
  const entries = await Promise.all(
    uniqueUrls.map(async (url) => [url, await fetchOgData(url)] as const),
  );
  const ogMap = new Map<string, OgData>(entries);

  let result = html;
  for (const match of matches) {
    const og = ogMap.get(match.url) ?? { url: match.url };
    result = result.replace(match.full, renderLinkCard(og));
  }
  return result;
}

function renderLinkCard(og: OgData): string {
  const { url, title, description, image } = og;
  let host = url;
  try {
    host = new URL(url).hostname;
  } catch {
    /* keep raw url as host */
  }

  const safeTitle = title ? escapeHtml(title) : escapeHtml(url);
  const safeDescription = description ? escapeHtml(description) : '';
  const safeUrl = escapeHtml(url);
  const safeHost = escapeHtml(host);
  const safeImage = image ? escapeHtml(image) : '';

  const imageBlock = safeImage
    ? `<div class="link-card-image"><img src="${safeImage}" alt="" loading="lazy" referrerpolicy="no-referrer" /></div>`
    : '';
  const descriptionBlock = safeDescription
    ? `<p class="link-card-description">${safeDescription}</p>`
    : '';

  return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="link-card">${imageBlock}<div class="link-card-body"><p class="link-card-title">${safeTitle}</p>${descriptionBlock}<p class="link-card-url"><span aria-hidden="true">▶ </span>${safeHost}</p></div></a>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
