import type { Article, MicroCMSArticle } from '@/types/article';

/**
 * microCMSの記事データを統一されたArticle型に変換
 */
export function transformMicroCMSArticle(data: MicroCMSArticle): Article {
  return {
    id: data.id,
    title: data.title,
    publishedAt: data.publishDate,
    category: [data.category.name],
    source: 'microcms',
    tags: data.tags?.map((tag) => tag.name) || [],
    href: `/blog/${data.slug}`,
    thumbnail: data.eyecatch?.url,
  };
}

/**
 * QiitaのRSSフィードデータをArticle型に変換
 */
export function transformQiitaArticle(item: any): Article {
  return {
    id: item.guid || item.link,
    title: item.title,
    publishedAt: item.isoDate || item.pubDate,
    category: item.categories || ['Qiita'],
    source: 'qiita',
    href: item.link,
  };
}

/**
 * ZennのRSSフィードデータをArticle型に変換
 */
export function transformZennArticle(item: any): Article {
  return {
    id: item.guid || item.link,
    title: item.title,
    publishedAt: item.isoDate || item.pubDate,
    category: item.categories || ['Zenn'],
    source: 'zenn',
    href: item.link,
  };
}
