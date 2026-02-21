import { fetchQiitaArticles, fetchZennArticles } from '@/libs/external-api';
import { ExternalFeedContent } from './ExternalFeedContent';
import type { ArticleSource } from '@/types/article';

type ExternalSource = Extract<ArticleSource, 'qiita' | 'zenn'>;

const sourceConfig: Record<ExternalSource, {
  label: string;
  color: string;
  fetcher: () => Promise<import('@/types/article').Article[]>;
}> = {
  qiita: {
    label: 'FROM QIITA',
    color: '#55C500',
    fetcher: fetchQiitaArticles,
  },
  zenn: {
    label: 'FROM ZENN',
    color: '#3EA8FF',
    fetcher: fetchZennArticles,
  },
};

interface ExternalFeedSectionProps {
  source: ExternalSource;
  maxArticles?: number;
  viewMoreHref?: string;
}

export async function ExternalFeedSection({
  source,
  maxArticles = 4,
  viewMoreHref,
}: ExternalFeedSectionProps) {
  const { label, color, fetcher } = sourceConfig[source];
  const articles = await fetcher();

  if (articles.length === 0) return null;

  return (
    <ExternalFeedContent
      articles={articles}
      label={label}
      color={color}
      maxArticles={maxArticles}
      viewMoreHref={viewMoreHref}
    />
  );
}
