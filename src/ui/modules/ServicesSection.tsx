import { PortableText } from 'next-sanity'

export default function ServicesSection({
	title,
	description,
	services,
}: Partial<{
	title: string
	description: any
	services: Array<{
		icon: string // SVG path string
		title: string
		description: string
		link: string
	}>
}>) {
	return (
		<section className="bg-blue-50 px-4 py-16 md:py-24">
			<div className="container mx-auto">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
						{title}
					</h2>
					<p className="mx-auto max-w-3xl text-lg text-gray-600">
						<PortableText value={description} />
					</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-2">
					{services?.map((service, index) => (
						<div
							key={index}
							className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
						>
							<div
								className="mb-4 h-8 w-8"
								dangerouslySetInnerHTML={{ __html: service.icon }}
							/>
							<h4 className="mb-2 text-xl font-semibold">{service.title}</h4>
							<p className="mb-4 text-gray-600">{service.description}</p>
							<a
								href={service.link}
								className="inline-flex items-center text-blue-600 hover:text-blue-700"
							>
								Read more
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="ml-1 h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
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
					))}
				</div>
			</div>
		</section>
	)
}
