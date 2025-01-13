'use client';

import Image from 'next/image';
import Img from '../Img';

interface TeamMember {
	name: string;
	position: string;
	image: Sanity.Image;
}

interface RevenueGrowthCTAProps {
	heading?: string;
	description?: string;
	features?: string[];
	teamMembers?: TeamMember[];
	ctaText?: string;
	ctaLink?: string;
	image?: Sanity.Image
}

export default function Module9({
	heading,
	description,
	features,
	teamMembers,
	ctaText,
	ctaLink,
}: RevenueGrowthCTAProps) {
	return (
		<section className="bg-blue-50/50 py-16 md:py-24">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Left Side */}
					<div className="space-y-8">
						<h2 className="text-[52px] leading-[55px] font-[900]  font-sans tracking-tight  md:text-6xl lg:text-[72px]">{heading}</h2>
						{description && <p className="text-[20px] font-[400] lg:text-[26px] font-sans mt-4">{description}</p>}
						<ul className="space-y-4">
							{features?.map((feature, index) => (
								<li key={index} className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-blue-500 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span className="text-gray-700 font-sans">{feature}</span>
								</li>
							))}
						</ul>
						<a
							href={ctaLink}
							className="group font-Helvetica  font-sans inline-flex items-center gap-2 rounded-md bg-[#febd01] text-[20px] px-6 py-3   !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ctaText}
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

					{/* Right Side */}
					<div className="grid grid-cols-2 gap-6">
						{teamMembers?.map((member, index) => (
							<div
								key={index}
								className="bg-white rounded-2xl  shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="aspect-square relative mb-4 overflow-hidden rounded-xl">
									<Img
										image={member.image}
										alt={member.name}
										className="object-cover w-full h-full"
									/>
								</div>
								<div className='p-4 pt-0'>
									<h3 className="font-semibold font-sans text-gray-900">{member.name}</h3>
									<p className="text-sm font-sans text-gray-500">{member.position}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
