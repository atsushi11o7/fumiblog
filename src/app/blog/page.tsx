import { getBlogs } from '@/libs/microcms';
import { fetchRSSFeed } from '@/libs/feed';
import {
  transformMicroCMSArticle,
  transformQiitaArticle,
  transformZennArticle,
} from '@/libs/transformers';
import { BlogContent } from './BlogContent';
import type { MicroCMSArticle } from '@/types/article';

export default async function BlogPage() {
  const [blogsResponse, qiitaArticles, zennArticles] = await Promise.all([
    getBlogs().catch(() => null),
    fetchRSSFeed(process.env.QIITA_RSS_URL, transformQiitaArticle),
    fetchRSSFeed(process.env.ZENN_RSS_URL, transformZennArticle),
  ]);

  const microCMSArticles = blogsResponse
    ? blogsResponse.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle)
      )
    : [];

  const allArticles = [
    ...microCMSArticles,
    ...qiitaArticles,
    ...zennArticles,
  ].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return <BlogContent articles={allArticles} />;
}
