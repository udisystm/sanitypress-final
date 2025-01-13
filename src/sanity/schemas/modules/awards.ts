import { defineType, defineField } from "sanity";

export default defineType({
  name: "awards",
  title: "Awards",
  type: "document",
  groups: [{ name: "content", default: true }],
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Main Heading",
      group: "content",
    }),
    defineField({
      name: "subheading",
      type: "text",
      title: "Subheading",
      group: "content",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "logo",
              type: "image",
              title: "Award Logo",
              options: { hotspot: true },
            }),
            defineField({
              name: "titles",
              type: "array",
              title: "Award Titles",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            }),
            defineField({
              name: "buttonText",
              type: "string",
              title: "Button Text",
            }),
            defineField({
              name: "buttonLink",
              type: "url",
              title: "Button Link",
            }),
            defineField({
              name: "isHeading",
              type: "boolean",
              title: "Is this a heading?",
            }),
          ],
        },
      ],
      group: "content",
    }),
  ],
});
