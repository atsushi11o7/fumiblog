import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

/**
 * 記事のソース（プラットフォーム）
 */
export type ArticleSource = 'microcms' | 'qiita' | 'zenn' | 'note';

/**
 * 記事一覧の表示モード
 */
export type ViewMode = 'grid' | 'list';

/**
 * 記事の共通インターフェース
 */
export interface Article {
  id: string;
  title: string;
  description?: string;
  publishedAt: string;
  category: Category;
  source: ArticleSource;
  tags?: Tag[];
  /** microCMS: `/blog/[slug]` / Qiita・Zenn: 外部URL */
  href: string;
  thumbnail?: string;
}

export type Tag = {
  name: string;
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
};

/**
 * microCMS記事のAPIスキーマ（自分で定義したフィールド）
 */
export interface MicroCMSArticleSchema {
  title: string;
  slug: string;
  publishDate: string;
  updateDate: string;
  /** リッチエディタ（HTML文字列。画像・埋め込み等を含む） */
  content: string;
  eyecatch: MicroCMSImage;
  category: Category;
  tags: Tag[];
}

/**
 * microCMS記事の完全な型（SDKが自動付与するフィールド含む）
 * getList / getListDetail の戻り値はこの型になる
 */
export type MicroCMSArticle = MicroCMSArticleSchema & MicroCMSListContent;
