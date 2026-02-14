import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from 'microcms-js-sdk';
import type { MicroCMSArticleSchema, Category, Tag } from '@/types/article';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
  retry: true,
});

/**
 * ブログ記事一覧を取得（カード表示用。contentを除外して軽量化）
 */
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return client.getList<Omit<MicroCMSArticleSchema, 'content' | 'updateDate'>>({
    endpoint: 'blogs',
    queries: {
      fields: ['id', 'title', 'slug', 'publishDate', 'eyecatch', 'category', 'tags'],
      ...queries,
    },
  });
};

/**
 * ブログ記事の詳細を取得（slug指定）
 */
export const getBlogBySlug = async (slug: string, queries?: MicroCMSQueries) => {
  const response = await client.getList<MicroCMSArticleSchema>({
    endpoint: 'blogs',
    queries: {
      filters: `slug[equals]${slug}`,
      ...queries,
    },
  });

  if (response.contents.length === 0) {
    throw new Error(`Blog with slug "${slug}" not found`);
  }

  return response.contents[0];
};

/**
 * カテゴリー一覧を取得
 */
export const getCategories = async (queries?: MicroCMSQueries) => {
  return client.getList<Category>({
    endpoint: 'categories',
    queries,
  });
};

/**
 * タグ一覧を取得
 */
export const getTags = async (queries?: MicroCMSQueries) => {
  return client.getList<Tag>({
    endpoint: 'tags',
    queries,
  });
};
