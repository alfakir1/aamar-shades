import prisma from '@/lib/prisma'
import { GalleryClient } from '@/components/gallery/GalleryClient'
import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'معرض الأعمال',
    description: 'تصفح معرض أعمال عمار للمظلات — مشاريع مظلات، هناجر، برجولات، وسواتر في مختلف مناطق المملكة.',
}

export default async function GalleryPage() {
    const [categories, items] = await Promise.all([
        prisma.galleryCategory.findMany({
            orderBy: { displayOrder: 'asc' },
        }),
        prisma.galleryItem.findMany({
            include: { category: { select: { slug: true, title: true } } },
            orderBy: { createdAt: 'desc' },
        }),
    ])

    return (
        <>
            <section className="bg-primary py-16 md:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">معرض الأعمال</h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            استعرض نماذج من مشاريعنا المنفذة في مختلف مدن المملكة العربية السعودية.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-background">
                <Container>
                    <GalleryClient items={items ?? []} categories={categories ?? []} />
                </Container>
            </section>
        </>
    )
}
