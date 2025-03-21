import { client } from "@/sanity/client"; // Import your Sanity client
import { groq } from "next-sanity";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic"; // Ensure this runs on every request

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.scalemarketer.com";

// GROQ Query to fetch all pages and blog posts with correct slugs
const query = groq`
  {
    "pages": *[_type == "page" && defined(metadata.slug.current)] {
      "slug": metadata.slug.current,
      _updatedAt
    },
    "blogPosts": *[_type == "blog.post" && defined(metadata.slug.current)] {
      "slug": metadata.slug.current,
      _updatedAt
    }
  }
`;

export default async function GET(): Promise<MetadataRoute.Sitemap> {
  // Fetch pages & blog posts from Sanity
  const { pages, blogPosts } = await client.fetch<{
    pages: { slug: string; _updatedAt: string }[];
    blogPosts: { slug: string; _updatedAt: string }[];
  }>(query);

  // Debugging: Check what blog slugs are being fetched
  console.log("Fetched blog slugs:", blogPosts.map((post) => post.slug));

  // Generate URLs for pages and blog posts
  const sitemapUrls: MetadataRoute.Sitemap = [
    ...pages.map((page) => ({
      url: `${siteUrl}${page.slug === "index" ? "" : `/${page.slug}`}`,
      lastModified: new Date(page._updatedAt).toISOString(),
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt).toISOString(),
    })),
  ];

  return sitemapUrls;
}
