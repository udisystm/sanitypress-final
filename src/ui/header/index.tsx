import { getSite } from '@/sanity/lib/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Img from '@/ui/Img'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'

export default async function Header() {
	const { title, logo, ctas } = await getSite()

	const logoImage = logo?.image?.dark || logo?.image?.default

	return (
		<Wrapper className="frosted-glass  sticky top-0 z-10 border-b border-ink/10 bg-canvas max-md:header-open:shadow-lg">
			<div
				className={cn(
					css.header,
					'mx-auto grid relative max-w-screen-xl items-center gap-x-6 p-4 flex justify-between', // Flex layout
				)}
			>
				{/* Logo */}
				<div className="flex-shrink-0">
					<Link
						className={cn(
							'h4  md:h3 inline-block',
							logo?.image && 'max-w-[250px]',
						)}
						href="/"
					>
						{logoImage ? (
							<Img
								className="inline-block max-h-[100px] w-[100px]"
								image={logoImage}
								alt={logo?.name || title}
							/>
						) : (
							<span className="text-gradient">{title}</span>
						)}
					</Link>
				</div>

				{/* Navigation and CTA List */}
				<div className="flex items-center max-md:flex-col gap-x-6 ">
					<div className=''>
						<Toggle />
					</div>
					<Navigation />
					<CTAList
						ctas={ctas}
						className="border-none max-md:hidden group font-sans inline-flex items-center rounded-md bg-[#febd01] text-[20px] px-6 max-md:px-1 py-1 !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
					/>
					<div className='hidden max-md:header-open:block'>	<CTAList
						ctas={ctas}
						className="border-none  group font-sans inline-flex items-center rounded-md bg-[#febd01] text-[13px]  px-6 max-md:px-1 py-1 !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
					/></div>
				</div>
			</div>
		</Wrapper>
	)
}