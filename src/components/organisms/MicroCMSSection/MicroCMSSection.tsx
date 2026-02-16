import { getBlogs, getCategories } from '@/libs/microcms';
import { transformMicroCMSArticle } from '@/libs/transformers';
import { MicroCMSContent } from './MicroCMSContent';
import type { MicroCMSArticle } from '@/types/article';

interface MicroCMSSectionProps {
  maxArticles?: number;
  viewMoreHref?: string;
}

export async function MicroCMSSection({
  maxArticles = 4,
  viewMoreHref,
}: MicroCMSSectionProps) {
  const [blogsResponse, categoriesResponse] = await Promise.all([
    getBlogs({ limit: maxArticles }).catch(() => null),
    getCategories().catch(() => null),
  ]);

  const articles = blogsResponse
    ? blogsResponse.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle)
      )
    : [];

  const categories = categoriesResponse?.contents ?? [];

  if (articles.length === 0) return null;

  return (
    <MicroCMSContent
      articles={articles}
      categories={categories}
      maxArticles={maxArticles}
      viewMoreHref={viewMoreHref}
    />
  );
}
