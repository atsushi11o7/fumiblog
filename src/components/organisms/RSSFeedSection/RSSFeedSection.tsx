import { fetchRSSFeed } from '@/libs/feed';
import { transformQiitaArticle, transformZennArticle } from '@/libs/transformers';
import { RSSFeedContent } from './RSSFeedContent';
import type { ArticleSource } from '@/types/article';

type RSSSource = Extract<ArticleSource, 'qiita' | 'zenn'>;

const sourceConfig: Record<RSSSource, {
  envKey: string;
  label: string;
  color: string;
  transform: typeof transformQiitaArticle;
}> = {
  qiita: {
    envKey: 'QIITA_RSS_URL',
    label: 'FROM QIITA',
    color: '#55C500',
    transform: transformQiitaArticle,
  },
  zenn: {
    envKey: 'ZENN_RSS_URL',
    label: 'FROM ZENN',
    color: '#3EA8FF',
    transform: transformZennArticle,
  },
};

interface RSSFeedSectionProps {
  source: RSSSource;
  maxArticles?: number;
  viewMoreHref?: string;
}

export async function RSSFeedSection({
  source,
  maxArticles = 4,
  viewMoreHref,
}: RSSFeedSectionProps) {
  const { envKey, label, color, transform } = sourceConfig[source];
  const feedUrl = process.env[envKey];
  const articles = await fetchRSSFeed(feedUrl, transform);

  if (articles.length === 0) return null;

  return (
    <RSSFeedContent
      articles={articles}
      label={label}
      color={color}
      maxArticles={maxArticles}
      viewMoreHref={viewMoreHref}
    />
  );
}
