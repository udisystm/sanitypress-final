import { defineType, defineField } from 'sanity';

export default {
	name: "module9",
	title: "Module 9",
	type: "document",
	fields: [
		{
			name: "heading",
			title: "Heading",
			type: "string",
			validation: (Rule: { required: () => any; }) => Rule.required(),
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{
			name: "features",
			title: "Features",
			type: "array",
			of: [{ type: "string" }],
			validation: (Rule: { min: (arg0: number) => { (): any; new(): any; required: { (): any; new(): any; }; }; }) => Rule.min(1).required(),
		},
		{
			name: "teamMembers",
			title: "Team Members",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "name",
							title: "Name",
							type: "string",
							validation: (Rule: { required: () => any; }) => Rule.required(),
						},
						{
							name: "position",
							title: "Position",
							type: "string",
						},
						{
							name: "image",
							title: "Image",
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
				},
			],
			validation: (Rule: { min: (arg0: number) => { (): any; new(): any; required: { (): any; new(): any; }; }; }) => Rule.min(1).required(),
		},
		{
			name: "ctaText",
			title: "CTA Button Text",
			type: "string",
			validation: (Rule: { required: () => any; }) => Rule.required(),
		},
		{
			name: "ctaLink",
			title: "CTA Button Link",
			type: "url",
			validation: (Rule: { required: () => any; }) => Rule.required(),
		},
	],
};