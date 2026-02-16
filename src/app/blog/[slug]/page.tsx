import { getBlogBySlug } from '@/libs/microcms';
import { SourceBadge } from '@/components/atoms/SourceBadge';
import { TagBadge } from '@/components/atoms/TagBadge';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  const formattedDate = new Date(article.publishDate).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <article className="max-w-3xl mx-auto">
      {/* 戻るリンク */}
      <Link
        href="/blog"
        className="text-sm text-secondary hover:text-foreground tt no-underline"
      >
        ← ブログ一覧に戻る
      </Link>

      {/* ヘッダー */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <SourceBadge source="microcms" categoryName={article.category.name} />
          <span className="text-sm text-muted">{formattedDate}</span>
        </div>

        <h1 className="text-[2rem] font-bold leading-tight text-foreground mb-4">
          {article.title}
        </h1>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <TagBadge key={tag.slug} label={tag.name} size="medium" />
            ))}
          </div>
        )}
      </div>

      {/* アイキャッチ画像 */}
      {article.eyecatch && (
        <img
          src={article.eyecatch.url}
          alt={article.title}
          width={article.eyecatch.width}
          height={article.eyecatch.height}
          className="w-full rounded-xl mb-8"
        />
      )}

      {/* 本文 */}
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
