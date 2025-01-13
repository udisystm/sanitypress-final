import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'module7',
	type: 'document',
	title: 'Module 7',
	fields: [
		defineField({
			name: 'headline',
			type: 'string',
			title: 'Headline',
			validation: (Rule) => Rule.required().error('Headline is required'),
		}),
		defineField({
			name: 'description',
			type: 'string',
			title: 'Description',
			validation: (Rule) => Rule.required().error('Description is required'),
		}),
		defineField({
			name: 'features',
			type: 'array',
			title: 'Features',
			of: [
				defineField({
					type: 'object',
					name: 'feature',
					title: 'Feature',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							title: 'Title',
							validation: (Rule) => Rule.required().error('Feature title is required'),
						}),
						defineField({
							name: 'description',
							type: 'text',
							title: 'Description',
							validation: (Rule) => Rule.required().error('Feature description is required'),
						}),
						defineField({
							name: 'image',
							type: 'image',
							title: 'Image',
							options: {
								hotspot: true,
							},
							validation: (Rule) => Rule.required().error('Feature image is required'),
						}),
					],
				}),
			],
			validation: (Rule) => Rule.min(1).error('At least one feature is required'),
		}),
	],
});
