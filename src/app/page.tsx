import { getFeaturedAndArticles } from '@/libs/microcms';
import { FeaturedCard } from '@/components/molecules/FeaturedCard';
import { MicroCMSContent } from '@/components/organisms/MicroCMSSection/MicroCMSContent';
import { RSSFeedSection } from '@/components/organisms/RSSFeedSection';

export default async function Home() {
  const { featuredArticle, articles, categories } =
    await getFeaturedAndArticles();

  return (
    <div className="space-y-12">
      {featuredArticle && <FeaturedCard article={featuredArticle} />}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <main className="space-y-12">
          {articles.length > 0 && (
            <MicroCMSContent
              articles={articles}
              categories={categories}
              maxArticles={4}
              viewMoreHref="/blog"
            />
          )}
          <RSSFeedSection source="qiita" maxArticles={4} viewMoreHref="/blog" />
        </main>

        <aside className="space-y-6">
          {/* TODO: Sidebar components (SearchBox, ProfileCard, PopularArticles) */}
        </aside>
      </div>
    </div>
  );
}
