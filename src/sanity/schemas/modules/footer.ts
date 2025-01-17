import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'footer',
	title: 'Footer',
	type: 'document',
	fields: [
		// Logo Section
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: { hotspot: true },
		}),
		// Services Section
		defineField({
			name: 'services',
			title: 'Services',
			type: 'array',
			of: [
				defineField({
					name: 'serviceItem',
					type: 'object',
					title: 'Service Item',
					fields: [
						defineField({
							name: 'title',
							title: 'Service Title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'href',
							title: 'Service Link',
							type: 'string',
							validation: (Rule) =>
								Rule.required().custom((url) => {
									if (!url) return 'URL is required.';
									const isValid =
										url.startsWith('http://') ||
										url.startsWith('https://') ||
										url.startsWith('/');
									return isValid || 'Must be a valid URL or relative path.';
								}),
						}),
						defineField({
							name: 'children',
							title: 'Sub Services',
							type: 'array',
							of: [
								defineField({
									name: 'subService',
									type: 'object',
									title: 'Sub Service',
									fields: [
										defineField({
											name: 'title',
											title: 'Sub Service Title',
											type: 'string',
											validation: (Rule) => Rule.required(),
										}),
										defineField({
											name: 'href',
											title: 'Sub Service Link',
											type: 'string',
											validation: (Rule) =>
												Rule.required().custom((url) => {
													if (!url) return 'URL is required.';
													const isValid =
														url.startsWith('http://') ||
														url.startsWith('https://') ||
														url.startsWith('/');
													return isValid || 'Must be a valid URL or relative path.';
												}),
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
		// Company Section
		defineField({
			name: 'company',
			title: 'Company',
			type: 'array',
			of: [
				defineField({
					name: 'companyItem',
					type: 'object',
					title: 'Company Item',
					fields: [
						defineField({
							name: 'title',
							title: 'Company Title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'href',
							title: 'Company Link',
							type: 'string',
							validation: (Rule) =>
								Rule.custom((url) => {
									if (!url) return true; // Allow empty values without errors
									const isValid =
										url.startsWith('http://') ||
										url.startsWith('https://') ||
										url.startsWith('/');
									return isValid || 'Must be a valid URL or relative path.';
								}),
						}),
						defineField({
							name: 'phoneNumber',
							title: 'Phone Number',
							type: 'string',
							validation: (Rule) => Rule.regex(/^\+?\d{10,15}$/, {
								name: 'phone number',
								invert: false,
							}),
						}),
						defineField({
							name: 'email',
							title: 'Email Address',
							type: 'string',
							validation: (Rule) => Rule.email(),
						}),
					],
				}),
			],
		}),
	],
});
