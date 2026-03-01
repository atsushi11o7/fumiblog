export interface HeadingItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

/**
 * 記事HTMLからh1/h2/h3を抽出し、id属性を付与して返す
 */
export function processArticleContent(html: string): {
  processedHtml: string;
  headings: HeadingItem[];
} {
  const headings: HeadingItem[] = [];
  let counter = 0;

  const processedHtml = html.replace(
    /<(h[123])([^>]*)>([\s\S]*?)<\/h[123]>/gi,
    (_match, tag: string, attrs: string, content: string) => {
      const level = parseInt(tag[1]) as 1 | 2 | 3;
      const text = content.replace(/<[^>]+>/g, '').trim();
      const id = `heading-${counter++}`;
      // 既存のid属性を除去してから新しいidを付与
      const cleanAttrs = attrs.replace(/\s+id="[^"]*"/gi, '');
      headings.push({ id, text, level });
      return `<${tag}${cleanAttrs} id="${id}">${content}</${tag}>`;
    },
  );

  return { processedHtml, headings };
}
