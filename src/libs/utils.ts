/**
 * 日付文字列を ja-JP ロケールでフォーマットする
 * @example formatDate('2024-01-15T00:00:00.000Z') → '2024.01.15'
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');
}
