import { defineField, defineType } from 'sanity';
import { TfiLayoutMediaRight } from 'react-icons/tfi';

export default defineType({
	name: 'module6',
	title: 'Module 6',
	icon: TfiLayoutMediaRight,
	type: 'document',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'categories', title: 'Categories' },
	],
	fields: [
		defineField({
			name: 'headline',
			type: 'string',
			title: 'Headline',
			group: 'content',
		}),
		defineField({
			name: 'description',
			type: 'text',
			title: 'Description',
			group: 'content',
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			group: 'categories',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'id',
							type: 'string',
							title: 'Category ID',
						}),
						defineField({
							name: 'label',
							type: 'string',
							title: 'Category Label',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'clients',
			title: 'Clients',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							type: 'string',
							title: 'Name',
						}),
						defineField({
							name: 'logo',
							type: 'image',
							title: 'Logo',
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: 'category',
							title: 'Category',
							type: 'array',
							of: [
								{
									type: 'object',
									fields: [
										defineField({
											name: 'id',
											type: 'string',
											title: 'Category ID',
										}),
										defineField({
											name: 'label',
											type: 'string',
											title: 'Category Label',
										}),
									],
								},
							],
						}),
					],
				},
			],
		}),
	],
	preview: {
		select: {
			title: 'headline',
			subtitle: 'description',
			media: 'clients[0].logo',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title,
				subtitle,
				media,
			};
		},
	},
});
