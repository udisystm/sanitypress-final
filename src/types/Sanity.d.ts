import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument<{
			title: string
			logo?: Logo
			announcements?: Announcement[]
			ctas?: CTA[]
			headerMenu?: Navigation
			footerMenu?: Navigation
			social?: Navigation
			copyright?: any
			ogimage?: string
		}>

		type Navigation = SanityDocument<{
			title: string
			items?: (Link | LinkList)[]
		}>

		type Announcement = SanityDocument<{
			content: any
			cta?: Link
			start?: string
			end?: string
		}>

		// pages

		type PageBase = SanityDocument<{
			title?: string
			metadata: Metadata
		}>

		type Page = PageBase & {
			readonly _type: 'page'
			modules?: Module[]
		}

		type BlogPost = PageBase & {
			readonly _type: 'blog.post'
			body: any
			readTime: number
			headings?: { style: string; text: string }[]
			categories: BlogCategory[]
			authors: Person[]
			featured: boolean
			hideTableOfContents: boolean
			publishDate: string
		}

		type BlogCategory = SanityDocument<{
			title: string
		}>

		// miscellaneous

		type Logo = SanityDocument<{
			name: string
			image?: Partial<{
				default: Image
				light: Image
				dark: Image
			}>
		}>

		type Person = SanityDocument<{
			name: string
			image?: Image
		}>

		type Pricing = SanityDocument<{
			title: string
			highlight?: string
			price: {
				base?: number
				strikethrough?: number
				suffix?: string
			}
			ctas?: CTA[]
			content?: any
		}>

		type Reputation = SanityDocument<{
			title?: string
			subtitle?: string
			repo?: string
			limit?: number
			avatars?: Image[]
		}>

		type Testimonial = SanityDocument<{
			content: any
			author?: {
				name: string
				title?: string
				image?: Image
			}
		}>

		// objects

		type CTA = {
			readonly _type?: 'cta'
			_key?: string
			link?: Link
			style?: string
		}

		type BlueButton = {
			readonly _type?: 'blue.button'
			_key?: string
			link?: Link
			style?: string
		}
		type Image = SanityImageObject &
			Partial<{
				alt: string
				loading: 'lazy' | 'eager'
			}>

		type Link = {
			readonly _type: 'link'
			label: string
			type: 'internal' | 'external'
			internal?: Page | BlogPost
			external?: string
			params?: string
		}

		type LinkList = {
			readonly _type: 'link.list'
			link?: Link
			links?: Link[]
		}

		type Metadata = {
			metaTitle: string // ✅ Add this
			metaDescription: string // ✅ Add this
			seo: any
			slug: { current: string }
			title: string
			description: string
			image?: Image
			ogimage?: string
			noIndex: boolean
			nofollowAttributes?: boolean
			openGraph?: {
			  title?: string
			  description?: string
			  url?: string
			  siteName?: string
			  image?: {
				asset?: { url: string }
			  }
			}
			twitter?: {
			  cardType?: string
			  creator?: string
			  site?: string
			  handle?: string
			}
		  }
		  

		type Module<T = string> = {
			_type: T
			_key: string
			uid?: string
		}
	}
}
export interface TrustBadge {
	_key: string
	name: string
	logo: string
	alt: string
}

export interface MetricBar {
	_key: string
	label: string
	value: number
	color: string
}

export interface HeroTop {
	title: string
	description: string
	ctaText: string
	ctaUrl: string
	trustBadges: TrustBadge[]
	metrics: MetricBar[]
}

export interface Services {
	title: string
	description: string
	ctaText: string
	ctaUrl: string
	trustBadges: TrustBadge[]
	metrics: MetricBar[]
	cards: MetricBar[]
}
export interface Awards {
	heading: string
			subheading?: string
			awards?: MetricBar[]
}
export interface Results {
	title: string
	description: string
	ctaText: string
	ctaUrl: string
	trustBadges: TrustBadge[]
	metrics: MetricBar[]
	cards: MetricBar[]
}

export {}
