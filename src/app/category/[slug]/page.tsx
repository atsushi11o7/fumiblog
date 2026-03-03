import { getBlogs, getCategories } from '@/libs/microcms';
import { transformMicroCMSArticle } from '@/libs/transformers';
import { FilteredArticleContent } from '@/components/organisms/FilteredArticleContent';
import { notFound } from 'next/navigation';
import type { MicroCMSArticle } from '@/types/article';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoriesResponse = await getCategories().catch(() => null);
  const category = categoriesResponse?.contents.find((c) => c.slug === slug);
  if (!category) return { title: 'Not Found' };
  return {
    title: category.name,
    description: `${category.name}カテゴリの記事一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [blogsResponse, categoriesResponse] = await Promise.all([
    getBlogs().catch(() => null),
    getCategories().catch(() => null),
  ]);

  const category = categoriesResponse?.contents.find((c) => c.slug === slug);
  if (!category) notFound();

  const allArticles = blogsResponse
    ? blogsResponse.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle)
      )
    : [];

  const filteredArticles = allArticles.filter(
    (article) => article.category.slug === category.slug
  );

  return (
    <FilteredArticleContent
      type="category"
      name={category.name}
      articles={filteredArticles}
    />
  );
}
