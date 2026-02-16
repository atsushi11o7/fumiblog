import { MicroCMSSection } from '@/components/organisms/MicroCMSSection';
import { RSSFeedSection } from '@/components/organisms/RSSFeedSection';

export default function Home() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-[2rem] mb-4 font-bold text-foreground">
          Welcome to FumiBlog
        </h1>
        <p className="text-base leading-normal text-secondary">
          技術と日常の学びを記録しています
        </p>
      </div>

      <MicroCMSSection maxArticles={4} viewMoreHref="/blog" />

      <RSSFeedSection source="qiita" maxArticles={4} viewMoreHref="/blog" />
    </div>
  );
}
