import { defineType, defineField } from 'sanity';

export const galleryItem = defineType({
    name: 'galleryItem',
    title: 'Gallery Items',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'galleryCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
});
