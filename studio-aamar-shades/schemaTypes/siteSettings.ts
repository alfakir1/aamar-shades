import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp Number',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
        }),
        defineField({
            name: 'defaultSeoTitle',
            title: 'Default SEO Title',
            type: 'string',
        }),
        defineField({
            name: 'defaultSeoDescription',
            title: 'Default SEO Description',
            type: 'text',
        }),
    ],
});
