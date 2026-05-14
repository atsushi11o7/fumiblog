import Image from 'next/image';
import { getBlogBySlug } from '@/libs/microcms';
import { processArticleContent } from '@/libs/article-processor';
import { SourceBadge } from '@/components/atoms/SourceBadge';
import { TagBadge } from '@/components/atoms/TagBadge';
import { TableOfContents } from '@/components/organisms/TableOfContents';
import { formatDate } from '@/libs/utils';
import Link from 'next/link';
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
    <div className="space-y-8">
      {/* アイキャッチ画像（フル幅・記事冒頭） */}
      {article.eyecatch && (
        <div className="relative w-full aspect-2/1 md:aspect-5/2 overflow-hidden rounded-md border border-border">
          <Image
            src={article.eyecatch.url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
      )}

      {/* 戻るリンク */}
      <Link
        href="/blog"
        className="mono inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted hover:text-cat-accent transition-colors no-underline"
      >
        <span aria-hidden="true">◂</span>
        cd /blog
      </Link>

      {/* 記事ヘッダー */}
      <header className="space-y-4 pb-6 border-b border-border">
        {/* メタストリップ */}
        <div className="mono text-[11px] uppercase tracking-widest text-syntax-comment flex flex-wrap items-center gap-3">
          <span className="text-cat-accent" aria-hidden="true">▶</span>
          <SourceBadge source="microcms" categoryName={article.category.name} />
          <span>·</span>
          <time>{formatDate(article.publishDate)}</time>
          {article.updateDate && (
            <>
              <span>·</span>
              <span>updated {formatDate(article.updateDate)}</span>
            </>
          )}
        </div>

        {/* タイトル */}
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-bold leading-tight text-foreground tracking-tight">
          {article.title}
        </h1>

        {/* タグ */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <TagBadge key={tag.slug} label={tag.name} size="medium" />
            ))}
          </div>
        )}
      </header>

      {/* 本文 + サイドバー（2カラム） */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <article className="prose-content" dangerouslySetInnerHTML={{ __html: processedHtml }} />

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
