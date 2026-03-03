import { getHomePageData } from '@/libs/microcms';
import { FeaturedCard } from '@/components/molecules/FeaturedCard';
import { MicroCMSContent } from '@/components/organisms/MicroCMSSection/MicroCMSContent';
import { ExternalFeedSection } from '@/components/organisms/ExternalFeedSection';
import { CategoryList, type CategoryWithCount } from '@/components/molecules/CategoryList';
import { SidebarTagList } from '@/components/molecules/SidebarTagList';
import { SearchBar } from '@/components/molecules/SearchBar';
import { ProfileCard } from '@/components/molecules/ProfileCard';
import { HeroSection } from '@/components/organisms/HeroSection';
import { BootScreen } from '@/components/organisms/BootScreen';
import { ScrollReveal } from '@/components/atoms/ScrollReveal/ScrollReveal';

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
      <BootScreen />

      <div data-reveal="hero">
        <HeroSection />
      </div>

      <div data-reveal="content" className="space-y-12">
        {featuredArticle && (
          <ScrollReveal>
            <FeaturedCard article={featuredArticle} />
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">
          <main className="min-w-0 space-y-12">
            {articles.length > 0 && (
              <MicroCMSContent
                articles={articles}
                categories={categories}
                maxArticles={4}
                viewMoreHref="/blog"
              />
            )}
            <ExternalFeedSection source="qiita" maxArticles={4} viewMoreHref="/blog" />
          </main>

          <aside className="space-y-6">
            <SearchBar />
            <ProfileCard
              name="Atsushi"
              handle="@atsushi11o7"
              bio="機械学習関連の開発を仕事にしながら、趣味でアプリ制作について勉強しています。"
              avatarSrc="/icon.png"
              links={[
                { label: 'GitHub', href: 'https://github.com/atsushi11o7', icon: 'github' },
                { label: 'X', href: 'https://x.com/atsushi11o7', icon: 'twitter' },
              ]}
            />
            {categoriesWithCount.length > 0 && (
              <CategoryList categories={categoriesWithCount} />
            )}
            {tags.length > 0 && (
              <SidebarTagList tags={tags} />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
