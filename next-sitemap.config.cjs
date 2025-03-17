/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.scalemarketer.com',
    generateRobotsTxt: true, // Generates robots.txt file
    sitemapSize: 5000, // Optional: limits entries per sitemap file
  };
  