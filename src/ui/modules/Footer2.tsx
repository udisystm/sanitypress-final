'use client';

import { useState } from 'react';

interface NavItem {
	_key: string;
	title: string;
	href?: string;
	children?: NavItem[];
}

interface CompanyItem {
	_key: string;
	title: string;
	href: string;
	phoneNumber?: string;
	email?: string;
}

interface Footer2Props {
	newsletterHeading?: string;
	newsletterDescription?: string;
	subscriptionButtonText?: string;
	services?: NavItem[];
	company?: CompanyItem[];
}

export default function Footer2({
	newsletterHeading,
	newsletterDescription,
	subscriptionButtonText,
	services,
	company,
}: Footer2Props) {
	const [expandedItem, setExpandedItem] = useState<string | null>(null);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	// Toggle function for nested services
	const toggleItem = (key: string) => {
		setExpandedItem((current) => (current === key ? null : key));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ firstName, email, phoneNumber });
	};

	return (
		<footer className="border-t py-12 md:py-16">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="grid max-md:grid-cols-1  grid-cols-2 md:grid-cols-[1fr,1] gap-12">
					{/* Newsletter Subscription */}
					<div >
						<h2 className="text-xl font-sans font-semibold mb-6">{newsletterHeading}</h2>
						<p className="mb-6 font-sans">{newsletterDescription}</p>
						<form onSubmit={handleSubmit} className="space-y-4 md:w-[80%]">
							<input
								type="text"
								placeholder="Your first name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
							<input
								type="email"
								placeholder="Your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
							<input
								type="tel"
								placeholder="Your phone number"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								pattern="^\+?\d{10,15}$"
							/>
							<button
								type="submit"
								className="w-full text-center font-Helvetica flex items-center font-sans gap-2 rounded-sm bg-[#febd01] text-[18px] px-6 max-md:px-4 py-2 !text-black font-Helvetica font-[500] hover:bg-[#ffcd35]"
							>
								{subscriptionButtonText}
							</button>
						</form>
					</div>

					{/* Navigation */}
					<div className="grid md:grid-cols-2 gap-8">
						{/* Services */}

						{/* this is services */}
						<div>
							<h3 className="font-medium text-gray-900 mb-4 font-sans">Services</h3>
							<ul className="space-y-2">
								{services?.map((item) => (
									<li key={item._key}>
										<div>
											{item.children && item.children.length > 0 ? (
												<>
													<button
														onClick={() => toggleItem(item._key)}
														className="flex items-center justify-between w-full text-left hover:text-blue-600 group"
														aria-expanded={expandedItem === item._key}
														aria-controls={`submenu-${item._key}`}
													>
														<span className="text-gray-900 font-sans group-hover:text-blue-600">
															{item.title}
														</span>
														<svg
															className={`w-4 h-4 transition-transform ${expandedItem === item._key ? 'rotate-180' : ''}`}
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
														<ul id={`submenu-${item._key}`} className="ml-4 mt-2 space-y-2">
															{item.children.map((child) => (
																<li key={child._key}>
																	<a href={child.href} className="text-gray-600 font-sans hover:text-blue-600">
																		{child.title}
																	</a>
																</li>
															))}
														</ul>
													)}
												</>
											) : (
												<a href={item.href} className="text-gray-900 font-sans hover:text-blue-600">
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
							<h3 className="font-medium text-gray-900 mb-4 font-sans">Company</h3>
							<ul className="space-y-2">
								{company?.map((item) => (
									<li key={item._key}>
										<a href={item.href} className="text-gray-900 font-sans hover:text-blue-600">
											{item.title}
										</a>
										{item.phoneNumber && (
											<div className="text-gray-600 mt-2">
												<a href={`tel:${item.phoneNumber}`} className="text-gray-600 font-sans hover:text-blue-600">
													Phone: {item.phoneNumber}
												</a>
											</div>
										)}
										{item.email && (
											<div className="text-gray-600 mt-2">
												<a href={`mailto:${item.email}`} className="text-gray-600 font-sans hover:text-blue-600">
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
	);
}
