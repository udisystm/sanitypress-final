'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanityClient';
import { urlFor } from '@/sanity/lib/image';
import Img from '../Img';

type NavigationItem = {
	_key: string;
	label: string;
	href: string;
	submenus?: { label: string; href: string }[]; // Add submenus field
};

type HeaderData = {
	logo: Sanity.Image
	ctaButton: {
		href: string;
		label: string;
	};
	navigationItems: NavigationItem[];
};

const Header2 = () => {
	const [headerData, setHeaderData] = useState<HeaderData | null>(null);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const fetchHeaderData = async () => {
			const query = '*[_type == "header2"][0]';
			const data = await sanityClient.fetch(query);
			setHeaderData(data);
		};

		fetchHeaderData();
	}, []);

	if (!headerData) return <div className="h-20 bg-white border-b"></div>; // Placeholder while loading

	return (
		<header className="bg-white border-b px-4 max-md:px-2">
			<div className="container max-w-7xl mx-auto  h-20 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center">
					<Img
						image={headerData.logo}
						alt="Logo"

						className="w-[250px] max-md:w-[220px]"
					/>
				</Link>

				{/* Navigation */}
				<div className="hidden md:flex items-center gap-8">
					<nav className="flex items-center gap-8">
						{headerData.navigationItems.map((item) => (
							<div key={item._key} className="relative group">
								<Link
									href={item.href}
									className="text-gray-600 hover:text-gray-900 transition-colors text-[20px] font-sans"
								>
									{item.label}
								</Link>
								{/* Render submenus */}
								{item.submenus && (
									<div className="absolute left-0 hidden group-hover:block bg-white shadow-md">
										<ul className="space-y-2 p-4">
											{item.submenus.map((submenu, idx) => (
												<li key={idx}>
													<Link
														href={submenu.href}
														className="block text-gray-600 hover:text-gray-900 transition-colors font-sans text-[20px]"
													>
														{submenu.label}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						))}
					</nav>

					<Link
						href={headerData.ctaButton.href}
						className="bg-[#FFB800] hover:bg-[#e5a600] text-black font-medium rounded-md px-4 py-2 transition-colors font-sans text-[20px]"
					>
						{headerData.ctaButton.label}
					</Link>
				</div>

				{/* Mobile menu button */}
				<button
					className="md:hidden text-gray-600 focus:outline-none"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="md:hidden bg-white border-t">
					<nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
						{headerData.navigationItems.map((item) => (
							<div key={item._key} className="relative">
								<Link
									href={item.href}
									className="text-gray-600 hover:text-gray-900 transition-colors text-[16px] font-sans"
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</Link>
								{item.submenus && (
									<div className="mt-2 pl-4">
										{item.submenus.map((submenu, idx) => (
											<Link
												key={idx}
												href={submenu.href}
												className="block text-gray-600 hover:text-gray-900 transition-colors text-[16px] font-sans"
												onClick={() => setMenuOpen(false)}
											>
												{submenu.label}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
						<Link
							href={headerData.ctaButton.href}
							className="font-sans w-fit  inline-flex items-center rounded-md bg-[#febd01] text-[16px] px-6 max-md:px-3 py-1 !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
							onClick={() => setMenuOpen(false)}
						>
							{headerData.ctaButton.label}
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header2;
