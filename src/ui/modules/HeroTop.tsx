'use client'

import { PortableText } from 'next-sanity'
import Img from '@/ui/Img'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'

export default function HeroTop({
	title,
	content,
	ctas,
	trustBadges,
	graphImage,
}: Partial<{
	title: string
	content: any
	ctas: Sanity.CTA[]  // Define ctas as an array of Sanity.CTA
	trustBadges: Array<{ image: Sanity.Image; alt: string }>
	graphImage: Sanity.Image
}>) {
	return (
		<section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
			<div className="grid gap-12 lg:grid-cols-2">
				<div className="space-y-8 max-md:mt-5">
					<h1 className="text-[52px] leading-[52px] font-[900]  font-sans tracking-tight  md:text-6xl lg:text-[72px]">
						{title}
					</h1>
					<div className="text-muted-foreground max-w-2xl text-lg font-script lg:text-[26px] lg:leading-10">
						<PortableText value={content} />
					</div>
					{ctas && (
						<CTAList
							ctas={ctas}
							style={{
								color: 'black'
							}}
							className="group font-Helvetica font-sen inline-flex items-center gap-2 rounded-md bg-[#febd01] text-[20px] px-6 max-md:px-4  py-1   !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
						/>
					)}

					<div className="flex  items-center  gap-3 w-full">
						{trustBadges?.map((badge, index) => (
							<Img
								key={index}
								image={badge.image}
								alt={badge.alt}
								imageWidth={120}
								className="h-[30px] object-contain "
							/>
						))}
					</div>
				</div>
				<div className="relative">
					{graphImage && (
						<Img
							image={graphImage}
							className=""
						/>
					)}
				</div>
			</div>
		</section>
	)
}
