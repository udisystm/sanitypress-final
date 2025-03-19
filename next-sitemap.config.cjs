import { client } from "@/sanity/client";
import { groq } from "next-sanity";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.scalemarketer.com";

// GROQ Query to fetch slugs from Sanity
const query = groq`*[_type == "page" && defined(metadata.slug.current)] {
  "slug": metadata.slug.current
}`;

module.exports = async () => {
  // Fetch dynamic pages from Sanity
  const pages = await client.fetch(query);

  // Convert slugs into URLs
  const dynamicPaths = pages.map((page) => ({
    loc: `${siteUrl}/${page.slug === "index" ? "" : page.slug}`,
    lastmod: new Date().toISOString(),
  }));

  return {
    siteUrl,
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ["/admin", "/dashboard"],
    additionalPaths: async () => dynamicPaths, // Add Sanity pages dynamically
  };
};
