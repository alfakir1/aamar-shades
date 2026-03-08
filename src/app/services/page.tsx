import prisma from '@/lib/prisma'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'خدماتنا',
    description: 'اكتشف مجموعة خدمات عمار للمظلات: مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات.',
}

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { displayOrder: 'asc' },
    })

    return (
        <>
            <section className="bg-primary py-16 md:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">خدماتنا</h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            حلول متكاملة لجميع احتياجات التظليل والهياكل الخارجية، مصممة خصيصاً لكل مشروع.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-background">
                <Container>
                    <SectionHeading
                        title="جميع الخدمات"
                        subtitle="اختر الخدمة التي تحتاجها وسنكون معك في كل خطوة"
                    />
                    {services && services.length > 0 ? (
                        <ServiceGrid services={services} />
                    ) : (
                        <EmptyState
                            title="لا توجد خدمات بعد"
                            description="نحن نعمل حالياً على إضافة خدماتنا المتميزة. ترقبوا التحديث القادم."
                        />
                    )}
                </Container>
            </section>
        </>
    )
}
