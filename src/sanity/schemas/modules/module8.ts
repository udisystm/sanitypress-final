import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'module8',
	title: 'Module 8',
	type: 'document',
	fields: [
		defineField({
			name: 'heading',
			title: 'Section Heading',
			type: 'string',
			validation: (Rule) => Rule.required().max(100).error('Heading is required and cannot exceed 100 characters'),
		}),
		defineField({
			name: 'description',
			title: 'Section Description',
			type: 'text',
			validation: (Rule) => Rule.required().error('Description is required'),
		}),
		defineField({
			name: 'testimonials',
			title: 'Testimonials',
			type: 'array',
			of: [
				defineField({
					type: 'object',
					title: 'Testimonial',
					fields: [
						defineField({
							name: 'text',
							title: 'Testimonial Text',
							type: 'text',
							validation: (Rule) => Rule.required().error('Testimonial text is required'),
						}),
						defineField({
							name: 'author',
							title: 'Author Details',
							type: 'object',
							fields: [
								defineField({
									name: 'name',
									title: 'Author Name',
									type: 'string',
									validation: (Rule) => Rule.required().error('Author name is required'),
								}),
								defineField({
									name: 'position',
									title: 'Author Position',
									type: 'string',
									validation: (Rule) => Rule.required().error('Author position is required'),
								}),
								defineField({
									name: 'company',
									title: 'Author Company',
									type: 'string',
									validation: (Rule) => Rule.required().error('Author company is required'),
								}),
								defineField({
									name: 'image',
									title: 'Author Image',
									type: 'image',
									options: {
										hotspot: true,
									},
									validation: (Rule) => Rule.required().error('Author image is required'),
								}),
							],
						}),
						defineField({
							name: 'rating',
							title: 'Rating',
							type: 'number',
							validation: (Rule) => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
						}),
					],
					name: ''
				}),
			],
		}),
	],
});
