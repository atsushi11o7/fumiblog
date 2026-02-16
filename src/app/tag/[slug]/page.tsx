import { getBlogs, getTags } from '@/libs/microcms';
import { transformMicroCMSArticle } from '@/libs/transformers';
import { ArticleSection } from '@/components/organisms/ArticleSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { MicroCMSArticle } from '@/types/article';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TagPage({ params }: Props) {
  const { slug } = await params;

  const [blogsResponse, tagsResponse] = await Promise.all([
    getBlogs().catch(() => null),
    getTags().catch(() => null),
  ]);

  // slug に一致するタグを検索
  const tag = tagsResponse?.contents.find((t) => t.slug === slug);
  if (!tag) notFound();

  const allArticles = blogsResponse
    ? blogsResponse.contents.map((item) =>
        transformMicroCMSArticle(item as MicroCMSArticle)
      )
    : [];

  // タグslugでフィルタリング
  const filteredArticles = allArticles.filter((article) =>
    article.tags?.some((t) => t.slug === tag.slug)
  );

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/blog"
          className="text-sm text-secondary hover:text-foreground tt no-underline"
        >
          ← ブログ一覧に戻る
        </Link>
        <h1 className="text-[2rem] font-bold text-foreground mt-4">
          #{tag.name}
        </h1>
        <p className="text-sm text-muted mt-1">
          {filteredArticles.length}件の記事
        </p>
      </div>

      {filteredArticles.length > 0 ? (
        <ArticleSection
          title=""
          articles={filteredArticles}
          viewMode="list"
        />
      ) : (
        <p className="text-center py-12 text-secondary">
          記事が見つかりませんでした。
        </p>
      )}
    </div>
  );
}
