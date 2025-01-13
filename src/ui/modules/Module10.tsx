'use client';

import React, { useEffect, useState } from 'react';
import Img from '@/ui/Img';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sanityClient } from '@/sanity/lib/sanityClient';

interface Resource {
	title: string;
	image: string;
	date: string;
	link: string;
}

interface HelpfulResourcesProps {
	heading?: string;
	subheading?: string;
	readMoreText?: string;
	readMoreLink?: string;
}

const Arrow = ({
	direction,
	onClick,
}: {
	direction: 'left' | 'right';
	onClick?: () => void;
}) => {
	const positionStyle = direction === 'left' ? 'left-[-50px]' : 'right-[-50px]';
	return (
		<button
			className={`absolute top-1/2 transform max-md:hidden -translate-y-1/2 ${positionStyle} z-10 bg-white rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors`}
			onClick={onClick}
			style={{ width: '40px', height: '40px' }}
			aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2}
				stroke="currentColor"
				className="w-5 h-5 mx-auto"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d={
						direction === 'left'
							? 'M15 19l-7-7 7-7'
							: 'M9 5l7 7-7 7'
					}
				/>
			</svg>
		</button>
	);
};

export default function Module10({
	heading,
	subheading,
	readMoreText,
	readMoreLink,
}: HelpfulResourcesProps) {
	const [resources, setResources] = useState<Resource[]>([]);

	useEffect(() => {
		// Fetch data from Sanity
		const fetchResources = async () => {
			const query = `*[_type == "blog.post"]{
        "title": metadata.title,
        "image": featuredImage.asset->url,
        "date": publishDate,
        "link": metadata.slug.current
      } | order(publishDate desc)`;
			const data = await sanityClient.fetch(query);
			setResources(data.map((item: any) => ({
				...item,
				link: `/${item.link}`, // Build the complete URL
			})));
		};

		fetchResources();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <Arrow direction="right" />,
		prevArrow: <Arrow direction="left" />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-[52px] leading-[55px] font-[900] font-sans tracking-tight md:text-6xl lg:text-[72px]">
						{heading}
					</h2>
					<p className="text-[20px] font-[400] lg:text-[26px] font-sans mt-4">
						{subheading}
					</p>
				</div>

				<Slider {...settings} className="relative max-w-5xl mx-auto">
					{resources.map((resource, index) => (
						<div key={index} className="px-4">
							<a
								href={`/blog${resource.link}`}

								className="block bg-white font-sans rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
							>
								<div className="relative aspect-[16/9]">
									<img
										src={resource.image}
										alt={resource.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-6">
									<h3 className="text-lg font-sans font-semibold mb-2">
										{resource.title}
									</h3>
									{resource.date && (
										<p className="text-sm font-sans text-gray-500">{resource.date}</p>
									)}
								</div>
							</a>
						</div>
					))}
				</Slider>

				<div className="text-center mt-12">
					<a
						href={readMoreLink}
						className="inline-flex font-sans items-center gap-2 group font-Helvetica rounded-md bg-[#febd01] text-[20px] px-8 py-3 !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
					>
						{readMoreText}
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
