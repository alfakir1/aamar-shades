import { defineType, defineField } from 'sanity';

export const service = defineType({
    name: 'service',
    title: 'Services',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Service Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Main Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } }
            ]
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured (Show on Home)',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Order (for sorting)',
            type: 'number',
            initialValue: 0,
        }),
    ],
});
