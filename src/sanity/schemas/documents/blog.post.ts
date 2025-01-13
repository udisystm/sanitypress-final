import { defineArrayMember, defineField, defineType } from 'sanity';
import { VscEdit } from 'react-icons/vsc';
import imageBlock from '../fragments/image-block';

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	icon: VscEdit,
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'options' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'featuredImage',
			type: 'image',
			title: 'Featured Image',
			description: 'The main image for the blog post.',
			options: {
				hotspot: true, // Allows for cropping
			},
			group: 'content',
		}),
		defineField({
			name: 'body',
			type: 'array',
			of: [
				{ type: 'block' },
				imageBlock,
				defineArrayMember({
					type: 'code',
					options: {
						withFilename: true,
					},
				}),
				{ type: 'custom-html' },
			],
			group: 'content',
		}),
		defineField({
			name: 'categories',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
			group: 'content',
		}),
		defineField({
			name: 'authors',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'person' }],
				},
			],
			group: 'content',
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
			group: 'content',
		}),
		defineField({
			name: 'featured',
			type: 'boolean',
			group: 'options',
			initialValue: false,
		}),
		defineField({
			name: 'hideTableOfContents',
			type: 'boolean',
			group: 'options',
			initialValue: false,
		}),
		defineField({
			name: 'ctaText',
			type: 'string',
			title: 'CTA Button Text',
			group: 'options',
			validation: (Rule) => Rule.required().max(100),
		}),
		defineField({
			name: 'ctaUrl',
			type: 'url',
			title: 'CTA Button URL',
			group: 'options',
			validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
		}),
		defineField({
			name: 'socialLinks',
			type: 'array',
			title: 'Social Links',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'string',
							title: 'Title',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'url',
							type: 'url',
							title: 'URL',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'icon',
							type: 'image',
							title: 'Icon',
							options: {
								hotspot: true, // Enable image cropping
							},
							validation: (Rule) => Rule.required(),
						},
					],
				}),
			],
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'seo',
		}),
	],
	preview: {
		select: {
			featured: 'featured',
			title: 'metadata.title',
			publishDate: 'publishDate',
			slug: 'metadata.slug.current',
			media: 'featuredImage',
		},
		prepare: ({ title, publishDate, slug, media, featured }) => ({
			title: [featured && '★', title].filter(Boolean).join(' '),
			subtitle: [publishDate || 'No date', slug && `/${slug}`]
				.filter(Boolean)
				.join(' — '),
			media,
		}),
	},
	orderings: [
		{
			title: 'Date',
			name: 'date',
			by: [{ field: 'publishDate', direction: 'desc' }],
		},
		{
			title: 'Title',
			name: 'metadata.title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
});
