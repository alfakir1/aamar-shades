import { groq } from 'next-sanity'

// ── Site Settings ──────────────────────────────────────────────
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName, phone, whatsapp, email, address,
  defaultSeoTitle, defaultSeoDescription,
  logo { asset->{ _id, url } }
}`

// ── Services ───────────────────────────────────────────────────
export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id, title, slug, shortDescription, featured, order,
  coverImage { asset->{ _id, url }, alt }
}`

export const featuredServicesQuery = groq`*[_type == "service" && featured == true] | order(order asc) [0..5] {
  _id, title, slug, shortDescription,
  coverImage { asset->{ _id, url }, alt }
}`

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id, title, slug, shortDescription, content,
  coverImage { asset->{ _id, url }, alt },
  galleryImages[] { asset->{ _id, url }, alt }
}`

export const servicesSlugsQuery = groq`*[_type == "service" && defined(slug.current)][].slug.current`

// ── Gallery ────────────────────────────────────────────────────
export const galleryCategoriesQuery = groq`*[_type == "galleryCategory"] | order(order asc) {
  _id, title, slug
}`

export const galleryItemsQuery = groq`*[_type == "galleryItem"] {
  _id, title,
  category->{ _id, title, slug },
  images[] { asset->{ _id, url }, alt }
}`

export const galleryItemsByCategoryQuery = groq`*[_type == "galleryItem" && category->slug.current == $slug] {
  _id, title,
  images[] { asset->{ _id, url }, alt }
}`

// ── Posts ──────────────────────────────────────────────────────
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, publishedAt,
  coverImage { asset->{ _id, url }, alt }
}`

export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) [0..2] {
  _id, title, slug, excerpt, publishedAt,
  coverImage { asset->{ _id, url }, alt }
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, excerpt, publishedAt, content,
  coverImage { asset->{ _id, url }, alt }
}`

export const postsSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`
