import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Only create a real client if we have a valid projectId (a-z, 0-9, dashes only)
const isValidProjectId = !!projectId && /^[a-z0-9-]+$/.test(projectId)

export const client = isValidProjectId
    ? createClient({
        projectId,
        dataset,
        apiVersion: '2024-03-03',
        useCdn: false,
    })
    : null

/**
 * Safe fetch — returns null (or empty array) when no Sanity project is configured.
 * Pages that call this during build/ISR will gracefully render empty states.
 */
export async function safeFetch<T>(
    query: string,
    params: Record<string, unknown> = {},
    options?: { next?: { revalidate?: number } }
): Promise<T | null> {
    if (!client) return null
    return client.fetch<T>(query, params, options)
}
