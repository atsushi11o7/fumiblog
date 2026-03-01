import type { ArticleSource } from '@/types/article';

/**
 * 各ソース（プラットフォーム）のブランドカラー
 * microcms はテーマカラーを使用するため空オブジェクト
 */
export const SOURCE_COLORS: Record<ArticleSource, React.CSSProperties> = {
  microcms: {},
  qiita: { backgroundColor: '#55C500', color: '#fff' },
  zenn: { backgroundColor: '#3EA8FF', color: '#fff' },
  note: { backgroundColor: '#41C9B4', color: '#fff' },
};
