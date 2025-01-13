'use client';

import { useState, useEffect } from 'react';
import { urlFor } from '@/sanity/lib/image';
import Img from '../Img';

interface Category {
	id: string;
	label: string;

}

interface ClientCategory {
	id: string;
	label: string;
	image: Sanity.Image;

}

interface Client {
	name: string;
	logo: Sanity.Image;
	category: ClientCategory[]; // Array of category objects

}

interface Module6Props {
	headline?: string;
	description?: string;
	categories?: Category[]; // Directly fetched categories
	clients?: Client[];

}

export default function Module6({ headline, description, categories: initialCategories = [], clients = [] }: Module6Props) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [activeCategory, setActiveCategory] = useState<string>('all');

	// Initialize categories with "All" as the default
	useEffect(() => {
		setCategories([{ id: 'all', label: 'All' }, ...initialCategories]);
	}, [initialCategories]);

	// Filter clients based on the active category
	const filteredClients = clients.filter(
		(client) =>
			activeCategory === 'all' || client.category.some((cat) => cat.id === activeCategory)
	);

	return (
		<section className="py-16 px-4 md:py-24">
			<div className="container mx-auto max-w-7xl">
				{/* Headline and Description */}
				<div className="text-center mb-12">
					{headline && <h2 className="text-4xl lg:text-[86px] md:text-5xl font-bold mb-4">{headline}</h2>}
					{description && (
						<p className="text-gray-600 max-w-3xl mx-auto lg:text-[25px] lg:leading-[35px]">
							{description}
						</p>
					)}
				</div>

				{/* Category Filter */}
				{categories.length > 0 && (
					<div className="mb-12 overflow-x-auto">
						<div className="flex justify-center min-w-max gap-8 pb-4">
							{categories.map((category) => (
								<button
									key={category.id}
									onClick={() => setActiveCategory(category.id)}
									className={`text-sm font-medium lg:text-[20px] transition-colors hover:text-blue-600 ${activeCategory === category.id ? 'text-blue-600' : 'text-gray-600'
										}`}
								>
									{category.label}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Client Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
					{filteredClients.map((client, index) => (
						<div
							key={index}
							className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
						>
							{client.logo && (
								<Img
									alt={`${client.name} logo`}
									width={160}
									height={80}
									className="max-w-full h-auto object-contain"
									image={client.logo}
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
