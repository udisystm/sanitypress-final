import Head from 'next/head';
import SkipToContent from '@/ui/SkipToContent';
import Announcement from '@/ui/Announcement';
import Header2 from '@/ui/modules/Header2';
import Footer2 from '@/ui/modules/Footer2';
import VisualEditingControls from '@/ui/VisualEditingControls';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/app.css';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/lib/sanityClient';
import Script from 'next/script';

// Queries for SEO, header, and footer data
const seoQuery = groq`*[_type == "siteSettings"][0]{ seo { metaTitle, metaDescription, canonicalUrl, openGraph, twitter } }`;
const footerQuery = groq`*[_type == "footer"][0]`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch SEO and footer data from Sanity
  const seoData = await sanityClient.fetch(seoQuery);
  const footerData = await sanityClient.fetch(footerQuery);

  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <Head>
          <title>{seoData?.seo?.metaTitle || 'Scale Marketer'}</title>
          <meta name="description" content={seoData?.seo?.metaDescription || 'Default Description'} />
          <link rel="canonical" href={seoData?.seo?.canonicalUrl || 'https://www.scalemarketer.com/'} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={seoData?.seo?.openGraph?.url || 'https://www.scalemarketer.com/'} />
          <meta property="og:title" content={seoData?.seo?.openGraph?.title || seoData?.seo?.metaTitle} />
          <meta property="og:description" content={seoData?.seo?.openGraph?.description || seoData?.seo?.metaDescription} />
          {seoData?.seo?.openGraph?.image?.asset?.url && (
            <meta property="og:image" content={seoData.seo.openGraph.image.asset.url} />
          )}

          {/* Twitter */}
          <meta name="twitter:card" content={seoData?.seo?.twitter?.cardType || 'Scale Marketer'} />
          <meta name="twitter:site" content={seoData?.seo?.twitter?.site || '@scalemarketer'} />
          <meta name="twitter:creator" content={seoData?.seo?.twitter?.creator || '@scalemarketer'} />
        </Head>

        {/* Google Tag Manager Script for Head */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive" // Ensures the script loads early
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N2PZMLHB');`,
          }}
        />
      </head>
      <body className="bg-canvas text-ink">
        {/* Google Tag Manager NoScript for Body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N2PZMLHB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <SkipToContent />
        <Announcement />
        <Header2 />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer2 services={footerData?.services} company={footerData?.company} />
        <VisualEditingControls />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
