import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from 'microcms-js-sdk';
import type { MicroCMSArticleSchema, MicroCMSArticle, Category, Tag } from '@/types/article';
import { transformMicroCMSArticle } from '@/libs/transformers';

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
      fields: ['id', 'title', 'slug', 'publishDate', 'description', 'eyecatch', 'category', 'tags', 'isFeatured'],
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

/**
 * トップページ用データ一括取得
 * Featured記事 + 全記事 + カテゴリ + タグを並列取得
 */
export async function getHomePageData() {
  const [featuredRes, blogsRes, categoriesRes, tagsRes] = await Promise.all([
    getBlogs({
      filters: 'isFeatured[equals]true',
      orders: '-publishDate',
      limit: 1,
    }).catch(() => null),
    getBlogs({ limit: 100 }).catch(() => null),
    getCategories().catch(() => null),
    getTags().catch(() => null),
  ]);

  const allArticles = blogsRes
    ? blogsRes.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle)
      )
    : [];

  const featuredFromAPI = featuredRes?.contents[0]
    ? transformMicroCMSArticle(featuredRes.contents[0] as MicroCMSArticle)
    : null;
  const featuredArticle = featuredFromAPI ?? allArticles[0] ?? null;

  const articles = featuredArticle
    ? allArticles.filter((a) => a.id !== featuredArticle.id)
    : allArticles;

  const categories = categoriesRes?.contents ?? [];
  const tags = tagsRes?.contents ?? [];

  return { featuredArticle, articles, categories, tags };
}
