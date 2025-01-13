import { defineType, defineField } from 'sanity';
import { TfiLayoutCtaCenter } from 'react-icons/tfi';

export default defineType({
  name: 'clients', // The name of the document type
  title: 'Clients', // Title in the Sanity Studio
  icon: TfiLayoutCtaCenter, // Icon for the document
  type: 'document', // It's a document
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title for this case study section',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Description of the case studies section',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Card Title',
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Card Description',
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Card Image',
              options: { hotspot: true }, // Enables focal point cropping
            }),
            defineField({
              name: 'authorName',
              type: 'string',
              title: 'Author Name',
            }),
            defineField({
              name: 'authorTitle',
              type: 'string',
              title: 'Author Title',
            }),
            defineField({
              name: 'authorAvatar',
              type: 'image',
              title: 'Author Avatar',
              options: { hotspot: true },
            }),
            defineField({
              name: 'metrics',
              type: 'string',
              title: 'Metrics (e.g., 3x ROI)',
            }),
            defineField({
              name: 'readMore',
              type: 'url',
              title: 'Read More Link',
            }),
          ],
          name: ''
        }),
      ],
    }),
  ],
});
