import type { Metadata } from 'next';
import { getBlogs } from '@/libs/microcms';
import { fetchQiitaArticles, fetchZennArticles } from '@/libs/external-api';
import { transformMicroCMSArticle } from '@/libs/transformers';
import { BlogContent } from '@/components/organisms/BlogContent';
import type { MicroCMSArticle } from '@/types/article';

export const metadata: Metadata = {
  title: 'Blog',
  description: '技術と日常の学びをまとめた記事一覧です。',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const query = q?.trim() ?? '';
  const initialPage = Math.max(1, parseInt(page ?? '1', 10));

  const [blogsResponse, qiitaArticles, zennArticles] = await Promise.all([
    getBlogs({ limit: 100 }).catch(() => null),
    fetchQiitaArticles(),
    fetchZennArticles(),
  ]);

  const microCMSArticles = blogsResponse
    ? blogsResponse.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle),
      )
    : [];

  const allArticles = [
    ...microCMSArticles,
    ...qiitaArticles,
    ...zennArticles,
  ].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return <BlogContent articles={allArticles} initialQuery={query} initialPage={initialPage} />;
}
