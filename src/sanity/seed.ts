import { createClient } from '@sanity/client'

// To load environment variables from .env.local, run with:
// npx tsx --env-file=.env.local src/sanity/seed.ts

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-03-03',
    token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false,
})

const IMAGES = {
    carShades: 'https://images.unsplash.com/photo-1590674852885-ce144579d40b?auto=format&fit=crop&q=80&w=1200',
    hangars: 'https://images.unsplash.com/photo-1586528116311-ad86d06177aa?auto=format&fit=crop&q=80&w=1200',
    pergolas: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1200',
    outdoorSeating: 'https://images.unsplash.com/photo-1621293954908-d3bc3744955a?auto=format&fit=crop&q=80&w=1200',
    screens: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1200',
    cladding: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    blog1: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
    blog2: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1200',
    blog3: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
}

async function uploadImage(url: string) {
    try {
        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const asset = await client.assets.upload('image', buffer, {
            filename: url.split('/').pop()?.split('?')[0] || 'image.jpg',
        })
        return asset._id
    } catch (error) {
        console.error(`Failed to upload image ${url}:`, error)
        return null
    }
}

async function seed() {
    if (!process.env.SANITY_AUTH_TOKEN) {
        console.error('SANITY_AUTH_TOKEN is missing in .env.local')
        process.exit(1)
    }

    console.log('--- Starting Seed ---')

    // 1. Site Settings
    console.log('Seeding siteSettings...')
    await client.createOrReplace({
        _id: 'siteSettings',
        _type: 'siteSettings',
        companyName: 'عمار للمظلات',
        phone: '+966555000000',
        whatsapp: '+966555000000',
        email: 'info@aamarshades.com',
        address: 'المملكة العربية السعودية، الرياض',
        defaultSeoTitle: 'عمار للمظلات | رائدون في حلول التظليل والهياكل الحديدية',
        defaultSeoDescription: 'خبراء في تصميم وتركيب المظلات والسواتر والهياكل الخارجية بأعلى معايير الجودة في المملكة العربية السعودية.',
    })

    // 2. Gallery Categories
    console.log('Seeding galleryCategories...')
    const categoriesData = [
        { title: 'مظلات وسواتر', slug: 'shades-screens', order: 1 },
        { title: 'هناجر ومقاولات', slug: 'hangars-contracting', order: 2 },
        { title: 'برجولات وجلسات', slug: 'pergolas-seating', order: 3 },
    ]

    const categories: any = {}
    for (const cat of categoriesData) {
        const doc = await client.createOrReplace({
            _id: `cat-${cat.slug}`,
            _type: 'galleryCategory',
            title: cat.title,
            slug: { _type: 'slug', current: cat.slug },
            order: cat.order,
        })
        categories[cat.slug] = doc._id
    }

    // 3. Services
    console.log('Seeding services...')
    const servicesData = [
        {
            title: 'مظلات السيارات',
            slug: 'car-shades',
            short: 'حماية فائقة لسيارتك من حرارة الشمس والأمطار بتصاميم عصرية.',
            featured: true,
            order: 1,
            imageUrl: IMAGES.carShades,
        },
        {
            title: 'الهناجر',
            slug: 'hangars',
            short: 'تصميم وتنفيذ الهناجر والمستودعات الصناعية بأعلى المعايير.',
            featured: true,
            order: 2,
            imageUrl: IMAGES.hangars,
        },
        {
            title: 'برجولات الحدائق',
            slug: 'pergolas',
            short: 'برجولات خشبية وحديدية تضفي لمسة فخامة على حديقتك.',
            featured: true,
            order: 3,
            imageUrl: IMAGES.pergolas,
        },
        {
            title: 'الجلسات الخارجية',
            slug: 'outdoor-seating',
            short: 'تصميم جلسات خارجية متكاملة للمنازل والاستراحات.',
            featured: false,
            order: 4,
            imageUrl: IMAGES.outdoorSeating,
        },
        {
            title: 'سواتر الحوش',
            slug: 'courtyard-screens',
            short: 'حلول ذكية لتوفير الخصوصية والأمان في محيط منزلك.',
            featured: false,
            order: 5,
            imageUrl: IMAGES.screens,
        },
        {
            title: 'كلادينج الواجهات',
            slug: 'facade-cladding',
            short: 'تغطية واجهات المباني بأحدث تقنيات الكلادينج المقاوم للحريق.',
            featured: false,
            order: 6,
            imageUrl: IMAGES.cladding,
        },
    ]

    for (const s of servicesData) {
        const imageId = await uploadImage(s.imageUrl)
        await client.createOrReplace({
            _id: `service-${s.slug}`,
            _type: 'service',
            title: s.title,
            slug: { _type: 'slug', current: s.slug },
            shortDescription: s.short,
            featured: s.featured,
            order: s.order,
            coverImage: imageId ? { _type: 'image', asset: { _type: 'reference', _ref: imageId } } : undefined,
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: `نحن في عمار للمظلات نقدم خدمة ${s.title} بأعلى جودة.` }],
                    markDefs: [],
                    style: 'normal',
                }
            ]
        })
    }

    // 4. Posts
    console.log('Seeding posts...')
    const postsData = [
        { title: 'أهمية مظلات السيارات في مناخ المملكة', slug: 'importance-of-car-shades', excerpt: 'تعرف على الفوائد التقنية لتركيب المظلات لحماية استثمارك في سيارتك.', imageUrl: IMAGES.blog1 },
        { title: 'كيف تختار تصميم المظلة المناسب لمنزلك؟', slug: 'choosing-right-design', excerpt: 'دليل شامل لاختيار المواد والتصاميم التي تتناسب مع الطراز المعماري لمنزلك.', imageUrl: IMAGES.blog2 },
        { title: 'جديد تقنيات الهناجر والمستودعات لموسم 2026', slug: 'new-hangar-tech-2026', excerpt: 'استكشاف لآخر التطورات في مجال الإنشاءات المعدنية السريعة والمتينة.', imageUrl: IMAGES.blog3 },
    ]

    for (const p of postsData) {
        const imageId = await uploadImage(p.imageUrl)
        await client.createOrReplace({
            _id: `post-${p.slug}`,
            _type: 'post',
            title: p.title,
            slug: { _type: 'slug', current: p.slug },
            excerpt: p.excerpt,
            publishedAt: new Date().toISOString(),
            coverImage: imageId ? { _type: 'image', asset: { _type: 'reference', _ref: imageId } } : undefined,
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'محتوى المقال سيتم تحديثه قريباً بتفاصيل تقنية أكثر.' }],
                    markDefs: [],
                    style: 'normal',
                }
            ]
        })
    }

    // 5. Gallery Items
    console.log('Seeding galleryItems...')
    const galleryData = [
        { title: 'مشروع مظلات الفلل الحديثة', cat: 'shades-screens', img: IMAGES.carShades },
        { title: 'تنفيذ مستودعات كبرى', cat: 'hangars-contracting', img: IMAGES.hangars },
        { title: 'تصميم برجولات ملكية', cat: 'pergolas-seating', img: IMAGES.pergolas },
    ]

    for (const g of galleryData) {
        const imageId = await uploadImage(g.img)
        await client.create({
            _type: 'galleryItem',
            title: g.title,
            category: { _type: 'reference', _ref: categories[g.cat] },
            images: imageId ? [{ _type: 'image', asset: { _type: 'reference', _ref: imageId } }] : [],
        })
    }

    console.log('--- Seed Completed Successfully! ---')
}

seed().catch(console.error)
