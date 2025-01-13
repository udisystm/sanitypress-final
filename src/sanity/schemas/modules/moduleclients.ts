import { defineField, defineType } from 'sanity';
import { TfiLayoutMediaRight } from 'react-icons/tfi';

export default defineType({
  name: 'moduleclients',
  title: 'Module Clients',
  icon: TfiLayoutMediaRight,
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'cta', title: 'Call to Action' },
    { name: 'highlighted', title: 'Highlighted Card' },
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'watchLink',
              title: 'Watch Link',
              type: 'url',
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
          name: 'titles',
          type: 'array',
          of: [{ type: 'string' }],
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
      subtitle: 'description',
      media: 'cards[0].image',
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