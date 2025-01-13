'use client';

import { PortableText } from 'next-sanity';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import { urlFor } from '@/sanity/lib/image';
import Pretitle from '@/ui/Pretitle';
import CTAList from '@/ui/CTAList';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from 'react-icons/fa6';

export default function ModuleClients({
	headline,
	description,
	ctaButton,
	cards,
	highlightedCard,
}: Partial<{
	headline: string;
	description: string;
	ctaButton: {
		label: string;
		url: string;
	};
	cards: Array<{
		_id: string;
		name: string;
		company: string;
		image: any;
		watchLink: string;
	}>;
	highlightedCard: {
		titles: string[];
		buttonLabel: string;
		buttonUrl: string;
	};
}>) {
	const sliderRef = useRef<Slider>(null);

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const handlePrev = () => {
		sliderRef.current?.slickPrev();
	};

	const handleNext = () => {
		sliderRef.current?.slickNext();
	};

	return (
		<section className="bg-blue-50/50 py-16 md:py-24">
			<div className="container px-4 md:px-6 mx-auto max-w-7xl">
				{/* Headline and Description */}
				<div className="text-center">
					{headline && (
						<h2 className="text-3xl font-sans lg:text-[86px]  font-bold tracking-tighter sm:text-4xl md:text-5xl">
							{headline}
						</h2>
					)}
					{description && (
						<p className="mx-auto font-sans lg:text-[25px] lg:leading-[35px] max-w-[700px] text-gray-600 md:text-lg/relaxed mt-5">{description}</p>
					)}
				</div>

				{/* Highlighted Card */}
				{highlightedCard && (
					<div className="mt-12 bg-blue-600 text-white p-8 rounded-lg">
						<div className="space-y-4">
							{highlightedCard.titles.map((title, idx) => (
								<h3 key={idx} className="text-2xl font-bold">
									{title}
								</h3>
							))}
							<a
								href={highlightedCard.buttonUrl}
								className="inline-block mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100"
							>
								{highlightedCard.buttonLabel}
							</a>
						</div>
					</div>
				)}

				{/* Cards Slider */}
				{cards?.length && (
					<div className="mt-12 relative max-w-5xl mx-auto">
						{/* Slider Buttons */}
						<button
							onClick={handlePrev}
							className="absolute max-md:hidden top-[45%] -left-10 z-10  w-[40px] h-[40px]  rounded-[50%] flex items-center justify-center shadow-md hover:shadow-lg"
						>
							<FaChevronLeft />
						</button>
						<button
							onClick={handleNext}
							className="absolute max-md:hidden top-[45%] -right-10 z-10  w-[40px] h-[40px]  rounded-[50%] flex items-center justify-center shadow-md hover:shadow-lg"
						>
							<FaChevronRight />
						</button>

						{/* Slider Component */}
						<Slider ref={sliderRef} {...sliderSettings}>
							{cards.map((card, index) => (
								<div key={card._id || `card-${index}`} className="px-4 pb-9">
									<div className="rounded-[20px] border bg-white shadow-lg">
										<div className="relative overflow-hidden rounded-[20px] mb-4">
											{card.image && (
												<img
													src={urlFor(card.image).url()}
													alt={`${card.name} testimonial`}
													className="object-cover w-full h-[250px]"
												/>
											)}
										</div>
										<div className="p-3 -mt-3">
											<h3 className="font-semibold font-sans text-lg">{card.name}</h3>
											<p className="text-sm text-gray-600">{card.company}</p>
											{card.watchLink && (
												<a
													href={card.watchLink}
													className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-700"
												>
													Watch now
												</a>
											)}
										</div>
									</div>
								</div>
							))}
						</Slider>
					</div>
				)}

				{/* CTA Button */}
				{ctaButton && (
					<div className="mt-9 flex justify-center">
						<a
							href={ctaButton.url}
							className="group font-Helvetica inline-flex items-center gap-2 rounded-md bg-[#febd01] text-[20px] px-9 py-2 cursor-pointer   !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
						>
							{ctaButton.label}
						</a>
					</div>
				)}
			</div>
		</section>
	);
}
