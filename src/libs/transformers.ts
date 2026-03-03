import type { Article, MicroCMSArticle } from '@/types/article';

/**
 * microCMSの記事データを統一されたArticle型に変換
 */
export function transformMicroCMSArticle(data: MicroCMSArticle): Article {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    publishedAt: data.publishDate,
    category: data.category,
    source: 'microcms',
    tags: data.tags ?? [],
    href: `/blog/${data.slug}`,
    thumbnail: data.eyecatch?.url,
  };
}
