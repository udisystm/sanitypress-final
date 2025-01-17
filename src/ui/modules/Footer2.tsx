'use client'

import { useEffect, useState } from 'react'
import Img from '../Img'
import { sanityClient } from '@/sanity/lib/sanityClient'

interface NavItem {
	_key: string
	title: string
	href?: string
	children?: NavItem[]
	logo?: Sanity.Image
}

interface CompanyItem {
	_key: string
	title: string
	href: string
	phoneNumber?: string
	email?: string
	logo?: Sanity.Image

}

interface Footer2Props {
	logo?: Sanity.Image // Added logoSrc prop
	logoAlt?: string // Added logoAlt prop
	services?: NavItem[]
	company?: CompanyItem[]
}
type FooterData = {
	logo: Sanity.Image
	
};

export default function Footer2({
	logo,
	services,
	company,
}: Footer2Props) {
		const [footerData, setFooterData] = useState<Footer2Props | null>(null);
	
	const [expandedItem, setExpandedItem] = useState<string | null>(null)
useEffect(() => {
		const fetchHeaderData = async () => {
			const query = '*[_type == "footer"][0]';
			const data = await sanityClient.fetch(query);
			setFooterData(data);
		};

		fetchHeaderData();
	}, []);
	// Toggle function for nested services
	const toggleItem = (key: string) => {
		setExpandedItem((current) => (current === key ? null : key))
	}

	return (
		<footer className="border-t py-12 md:py-16">
			<div className="container mx-auto max-w-6xl px-4">
				<div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 md:grid-cols-[1fr,1]">
					{/* Logo Section */}
					<div>
						<Img image={footerData?.logo} alt="logo" className="h-auto w-[300px]" />
					</div>

					{/* Navigation */}
					<div className="grid gap-8 md:grid-cols-2">
						{/* Services */}
						<div>
							<h3 className="mb-4 font-sans font-medium text-gray-900">
								Services
							</h3>
							<ul className="space-y-2">
								{services?.map((item) => (
									<li key={item._key}>
										<div>
											{item.children && item.children.length > 0 ? (
												<>
													<button
														onClick={() => toggleItem(item._key)}
														className="group flex w-full items-center justify-between text-left hover:text-blue-600"
														aria-expanded={expandedItem === item._key}
														aria-controls={`submenu-${item._key}`}
													>
														<span className="font-sans text-gray-900 group-hover:text-blue-600">
															{item.title}
														</span>
														<svg
															className={`h-4 w-4 transition-transform ${
																expandedItem === item._key ? 'rotate-180' : ''
															}`}
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 9l-7 7-7-7"
															/>
														</svg>
													</button>
													{expandedItem === item._key && (
														<ul
															id={`submenu-${item._key}`}
															className="ml-4 mt-2 space-y-2"
														>
															{item.children.map((child) => (
																<li key={child._key}>
																	<a
																		href={child.href}
																		className="font-sans text-gray-600 hover:text-blue-600"
																	>
																		{child.title}
																	</a>
																</li>
															))}
														</ul>
													)}
												</>
											) : (
												<a
													href={item.href}
													className="font-sans text-gray-900 hover:text-blue-600"
												>
													{item.title}
												</a>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Company */}
						<div>
							<h3 className="mb-4 font-sans font-medium text-gray-900">
								Company
							</h3>
							<ul className="space-y-2">
								{company?.map((item) => (
									<li key={item._key}>
										<a
											href={item.href}
											className="font-sans text-gray-900 hover:text-blue-600"
										>
											{item.title}
										</a>
										{item.phoneNumber && (
											<div className="mt-2 text-gray-600">
												<a
													href={`tel:${item.phoneNumber}`}
													className="font-sans text-gray-600 hover:text-blue-600"
												>
													Phone: {item.phoneNumber}
												</a>
											</div>
										)}
										{item.email && (
											<div className="mt-2 text-gray-600">
												<a
													href={`mailto:${item.email}`}
													className="font-sans text-gray-600 hover:text-blue-600"
												>
													Email: {item.email}
												</a>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
