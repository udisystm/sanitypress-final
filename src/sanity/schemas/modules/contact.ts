import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'contact',
	title: 'Contact Page',
	type: 'document',
	fields: [
		defineField({
			name: 'subheadline',
			title: 'Subheadline',
			type: 'string',
			validation: (Rule) =>
				Rule.required().error('Subheadline is required'),
		}),
		defineField({
			name: 'headline',
			title: 'Headline',
			type: 'string',
			validation: (Rule) =>
				Rule.required()
					.max(100)
					.error('Headline is required and cannot exceed 100 characters'),
		}),
		defineField({
			name: 'features',
			title: 'Features',
			type: 'array',
			of: [
				defineField({
					name: 'feature',
					type: 'object',
					title: 'Feature',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: (Rule) =>
								Rule.required().error('Feature title is required'),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							validation: (Rule) =>
								Rule.required().error('Feature description is required'),
						}),
					],
				}),
			],
			validation: (Rule) =>
				Rule.required().min(1).error('At least one feature is required'),
		}),
		defineField({
			name: 'formFields',
			title: 'Form Fields',
			type: 'array',
			of: [
				defineField({
					name: 'formField',
					type: 'object',
					title: 'Form Field',
					fields: [
						defineField({
							name: 'name',
							title: 'Field Name',
							type: 'string',
							validation: (Rule) =>
								Rule.required().error('Field name is required'),
						}),
						defineField({
							name: 'label',
							title: 'Field Label',
							type: 'string',
							validation: (Rule) =>
								Rule.required().error('Field label is required'),
						}),
						defineField({
							name: 'type',
							title: 'Field Type',
							type: 'string',
							options: {
								list: ['text', 'email', 'tel', 'textarea'],
							},
							validation: (Rule) =>
								Rule.required().error('Field type is required'),
						}),
					],
				}),
			],
		}),
		defineField({
			name: 'buttonText',
			title: 'Button Text',
			type: 'string',
			validation: (Rule) =>
				Rule.required()
					.max(50)
					.error('Button text is required and cannot exceed 50 characters'),
		}),
		defineField({
			name: 'poweredByText',
			title: 'Powered By Text',
			type: 'string',
			initialValue: 'Powered by Typeform',
			validation: (Rule) =>
				Rule.required().error('Powered By text is required'),
		}),
	],
});
