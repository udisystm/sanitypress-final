import { defineField, defineType } from 'sanity';
import { TfiLayoutCtaCenter } from 'react-icons/tfi';
import { alignmentFieldset } from '../fragments/fields/alignment';

export default defineType({
  name: 'services',
  title: 'Services',
  icon: TfiLayoutCtaCenter,
  type: 'document',
  groups: [
    { name: 'content', default: true },
    { name: 'image', title: 'Images' },
    { name: 'options', title: 'Options' },
  ],
  fieldsets: [alignmentFieldset, { name: 'image', options: { columns: 2 } }],
  fields: [
    defineField({
      name: 'pretitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
      group: 'content',
    }),
    defineField({
      name: 'leftheading',
      type: 'string',
      title: 'Left Heading',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
      group: 'content',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
            {
              name: 'icon',
              type: 'image',
              title: 'Upload Icon (Customizable)',
              options: {
                hotspot: true, // Enables cropping and focal points
              },
            },
            {
              name: 'buttonText',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'buttonLink',
              type: 'url',
              title: 'Button Link',
            },
            {
              name: 'isHeading',
              type: 'boolean',
              title: 'Is this a heading?',
            },
          ],
        },
      ],
      group: 'content',
    }),    
    defineField({
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'image',
    }),
    defineField({
      name: 'bgImageMobile',
      title: 'Background Image (Mobile)',
      type: 'image',
      options: { hotspot: true },
      group: 'image',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-Actions',
      type: 'array',
      of: [{ type: 'cta' }],
      group: 'content',
    }),
  ],
});
