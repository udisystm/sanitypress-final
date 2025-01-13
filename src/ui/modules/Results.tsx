'use client';

import { urlFor } from '@/sanity/lib/image';

interface CardProps {
	className?: string;
	children: React.ReactNode;
}


function Card({ className = "", children }: CardProps) {
	return <div className={`rounded-xl shadow-sm ${className}`}>{children}</div>;
}

interface StatCardProps {
	label: string;
	value: string;
	description: string;
}

function StatCard({ label, value, description }: StatCardProps) {
	return (
		<Card className="p-8 flex flex-col justify-between h-full bg-white">
			<div className="space-y-2">
				<div className="text-gray-600 font-sans">{label}</div>
				<div className="text-4xl font-bold font-sans text-gray-900">{value}</div>
				<div className="text-gray-600 font-sans">{description}</div>
			</div>
		</Card>
	);
}

function ArrowRightIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14m-7-7 7 7-7 7" />
		</svg>
	);
}

export default function Results({
	heading,
	description,
	cards,
	statCards,
	ctaButton,
	title,
	highlightedCard,
}: Partial<{
	heading: string;
	description: string;
	title: string;
	highlightedCard: {
		titles: string[];
		title: string;
		buttonLabel: string;
		buttonUrl: string;
	};
	cards: {
		titles: string[];
		description?: string;
		logo?: any;
		button?: {
			label: string;
			link: string;
		};
		backgroundColor?: string;
	}[];
	statCards: {
		label: string;
		value: string;
		description: string;
	}[];
	ctaButton: {
		label: string;
		url: string;
	};

}>) {
	return (
		<section className="bg-[#edf9fb] min-h-screen">
			<div className="max-w-5xl mx-auto px-4 py-16">
				{/* Heading Section */}
				<div className="text-center mb-16">
					<h1 className="text-[2.75rem] font-sans font-bold text-gray-900 mb-6 lg:text-[86px] lg:leading-[90px]">
						{heading || 'Exceptional Marketing Results'}
					</h1>
					<p className="max-w-4xl mx-auto font-sans text-lg lg:text-[30px] lg:leading-[40px] text-gray-600 leading-relaxed">
						{description ||
							'We provide industry-leading strategies to boost organic traffic, improve search rankings, and increase revenue.'}
					</p>
				</div>

				{/* Highlighted Card and Main Statistic */}
				<div className="grid lg:grid-cols-5 gap-6 mb-6">
					{/* Highlighted Card */}
					{highlightedCard && (
						<Card className="bg-[#0693e3] text-white p-8 lg:col-span-3 flex flex-col justify-between">
							<div className="space-y-8 flex-grow">
								{/* Display multiple titles */}
								{highlightedCard.titles?.map((title: string, index: number) => (
									<h2 key={index} className="text-5xl font-sans font-bold">{title}</h2>
								))}
								<a
									href={highlightedCard.buttonUrl}
									className="bg-white text-[#0096FF] font-sans hover:bg-gray-100 rounded-full h-12 px-6 text-base font-semibold inline-flex items-center gap-2 transition-colors"
								>
									{highlightedCard.buttonLabel}
									<ArrowRightIcon />
								</a>
							</div>
						</Card>
					)}

					{/* Main Stat Card */}
					{statCards?.[0] && (
						<div className="lg:col-span-2 flex flex-col justify-between">
							<StatCard
								label={statCards[0].label}
								value={statCards[0].value}
								description={statCards[0].description}
							/>
						</div>
					)}
				</div>



				{/* Additional Statistics */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{statCards?.slice(1).map((stat, index) => (
						<StatCard
							key={index}
							label={stat.label}
							value={stat.value}
							description={stat.description}
						/>
					))}
				</div>

				{/* Cards Section */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{cards?.map((card, index) => (
						<Card
							key={index}
							className="p-6 flex flex-col bg-white"
						>
							{card.logo && (
								<img
									src={urlFor(card.logo).url()}
									alt={`${card.titles?.[0]} logo`}
									className="h-[45px] mb-4"
								/>
							)}
							<div className="mb-4">
								{card.titles?.map((title, idx) => (
									<h3 key={idx} className="text-lg font-sans font-semibold mb-2 text-gray-900">
										{title}
									</h3>
								))}
							</div>
							{card.description && <p className="text-gray-600 mb-4">{card.description}</p>}
							{card.button?.label && card.button?.link && (
								<a href={card.button.link} className="text-blue-600 font-sans hover:underline mt-auto">
									{card.button.label}
								</a>
							)}
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
