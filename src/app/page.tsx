import { getHomePageData } from '@/libs/microcms';
import { FeaturedCard } from '@/components/molecules/FeaturedCard';
import { MicroCMSContent } from '@/components/organisms/MicroCMSSection/MicroCMSContent';
import { RSSFeedSection } from '@/components/organisms/RSSFeedSection';
import { CategoryList, type CategoryWithCount } from '@/components/molecules/CategoryList';
import { SidebarTagList } from '@/components/molecules/SidebarTagList';

export default async function Home() {
  const { featuredArticle, articles, categories, tags } =
    await getHomePageData();

  const allArticles = featuredArticle ? [featuredArticle, ...articles] : articles;

  const categoriesWithCount: CategoryWithCount[] = categories.map((cat) => ({
    ...cat,
    count: allArticles.filter((a) => a.category.slug === cat.slug).length,
  }));

  return (
    <div className="space-y-12">
      <section>
        <p className="text-xs tracking-widest text-secondary mb-4">
          ENGINEER — YOKOHAMA
        </p>
        <h1 className="text-5xl font-bold mb-4">A space to share daily learnings</h1>
        <p className="text-base text-secondary">技術と日常の学びを記録しています。</p>
      </section>

      {featuredArticle && <FeaturedCard article={featuredArticle} />}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
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
          {categoriesWithCount.length > 0 && (
            <CategoryList categories={categoriesWithCount} />
          )}
          {tags.length > 0 && (
            <SidebarTagList tags={tags} />
          )}
        </aside>
      </div>
    </div>
  );
}
