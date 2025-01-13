'use client';

import Image from 'next/image';
import Img from '../Img';

interface Feature {
	title: string;
	description: string;
	image: Sanity.Image;
}

interface FeaturesSectionProps {
	headline?: string;
	description?: string;
	features?: Feature[];
}

export default function Module7({ headline, description, features }: FeaturesSectionProps) {
	return (
		<section className="bg-blue-50/50 py-16 md:py-24">
			<div className="container mx-auto px-4 max-w-5xl">
				<div className="text-center mb-16">
					{headline && <h2 className="text-4xl lg:text-[86px] md:text-5xl font-bold mb-4">{headline}</h2>}
					{description && <p className="text-gray-600 max-w-2xl mx-auto lg:text-[25px]">{description}</p>}
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					{features?.map((feature, index) => (
						<div
							key={index}
							className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row"
						>
							<div className="md:w-2/5 relative">
								<div className="aspect-[4/3] md:aspect-auto md:h-full">
									<Img
										alt={feature.title}
										width={400}
										height={400}
										className="object-cover w-full h-full" image={feature.image} />
								</div>
							</div>
							<div className="md:w-3/5 p-6 flex flex-col justify-center">
								<h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
								<p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
