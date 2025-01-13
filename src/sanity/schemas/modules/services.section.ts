import { defineType, defineField } from 'sanity'
import { TfiLayoutGrid2Alt } from 'react-icons/tfi'

export default defineType({
	name: 'servicesSection',
	title: 'Services Section',
	icon: TfiLayoutGrid2Alt,
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Section Title',
		}),
		defineField({
			name: 'description',
			type: 'text',
			title: 'Section Description',
		}),
		defineField({
			name: 'services',
			type: 'array',
			title: 'Services',
			of: [
				defineField({
					name: 'service',
					type: 'object',
					title: 'Service',
					fields: [
						defineField({
							name: 'icon',
							type: 'string', // Stores an SVG or a reference to an icon
							title: 'Service Icon (SVG)',
							description: 'Paste the SVG path here as a string.',
						}),
						defineField({
							name: 'title',
							type: 'string',
							title: 'Service Title',
						}),
						defineField({
							name: 'description',
							type: 'text',
							title: 'Service Description',
						}),
						defineField({
							name: 'link',
							type: 'url',
							title: 'Service Link',
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
})
