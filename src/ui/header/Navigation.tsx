import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import CTAList from '../CTAList'

export default async function Menu() {
	const { headerMenu, ctas } = await getSite()

	return (
		<nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden md:justify-center">
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return <CTA className="hover:link md:px-3 text-[20px] font-sans" link={item} key={key} />

					case 'link.list':
						return <div><LinkList {...item} key={key} />
							<CTAList
								ctas={ctas}
								className="border-none  group font-sans inline-flex items-center rounded-md bg-[#febd01] text-[20px] px-6 max-md:px-1 py-1 !text-black font-Helvetica font-bold hover:bg-[#ffcd35]"
							/>
						</div>

					default:
						return null
				}
			})}
		</nav>
	)
}
