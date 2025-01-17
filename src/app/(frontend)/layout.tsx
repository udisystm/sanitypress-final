import SkipToContent from '@/ui/SkipToContent';
import Announcement from '@/ui/Announcement';
import Header from '@/ui/header';
import Footer2 from '@/ui/modules/Footer2'; // Ensure this matches your file structure
import VisualEditingControls from '@/ui/VisualEditingControls';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/app.css';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/lib/sanityClient';
import Header2 from '@/ui/modules/Header2';

// Queries for header and footer data
const footerQuery = groq`*[_type == "footer"][0]`;

export default async function RootLayout({
	children,
}: {
	modules?: Sanity.Module[];
	page?: Sanity.Page;
	post?: Sanity.BlogPost;
	children: React.ReactNode;
}) {
	// Fetch footer and header data
	const footerData = await sanityClient.fetch(footerQuery);


	return (
		<html lang="en">
			<body className="bg-canvas text-ink">
				<SkipToContent />
				<Announcement />
				{/* <Header /> */}
				{/* Pass the fetched header data */}
				<Header2

				/>
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				{/* Pass the fetched footer data */}
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
