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
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Replace `your_project_id_here` with the actual ID from your Sanity dashboard.

### 4. Run Next.js Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 5. Access Sanity Studio

Once `npm run dev` is running, open:

```
http://localhost:3000/studio
```

> First visit will prompt you to log in with your Sanity account.

### 6. Add Content in Sanity Studio

Go to your Studio at `/studio` and add:

- **Site Settings**: Company name, phone, WhatsApp, address
- **Services** (6 default services):
  - مظلات السيارات
  - الهناجر
  - برجولات الحدائق
  - الجلسات الخارجية
  - سواتر الحوش
  - كلادينج الواجهات
- **Gallery Categories + Items**
- **Posts/Updates**

Mark services as **Featured** to show them on the Home page.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx            ← Root layout (Navbar + Footer + StickyCTA)
│   ├── page.tsx              ← Home (Hero, Services, Highlights, CTA, Posts)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── services/[slug]/page.tsx
│   ├── gallery/page.tsx
│   ├── request/page.tsx
│   ├── updates/page.tsx
│   ├── updates/[slug]/page.tsx
│   ├── studio/[[...tool]]/page.tsx  ← Sanity Studio
│   └── sitemap.ts
├── components/
│   ├── layout/   (Navbar, Footer, StickyCTA)
│   ├── ui/       (Button, Card, Container, SectionHeading)
│   ├── services/ (ServiceCard, ServiceGrid)
│   ├── gallery/  (GalleryClient — filtering + lightbox)
│   └── posts/    (PostCard)
├── lib/
│   ├── sanity.client.ts
│   ├── sanity.queries.ts
│   └── utils.ts
└── sanity/
    ├── env.ts
    ├── lib/
    │   ├── client.ts
    │   └── image.ts
    └── schemaTypes/
        ├── siteSettings.ts
        ├── service.ts
        ├── galleryCategory.ts
        ├── galleryItem.ts
        ├── post.ts
        └── index.ts
```

---

## ⚡ ISR / Revalidation

All content pages use ISR with `revalidate = 3600` (1 hour). To test locally:

1. Add/update content in Studio
2. Wait for the revalidation window OR restart dev server
3. In dev mode (`npm run dev`), pages always fetch fresh data automatically

---

## 🏗️ Services Included (from reference structure)

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

## 📞 Contact Placeholders

Update the following in the source before launch:
- Phone: `+966555000000` → in `Navbar.tsx`, `Footer.tsx`, `StickyCTA.tsx`, `request/page.tsx`
- WhatsApp: same number references
- Email: `info@aamarshades.com` → `request/page.tsx`
- Sanity projectId: `.env.local`
