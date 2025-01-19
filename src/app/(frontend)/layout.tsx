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

// Queries for header and footer data
const footerQuery = groq`*[_type == "footer"][0]`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch footer data
  const footerData = await sanityClient.fetch(footerQuery);

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script for Head */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive" // Ensures the script loads early
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5RL6HXL2');`,
          }}
        />
      </head>
      <body className="bg-canvas text-ink">
        {/* Google Tag Manager NoScript for Body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5RL6HXL2"
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
        <Footer2
          services={footerData.services}
          company={footerData.company}
        />
        <VisualEditingControls />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
