import prisma from '@/lib/prisma'
import { GalleryClient } from '@/components/gallery/GalleryClient'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
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
                    <div className="flex flex-col gap-6 mb-8">
                        <p className="text-sm text-muted-foreground">
                            استخدم الفلاتر لعرض المشاريع حسب نوع الخدمة، ثم اضغط على الصورة لتكبيرها ومشاهدة التفاصيل بشكل
                            أوضح.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-dashed border-accent/30 bg-accent/5 px-5 py-4">
                            <p className="text-sm text-muted-foreground">
                                لا تجد ما يناسب موقعك بالضبط؟ أرسل لنا تفاصيل موقعك وسنقترح حلاً مناسبًا.
                            </p>
                            <Link href="/request">
                                <Button variant="outline" size="sm" className="whitespace-nowrap">
                                    اطلب اقتراحًا لموقعك
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <GalleryClient items={items ?? []} categories={categories ?? []} />

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-6 py-5">
                        <p className="text-sm text-muted-foreground">
                            أعجبتك أعمالنا وتريد تنفيذ مشروع مشابه في موقعك؟
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/request">
                                <Button size="sm" className="whitespace-nowrap">
                                    طلب عرض سعر
                                </Button>
                            </Link>
                            <Link href="https://wa.me/966538314660" target="_blank">
                                <Button variant="outline" size="sm" className="whitespace-nowrap">
                                    واتساب مباشر
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
