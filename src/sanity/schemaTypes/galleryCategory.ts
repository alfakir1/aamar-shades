import { defineType, defineField } from 'sanity';

export const galleryCategory = defineType({
    name: 'galleryCategory',
    title: 'Gallery Categories',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Category Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            initialValue: 0,
        }),
    ],
});
