import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'module10',
  title: 'Blogs',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the section (e.g., Helpful Resources)'
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Subheading text below the main heading.'
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Title of the resource card.'
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Image displayed on the resource card.',
              options: {
                hotspot: true
              }
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Date associated with the resource (e.g., publication date).'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'URL that the resource card links to.'
            })
          ],
          name: ''
        })
      ],
      description: 'List of resource cards displayed in the carousel.'
    }),
    defineField({
      name: 'readMoreText',
      title: 'Read More Button Text',
      type: 'string',
      description: 'Text displayed on the read more button.'
    }),
    defineField({
      name: 'readMoreLink',
      title: 'Read More Button Link',
      type: 'string',
      description: 'The link that the "Read More" button will point to.'
    })
  ]
});
