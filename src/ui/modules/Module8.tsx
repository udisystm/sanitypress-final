'use client';

import { useState } from 'react';
import Slider from 'react-slick';
import { urlFor } from '@/sanity/lib/image'; // Import your image URL builder function (assuming it's set up)
import Img from '../Img';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Define types for author and testimonial
interface TestimonialAuthor {
	name: string;
	position: string;
	company: string;
	image?: Sanity.Image; // Assuming the image URL is a string
}

interface Testimonial {
	text: string;
	author: TestimonialAuthor;
	rating: number; // Assuming rating is a number (you can change this based on your needs)
	image?: Sanity.Image; // Assuming the image URL is a string

}

interface TestimonialsSectionProps {
	heading?: string;
	description?: string;
	testimonials?: Testimonial[];
	image?: Sanity.Image; // Assuming the image URL is a string

}

export default function Module8({
	heading,
	description,
	testimonials,

}: TestimonialsSectionProps) {
	const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

	// Slider settings for react-slick
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<section className="py-16 px-4 md:py-24">
			<div className="container mx-auto max-w-6xl">
				{/* Heading and Description */}
				<div className="text-center mb-12">
					{heading && <h2 className="text-[52px] leading-[52px] font-[900]  font-sans tracking-tight  md:text-6xl lg:text-[72px]">{heading}</h2>}
					{description && (
						<p className="text-[20px] font-[400] lg:text-[26px] font-sans mt-4">{description}</p>
					)}
				</div>

				{/* Testimonials Slider */}
				<Slider {...sliderSettings}>
					{testimonials?.map((testimonial, index) => (
						<div key={index} className="p-4">
							<div
								className="border p-6 bg-[#fafafa] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
								onClick={() => setSelectedTestimonial(testimonial)}
							>
								<div className="flex items-center mb-4">
									{[...Array(5)].map((_, i) =>
										i < testimonial.rating ? (
											<FaStar key={i} className="text-yellow-500 w-5 h-5" />
										) : (
											<FaRegStar key={i} className="text-gray-300 w-5 h-5" />
										)
									)}
								</div>
								<p className="text-gray-800 mb-4 font-sans">{testimonial.text}</p>
								<div className="flex items-center">
									{testimonial.author.image && (
										<Img
											alt={testimonial.author.name}
											width={50}
											height={50}
											className="rounded-full"
											image={testimonial.author.image}
										/>
									)}
									<div className="ml-4">
										<h4 className="font-semibold">{testimonial.author.name}</h4>
										<p className="text-sm font-sans text-gray-500">{testimonial.author.position}</p>
										<p className="text-sm text-gray-500 font-sans">{testimonial.author.company}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>

				{/* Selected Testimonial Modal (optional) */}
				{selectedTestimonial && (
					<div className="fixed z-[1000] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
						<div className="bg-white p-8 rounded-lg max-w-xl w-full">
							<h3 className="text-2xl font-semibold mb-4">Selected Testimonials</h3>
							<p className="mb-4">{selectedTestimonial.text}</p>
							<div className="flex items-center">
								{selectedTestimonial.author.image && (
									<Img
										alt={selectedTestimonial.author.name}
										width={50}
										height={50}
										className="rounded-full"
										image={selectedTestimonial.author.image}
									/>
								)}
								<div className="ml-4">
									<h4 className="font-semibold">{selectedTestimonial.author.name}</h4>
									<p className="text-sm text-gray-500">{selectedTestimonial.author.position}</p>
									<p className="text-sm text-gray-500">{selectedTestimonial.author.company}</p>
								</div>
							</div>
							<button
								className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
								onClick={() => setSelectedTestimonial(null)}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
