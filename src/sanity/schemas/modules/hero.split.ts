import { defineField, defineType } from 'sanity'
import { TfiLayoutMediaLeft } from 'react-icons/tfi'
import { reputationBlock } from '../documents/reputation'
import { getBlockText } from '../../lib/utils'

export default defineType({
	name: 'hero.split',
	title: 'Hero (split)',
	icon: TfiLayoutMediaLeft,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'image' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }, reputationBlock],
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
			name: 'ratingImages',
			title: 'Rating Images',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'src',
							title: 'Image',
							type: 'image',
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: 'link',
							type: 'url',
							title: 'Link',
						}),
						defineField({
							name: 'alt',
							type: 'string',
							title: 'Alt Text',
						}),
					],
				},
			],
			group: 'content',
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
				}),
				defineField({
					name: 'onRight',
					type: 'boolean',
					description: 'Display to the right of the content on desktop',
					initialValue: false,
				}),
				defineField({
					name: 'onBottom',
					type: 'boolean',
					description: 'Display below the content on mobile',
					initialValue: false,
				}),
				defineField({
					name: 'loading',
					type: 'string',
					options: {
						list: ['lazy', 'eager'],
						layout: 'radio',
					},
					initialValue: 'lazy',
				}),
			],
			group: 'image',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'image.asset',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero (split)',
			media,
		}),
	},
})
