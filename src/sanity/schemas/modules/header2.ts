import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'header2',
	title: 'Header',
	type: 'document',
	fields: [
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'navigationItems',
			title: 'Navigation Items',
			type: 'array',
			of: [
				defineField({
					name: 'navItem',
					title: 'Nav Item',
					type: 'object',
					fields: [
						defineField({
							name: 'label',
							title: 'Label',
							type: 'string',
						}),
						defineField({
							name: 'href',
							title: 'Link',
							type: 'string',
							validation: (Rule) =>
								Rule.required().regex(
									/^(https?:\/\/|\/)[\w\-.~:?#[\]@!$&'()*+,;=%/]*$/,
									{
										name: 'URL', // Error message prefix
										invert: false, // Does not allow invalid matches
									}
								),
						}),
						defineField({
							name: 'submenus',  // Add a field for submenus
							title: 'Submenus',
							type: 'array',
							of: [
								defineField({
									name: 'submenuItem',
									title: 'Submenu Item',
									type: 'object',
									fields: [
										defineField({
											name: 'label',
											title: 'Label',
											type: 'string',
										}),
										defineField({
											name: 'href',
											title: 'Link',
											type: 'string',
											validation: (Rule) =>
												Rule.required().regex(
													/^(https?:\/\/|\/)[\w\-.~:?#[\]@!$&'()*+,;=%/]*$/,
													{
														name: 'URL', // Error message prefix
														invert: false, // Does not allow invalid matches
													}
												),
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			name: 'ctaButton',
			title: 'CTA Button',
			type: 'object',
			fields: [
				defineField({
					name: 'label',
					title: 'Label',
					type: 'string',
				}),
				defineField({
					name: 'href',
					title: 'Link',
					type: 'string',
					validation: (Rule) =>
						Rule.required().regex(
							/^(https?:\/\/|\/)[\w\-.~:?#[\]@!$&'()*+,;=%/]*$/,
							{
								name: 'URL', // Error message prefix
								invert: false, // Does not allow invalid matches
							}
						),
				}),
			],
		}),
	],
});
