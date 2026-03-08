# عمار للمظلات — Aamar Shades Corporate Website

Modern industrial corporate website built with **Next.js 14+ App Router**, **TypeScript**, **Tailwind CSS v4**, and **Prisma ORM** with **PostgreSQL**.

---

## Tech Stack

| Layer        | Technology                           |
|-------------|--------------------------------------|
| Framework   | Next.js 14+ (App Router)             |
| Language    | TypeScript                           |
| Styling     | Tailwind CSS v4                      |
| Database    | PostgreSQL                           |
| ORM         | Prisma ORM                           |
| Font        | Cairo (Arabic + Latin, Google Fonts) |
| Icons       | Lucide React                         |

---

## 🚀 Quick Start (Local Development)

### 1. Database Setup (PostgreSQL)

You will need a local PostgreSQL database running. You can set the connection in `.env`.

Create `.env` based on `.env.example`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/aamar_shades?schema=public"
```

### 2. Install and Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

The `seed` command will populate your database with:
- **Site Settings**: Contact Info, SEO defaults
- **Services**: 6 main services with descriptions and real images
- **Gallery**: Categories and initial gallery items
- **Posts**: 3 starting blog posts

### 3. Database Management Studio

You can view and edit the database records using Prisma Studio:

```bash
npx prisma studio
```
Visit: [http://localhost:5555](http://localhost:5555)

---

## ⚡ ISR / Revalidation

All content pages use ISR (Incremental Static Regeneration).

- **Local Development**: `npm run dev` fetches fresh data dynamically.
- **Production Testing**: To test real ISR behavior (caching + background revalidation):
  1. Build the app: `npm run build && npm run start`.
  2. Change content in the database (e.g., via Prisma Studio).
  3. Refresh the page (it may take a short time to revalidate based on the route's setting, typically 3600s).

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

The website reads all contact info (Phone, WhatsApp, Email, Address) dynamically from the **SiteSettings** table in the PostgreSQL database.
Updating them in the database will reflect across:
- Navbar
- Footer
- Sticky CTA
- Request Form (WhatsApp Link)
