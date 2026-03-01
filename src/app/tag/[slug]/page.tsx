import { getBlogs, getTags } from '@/libs/microcms';
import { fetchQiitaArticles } from '@/libs/external-api';
import { transformMicroCMSArticle } from '@/libs/transformers';
import { FilteredArticleContent } from '@/components/organisms/FilteredArticleContent';
import { notFound } from 'next/navigation';
import type { MicroCMSArticle } from '@/types/article';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TagPage({ params }: Props) {
  const { slug } = await params;

  const [blogsResponse, tagsResponse, qiitaArticles] = await Promise.all([
    getBlogs().catch(() => null),
    getTags().catch(() => null),
    fetchQiitaArticles().catch(() => []),
  ]);

  const tag = tagsResponse?.contents.find((t) => t.slug === slug);
  if (!tag) notFound();

  const microcmsArticles = blogsResponse
    ? blogsResponse.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle)
      )
    : [];

  const filteredMicrocms = microcmsArticles.filter((article) =>
    article.tags?.some((t) => t.slug.toLowerCase() === tag.slug.toLowerCase())
  );

  const filteredQiita = qiitaArticles.filter((article) =>
    article.tags?.some(
      (t) =>
        t.slug.toLowerCase() === tag.slug.toLowerCase() ||
        t.name.toLowerCase() === tag.name.toLowerCase(),
    )
  );

  const articles = [...filteredMicrocms, ...filteredQiita].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <FilteredArticleContent
      type="tag"
      name={tag.name}
      articles={articles}
    />
  );
}
