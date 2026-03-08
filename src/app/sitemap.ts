import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aamarshades.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [services, posts] = await Promise.all([
        prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.post.findMany({ select: { slug: true, updatedAt: true } }),
    ])

    const static_pages = ['', '/about', '/services', '/gallery', '/request', '/updates'].map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1 : 0.8,
    }))

    const service_pages = services.map((s) => ({
        url: `${BASE_URL}/services/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const post_pages = posts.map((p) => ({
        url: `${BASE_URL}/updates/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...static_pages, ...service_pages, ...post_pages]
}
