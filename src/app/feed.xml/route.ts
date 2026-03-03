import { getBlogs } from '@/libs/microcms';
import { siteUrl } from '@/libs/config';

export async function GET() {
  const blogsRes = await getBlogs({ limit: 20, orders: '-publishDate' }).catch(() => null);
  const articles = blogsRes?.contents ?? [];

  const items = articles
    .map((article) => {
      const link = `${siteUrl}/blog/${article.slug}`;
      const pubDate = new Date(article.publishDate).toUTCString();
      const description = article.description
        ? `<description><![CDATA[${article.description}]]></description>`
        : '';
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      ${description}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FumiBlog</title>
    <link>${siteUrl}</link>
    <description>技術と日常の学びを記録しています</description>
    <language>ja</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
