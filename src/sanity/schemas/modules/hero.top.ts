import { defineField, defineType } from 'sanity'
import { TfiLayoutMediaRight } from 'react-icons/tfi'
export default defineType({
	name: 'hero.top',
	title: 'Hero (Top)',
	icon: TfiLayoutMediaRight,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'images', title: 'Images' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Content',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'trustBadges',
			type: 'array',
			title: 'Trust Badges',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							title: 'Badge Image',
							options: { hotspot: true },
						}),
						defineField({
							name: 'alt',
							type: 'string',
							title: 'Alt Text',
						}),
					],
				},
			],
			group: 'images',
		}),
		defineField({
			name: 'graphImage',
			type: 'image',
			title: 'Graph Image',
			options: { hotspot: true },
			group: 'images',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'cta.text',
			media: 'graphImage',
		},
	},
})
