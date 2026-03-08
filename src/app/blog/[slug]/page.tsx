import Image from 'next/image';
import { getBlogBySlug } from '@/libs/microcms';
import { processArticleContent } from '@/libs/article-processor';
import { SourceBadge } from '@/components/atoms/SourceBadge';
import { TagBadge } from '@/components/atoms/TagBadge';
import { TableOfContents } from '@/components/organisms/TableOfContents';
import { formatDate } from '@/libs/utils';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getBlogBySlug(slug);
    return {
      title: article.title,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        images: article.eyecatch ? [{ url: article.eyecatch.url }] : [],
      },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  const { processedHtml, headings } = processArticleContent(article.content);

  return (
    <div className="space-y-4">
      {/* 戻るリンク（カード外） */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground tt no-underline"
      >
        <ChevronLeft size={14} />
        ブログ一覧に戻る
      </Link>

      {/* 記事ヘッダー */}
      <div className="space-y-4 py-4">
        {/* タイトル */}
        <h1 className="text-[1.75rem] md:text-[2rem] font-bold leading-tight text-foreground">
          {article.title}
        </h1>

        {/* カテゴリ・日付・更新日時 */}
        <div className="flex flex-wrap items-center gap-4">
          <SourceBadge source="microcms" categoryName={article.category.name} />
          <span className="text-sm text-muted">{formatDate(article.publishDate)}</span>
          {article.updateDate && (
            <span className="text-sm text-muted border border-border rounded px-2 py-0.5">
              更新: {formatDate(article.updateDate)}
            </span>
          )}
        </div>

        {/* タグ */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <TagBadge key={tag.slug} label={tag.name} size="medium" />
            ))}
          </div>
        )}
      </div>

      {/* 本文 + サイドバー（2カラム） */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <article>
          {/* アイキャッチ画像 */}
          {article.eyecatch && (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
              <Image
                src={article.eyecatch.url}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 764px"
                priority
              />
            </div>
          )}

          {/* 本文 */}
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </article>

        {/* サイドバー */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
