import { MetadataRoute } from 'next'
import { safeFetch } from '@/lib/sanity.client'
import { servicesSlugsQuery, postsSlugsQuery } from '@/lib/sanity.queries'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aamarshades.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [serviceSlugs, postSlugs] = await Promise.all([
        safeFetch<string[]>(servicesSlugsQuery),
        safeFetch<string[]>(postsSlugsQuery),
    ])

    const static_pages = ['', '/about', '/services', '/gallery', '/request', '/updates'].map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1 : 0.8,
    }))

    const service_pages = (serviceSlugs ?? []).map((slug) => ({
        url: `${BASE_URL}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const post_pages = (postSlugs ?? []).map((slug) => ({
        url: `${BASE_URL}/updates/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...static_pages, ...service_pages, ...post_pages]
}
