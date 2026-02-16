import Parser from 'rss-parser';
import type { Article } from '@/types/article';

const parser = new Parser();

export type RSSTransformer = (item: Parser.Item) => Article;

/**
 * RSS feed を取得して Article[] に変換する
 * 取得に失敗した場合は空配列を返す（グレースフルデグラデーション）
 */
export async function fetchRSSFeed(
  url: string | undefined,
  transform: RSSTransformer,
  revalidate: number = 3600,
): Promise<Article[]> {
  if (!url) return [];

  try {
    const response = await fetch(url, {
      next: { revalidate },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const feed = await parser.parseString(xml);

    return feed.items.map(transform);
  } catch (error) {
    console.error(`Failed to fetch RSS feed from ${url}:`, error);
    return [];
  }
}
