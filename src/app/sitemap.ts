import type { MetadataRoute } from 'next';
import { getBlogs, getCategories, getTags } from '@/libs/microcms';
import { siteUrl } from '@/libs/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
    getBlogs({ limit: 100 }).catch(() => null),
    getCategories().catch(() => null),
    getTags().catch(() => null),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const blogPages: MetadataRoute.Sitemap = (blogsRes?.contents ?? []).map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = (categoriesRes?.contents ?? []).map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = (tagsRes?.contents ?? []).map((tag) => ({
    url: `${siteUrl}/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...categoryPages, ...tagPages];
}
