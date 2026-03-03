# عمار للمظلات — Aamar Shades Corporate Website

Modern industrial corporate website built with **Next.js 14+ App Router**, **TypeScript**, **Tailwind CSS v4**, and **Sanity CMS**.

---

## Tech Stack

| Layer        | Technology                           |
|-------------|--------------------------------------|
| Framework   | Next.js 14+ (App Router)             |
| Language    | TypeScript                           |
| Styling     | Tailwind CSS v4                      |
| CMS         | Sanity v3 (Studio embedded at /studio) |
| Font        | Cairo (Arabic + Latin, Google Fonts)  |
| Icons       | Lucide React                         |

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Sanity Project

If you haven't created a Sanity project yet:

```bash
npx sanity@latest init --env
```

Or go to [sanity.io/manage](https://sanity.io/manage), create a project, and get your **Project ID**.

### 3. Configure Environment Variables

Create or edit `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id_here"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_AUTH_TOKEN="your_write_token_here"
```

1. Replace `your_project_id_here` with the actual ID from your Sanity dashboard.
2. Replace `your_write_token_here` with a Sanity token that has **write** access (needed for seeding).

### 4. Seed Sanity Content (Recommended)

To populate the website immediately with professional Arabic content and high-quality images:

```bash
# Ensure you have tsx installed (or use npx)
npx tsx src/sanity/seed.ts
```

This will create:
- **Site Settings**: Contact Info, SEO defaults
- **Services**: 6 main services with descriptions and images
- **Gallery**: Categories and initial items
- **Posts**: 3 starting blog posts

### 5. Run Next.js Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 6. CORS Requirements

If you encounter issues with Sanity Studio or fetching data, Ensure your Sanity project allows the following origin:
- `http://localhost:3000`

Go to [sanity.io/manage](https://sanity.io/manage) > Settings > API > CORS origins to add it.

---

## ⚡ ISR / Revalidation

All content pages use ISR (Incremental Static Regeneration).

- **Local Development**: `npm run dev` fetches fresh data on every request.
- **Production Testing**: To test real ISR behavior (caching + background revalidation):
  1. Set `revalidate = 60` in relevant routes (currently 60s for testing).
  2. Run `npm build && npm start`.
  3. Change content in Sanity.
  4. Refresh the page (it may take two refreshes to see the update after 1 min).

---

## 🏗️ Services Included

| Arabic                | English Equivalent         |
|-----------------------|---------------------------|
| مظلات السيارات         | Car Shades                |
| الهناجر               | Industrial Hangars        |
| برجولات الحدائق        | Garden Pergolas           |
| الجلسات الخارجية       | Outdoor Seating           |
| سواتر الحوش           | Courtyard Privacy Screens |
| كلادينج الواجهات       | Facade Cladding           |

---

## 🔧 Production Build

```bash
npm run build
npm run start
```

---

## 📞 Single Source of Truth

The website reads all contact info (Phone, WhatsApp, Email, Address) from **Sanity Site Settings**.
Updating them in the CMS will reflect across:
- Navbar
- Footer
- Sticky CTA
- Request Form (WhatsApp Link)
