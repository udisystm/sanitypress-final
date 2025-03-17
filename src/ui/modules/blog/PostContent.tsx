'use client';

import moduleProps from '@/lib/moduleProps';
import Date from '@/ui/Date';
import Categories from './Categories';
import Authors from './Authors';
import ReadTime from './ReadTime';
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents';
import Content from '@/ui/modules/RichtextModule/Content';
import Img from '@/ui/Img';
import { cn } from '@/lib/utils';
import css from './PostContent.module.css';

interface SanityBlogPost {
	metadata: { title: string };
	publishDate?: string;
	categories?: any[];
	authors?: any[];
	hideTableOfContents?: boolean;
	headings?: any[];
	body?: any;
	readTime?: string | number; // Allow both string and number
	value?: string;
	post?: BlogPost;
}
interface BlogPost extends SanityBlogPost {
	ctaText?: string;
	ctaUrl?: string;
	post?: BlogPost;
	featuredImage?: Sanity.Image;
	socialLinks?: Array<{
		title: string;
		url: string;
		icon: Sanity.Image; // Updated to use Sanity.Image
	}>;
}

export default function PostContent({
	post,
	...props
}: { post?: BlogPost } & Sanity.Module) {
	if (!post) return null;

	const showTOC = !post.hideTableOfContents || !!post.headings?.length;

	return (
		<article {...moduleProps(props)}>
			<header className="section space-y-6 text-center">
				{post.featuredImage && (
					<div className="relative h-[500px] overflow-hidden">
						<Img
							image={post.featuredImage}
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/30 flex flex-col z-20 justify-center items-center text-white text-center p-4">
							<h1 className="md:text-[72px] leading-normal text-[36px] font-bold">{post.metadata.title}</h1>
							<div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
								<Date value={post.publishDate as string} />
								<Categories
									className="flex flex-wrap gap-x-2"
									categories={post.categories}
								/>
								<ReadTime value={Number(post.readTime)} />
							</div>

						</div>
					</div>
				)}
				{/* <h1 className="h1 text-balance">{post.metadata.title}</h1> */}
			</header>

			<div
				className={cn(
					'section grid gap-8',
					showTOC && 'lg:grid-cols-[auto,1fr]'
				)}
			>
				{showTOC && (
					<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-none lg:w-[250px]">
						<TableOfContents headings={post.headings} />
						{/* CTA Button Below Table of Contents */}
						{post.ctaText && post.ctaUrl && (
							<div className="mt-6 text-left">
								<a
									href={post.ctaUrl}
									className="inline-flex font-sen items-center gap-2 group font-Helvetica rounded-md bg-[#febd01] text-[20px] px-8 py-3  !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
								>
									{post.ctaText}
								</a>
							</div>
						)}
						{/* Social Share Section */}
						{/* Social Share Section */}
						{post.socialLinks && post.socialLinks.length > 0 && (
							<div className="mt-6">
								{/* Add "Share:" title */}
								<p className="mb-2 text-lg font-semibold">Share:</p>
								<div className="flex gap-4">
									{post.socialLinks.map((link, index) => (
										<a
											key={index}
											href={link.url}
											title={link.title}
											className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300"
											target="_blank"
											rel="noopener noreferrer"
										>
											{/* Render the uploaded icon using Img */}
											<Img
												image={link.icon}
												alt={link.title}
												className="h-full w-full object-contain"
											/>
										</a>
									))}
								</div>
							</div>
						)}

					</aside>
				)}

				<Content
					value={post.body}
					className={cn(css.body, 'grid max-w-screen-md')}
				>
					<hr />
					{post.authors?.length && (
						<div className="mt-4">
							<p className="text-sm font-semibold text-gray-600">
								{post.authors.length > 1 ? "Authors:" : "Posted by:"}
							</p>
							<Authors
								className="flex flex-wrap items-center justify-start gap-3 mt-2"
								authors={post.authors}
							/>
						</div>
					)}

				</Content>
			</div>
		</article>
	);
}
