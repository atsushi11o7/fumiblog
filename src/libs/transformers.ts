import type Parser from 'rss-parser';
import type { Article, MicroCMSArticle } from '@/types/article';

/**
 * microCMSの記事データを統一されたArticle型に変換
 */
export function transformMicroCMSArticle(data: MicroCMSArticle): Article {
  return {
    id: data.id,
    title: data.title,
    publishedAt: data.publishDate,
    category: data.category,
    source: 'microcms',
    tags: data.tags ?? [],
    href: `/blog/${data.slug}`,
    thumbnail: data.eyecatch?.url,
  };
}

/**
 * QiitaのRSSフィードデータをArticle型に変換
 */
export function transformQiitaArticle(item: Parser.Item): Article {
  return {
    id: item.guid || item.link || '',
    title: item.title || '',
    publishedAt: item.isoDate || item.pubDate || '',
    category: { name: 'Qiita', slug: 'qiita' },
    source: 'qiita',
    tags: item.categories?.map((cat) => ({ name: cat, slug: cat.toLowerCase() })) ?? [],
    href: item.link || '',
  };
}

/**
 * ZennのRSSフィードデータをArticle型に変換
 */
export function transformZennArticle(item: Parser.Item): Article {
  return {
    id: item.guid || item.link || '',
    title: item.title || '',
    publishedAt: item.isoDate || item.pubDate || '',
    category: { name: 'Zenn', slug: 'zenn' },
    source: 'zenn',
    tags: item.categories?.map((cat) => ({ name: cat, slug: cat.toLowerCase() })) ?? [],
    href: item.link || '',
  };
}
