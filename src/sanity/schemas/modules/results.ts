import { defineField, defineType } from 'sanity';
import { TfiLayoutMediaRight } from 'react-icons/tfi';

export default defineType({
  name: 'results',
  title: 'Results',
  icon: TfiLayoutMediaRight,
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'stats', title: 'Statistics' },
    { name: 'cta', title: 'Call to Action' },
    { name: 'highlighted', title: 'Highlighted Card' }, // New group for Highlighted Card
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
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          title: 'Button Label',
        }),
        defineField({
          name: 'url',
          type: 'url',
          title: 'Button URL',
        }),
      ],
    }),
    defineField({
      name: 'statCards',
      title: 'Stat Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        },
      ],
      group: 'stats',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'titles',
              title: 'Titles',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
            }),
            defineField({
              name: 'button',
              title: 'Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Button Label',
                  type: 'string',
                }),
                defineField({
                  name: 'link',
                  title: 'Button Link',
                  type: 'url',
                }),
              ],
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: '#0096FF' },
                  { title: 'Green', value: '#28A745' },
                  { title: 'Red', value: '#FF5733' },
                ],
              },
            }),
          ],
        },
      ],
      group: 'content',
    }),
    defineField({
			name: 'highlightedCard',
			title: 'Highlighted Card',
			type: 'object',
			group: 'highlighted',
			fields: [
				defineField({
					name: 'titles', // Change to 'titles' to support multiple titles
					type: 'array',
					of: [{ type: 'string' }], // Array of strings
					title: 'Titles',
				}),
				defineField({
					name: 'buttonLabel',
					type: 'string',
					title: 'Button Label',
				}),
				defineField({
					name: 'buttonUrl',
					type: 'url',
					title: 'Button URL',
				}),
			],
		}),
		
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'ctaButton.label',
      media: 'cards[0].logo',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle,
        media: TfiLayoutMediaRight,
      };
    },
  },
});
