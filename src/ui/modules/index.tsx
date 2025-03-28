import AccordionList from './AccordionList'
import BlogFrontpage from './blog/BlogFrontpage'
import BlogList from './blog/BlogList'
import BlogPostContent from './blog/PostContent'
import Breadcrumbs from './Breadcrumbs'
import Callout from './Callout'
import CardList from './CardList'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FlagList from './FlagList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import PricingList from './PricingList'
import RichtextModule from './RichtextModule'
import StatList from './StatList'
import StepList from './StepList'
import TabbedContent from './TabbedContent'
import TestimonialList from './TestimonialList'
import TestimonialFeatured from './TestimonialFeatured'
import HeroTop from './HeroTop'
import ServicesSection from './ServicesSection'
import Services from './Services'
import Awards from './Awards'
import Results from './Results'
import Clients from './Clients'
import ModuleClients from './ModuleClients'
import Module6 from './Module6'
import Module7 from './Module7'
import Module8 from './Module8'
import Module9 from './Module9'
import Module10 from './Module10'
import Footer2 from './Footer2'
import Contact from './Contact'

export default function Modules({
	modules,
	page,
	post,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page
	post?: Sanity.BlogPost
}) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'accordion-list':
						return <AccordionList {...module} key={module._key} />
					case 'blog-frontpage':
						return <BlogFrontpage {...module} key={module._key} />
					case 'blog-list':
						return <BlogList {...module} key={module._key} />
					case 'blog-post-content':
						return <BlogPostContent {...module} post={post} key={module._key} />
					case 'breadcrumbs':
						return (
							<Breadcrumbs
								{...module}
								currentPage={post || page}
								key={module._key}
							/>
						)
					case 'callout':
						return <Callout {...module} key={module._key} />
					case 'card-list':
						return <CardList {...module} key={module._key} />
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />
					case 'flag-list':
						return <FlagList {...module} key={module._key} />
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.split':
						return <HeroSplit {...module} key={module._key} />
					case 'hero.top':
						return <HeroTop {...module} key={module._key} />
					case 'hero.saas':
						return <HeroSaaS {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'pricing-list':
						return <PricingList {...module} key={module._key} />
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />
					case 'stat-list':
						return <StatList {...module} key={module._key} />
					case 'step-list':
						return <StepList {...module} key={module._key} />
					case 'tabbed-content':
						return <TabbedContent {...module} key={module._key} />
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />
					case 'testimonial.featured':
						return <TestimonialFeatured {...module} key={module._key} />
					case 'services.section':
						return <ServicesSection {...module} key={module._key} />
					case 'services':
						return <Services {...module} key={module._key} />
					case 'awards':
						return <Awards {...module} key={module._key} />
					case 'results':
						return <Results {...module} key={module._key} />
					case 'clients':
						return <Clients {...module} key={module._key} />
					case 'moduleclients':
						return <ModuleClients {...module} key={module._key} />
					case 'module6':
						return <Module6 {...module} key={module._key} />
					case 'module7':
						return <Module7  {...module} key={module._key} />
					case 'module8':
						return <Module8 {...module} key={module._key} />
					case 'module9':
						return <Module9   {...module} key={module._key} />
					case 'module10':
						return <Module10    {...module} key={module._key} />
					case 'footer':
						return <Footer2    {...module} key={module._key} />
					case 'contact':
						return <Contact     {...module} key={module._key} />
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
