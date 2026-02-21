import type { Article } from '@/types/article';

/**
 * Qiita API v2 レスポンスの型（必要なフィールドのみ）
 */
interface QiitaItem {
  id: string;
  title: string;
  url: string;
  created_at: string;
  tags: { name: string }[];
}

/**
 * Zenn API レスポンスの型（必要なフィールドのみ）
 */
interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  path: string;
  published_at: string;
}

/**
 * Qiita API v2 から全記事を取得（ページネーション対応）
 * per_page 最大100、最大10ページ(1000件)まで取得
 */
export async function fetchQiitaArticles(
  revalidate: number = 3600,
): Promise<Article[]> {
  const username = process.env.QIITA_USERNAME;
  if (!username) return [];

  try {
    const articles: Article[] = [];
    let page = 1;
    const perPage = 100;

    while (page <= 10) {
      const res = await fetch(
        `https://qiita.com/api/v2/users/${username}/items?page=${page}&per_page=${perPage}`,
        { next: { revalidate } },
      );

      if (!res.ok) break;

      const items: QiitaItem[] = await res.json();
      if (items.length === 0) break;

      for (const item of items) {
        articles.push({
          id: item.id,
          title: item.title,
          publishedAt: item.created_at,
          category: { name: 'Qiita', slug: 'qiita' },
          source: 'qiita',
          tags: item.tags.map((t) => ({ name: t.name, slug: t.name.toLowerCase() })),
          href: item.url,
        });
      }

      if (items.length < perPage) break;
      page++;
    }

    return articles;
  } catch (error) {
    console.error('Failed to fetch Qiita articles:', error);
    return [];
  }
}

/**
 * Zenn API から全記事を取得（ページネーション対応）
 */
export async function fetchZennArticles(
  revalidate: number = 3600,
): Promise<Article[]> {
  const username = process.env.ZENN_USERNAME;
  if (!username) return [];

  try {
    const articles: Article[] = [];
    let nextPage: string | null =
      `https://zenn.dev/api/articles?username=${username}&order=latest&count=100`;

    while (nextPage) {
      const res = await fetch(nextPage, { next: { revalidate } });

      if (!res.ok) break;

      const data: { articles: ZennArticle[]; next_page: string | null } =
        await res.json();

      for (const item of data.articles) {
        articles.push({
          id: String(item.id),
          title: item.title,
          publishedAt: item.published_at,
          category: { name: 'Zenn', slug: 'zenn' },
          source: 'zenn',
          tags: [],
          href: `https://zenn.dev${item.path}`,
        });
      }

      nextPage = data.next_page;
    }

    return articles;
  } catch (error) {
    console.error('Failed to fetch Zenn articles:', error);
    return [];
  }
}
