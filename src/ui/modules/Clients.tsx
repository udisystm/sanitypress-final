'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { urlFor } from '@/sanity/lib/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';


export default function Clients({ title, description, cards }: any) {
	// Swiper instance and state
	const swiperRef = useRef<any>(null);
	const [swiperInstance, setSwiperInstance] = useState<any>(null);

	useEffect(() => {
		if (swiperRef.current) {
			setSwiperInstance(swiperRef.current.swipe);
		}
	}, [swiperRef]);

	if (!cards || cards.length === 0) return <p>Loading...</p>;

	// Chunk cards into groups of 4
	const chunkedCards = Array.from({ length: Math.ceil(cards.length / 4) }, (_, i) =>
		cards.slice(i * 4, i * 4 + 4)
	);

	return (
		<section className="py-16 md:py-24 max-w-5xl mx-auto">
			<div className="container mx-auto px-4">
				{/* Title and Description */}
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-sans font-[900] tracking-tight sm:text-5xl lg:text-[86px]">{title}</h2>
					<p className="mt-4 text-lg lg:text-[25px] lg:leading-[35px] font-sans text-gray-600">{description}</p>
				</div>

				{/* Swiper component with cards */}
				<div className="relative mt-16">
					<Swiper
						ref={swiperRef}
						spaceBetween={30}
						slidesPerView={1} // Always show one slide at a time
						loop
						autoplay={{ delay: 3000, disableOnInteraction: false }}
					>
						{chunkedCards.map((chunk: any, index: number) => (
							<SwiperSlide key={index}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
									{chunk.map((card: any, cardIndex: number) => (
										<div
											key={cardIndex}
											className="group relative overflow-hidden rounded-[25px] bg-[#fafcff] shadow-md flex gap-3 h-full"
										>
											{/* Image */}
											<div className="relative w-[40%] md:w-[50%] h-full overflow-hidden">
												{card.image?.asset ? (
													<img
														src={urlFor(card.image).url()}
														alt={card.title}
														className="object-cover w-full h-full rounded-r-[25px]"
													/>
												) : (
													<div className="bg-gray-200 w-full h-full flex items-center justify-center">
														<span>No Image</span>
													</div>
												)}
											</div>

											{/* Content */}
											<div className="w-[60%] md:w-[50%] p-4 py-[30px] bg-blue-50/30 flex flex-col justify-between h-full">
												<div>
													<h3 className="text-lg font-bold font-sans">{card.title}</h3>
													<p className="text-gray-600 mt-9 font-sans">{card.description}</p>
												</div>
												<div className="flex items-center gap-3 mt-8">
													{card.authorAvatar?.asset ? (
														<Image
															src={urlFor(card.authorAvatar).url()}
															alt={card.authorName}
															width={40}
															height={40}
															className="rounded-full"
														/>
													) : (
														<div className="w-10 h-10 bg-gray-300 rounded-full"></div>
													)}
													<div>
														<p className="font-medium font-sans">{card.authorName}</p>
														<p className="text-sm text-gray-500 font-sans">{card.authorTitle}</p>
													</div>
												</div>
												<a
													href={card.readMore}
													target="_blank"
													rel="noopener noreferrer"
													className=" text-blue-500 hover:underline mt-5 font-sans"
												>
													Read More
												</a>
											</div>
										</div>
									))}
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Navigation Buttons */}
					<div
						className="absolute z-[1000] top-1/2 -left-14 transform -translate-y-1/2 cursor-pointer hidden md:block"
						onClick={() => swiperInstance?.slidePrev()}
					>
						<button className=" text-black p-2 rounded-full">
							<FaArrowLeft size={25} />
						</button>
					</div>
					<div
						className="absolute z-[1000] top-1/2 -right-14 transform -translate-y-1/2 cursor-pointer hidden md:block"
						onClick={() => swiperInstance?.slideNext()}
					>
						<button className=" text-black p-2 rounded-full font-sans">
							<FaArrowRight size={25} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
