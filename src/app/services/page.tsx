import prisma from '@/lib/prisma'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { ServiceCard } from '@/components/services/ServiceCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'خدماتنا',
    description:
        'اكتشف مجموعة خدمات عمار للمظلات: مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات.',
}

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { displayOrder: 'asc' },
    })

    const byTitle = (title: string) => services.filter((s) => s.title?.includes(title))

    const shadeServices = [
        ...byTitle('مظلات السيارات'),
        ...byTitle('برجولات الحدائق'),
        ...byTitle('الجلسات الخارجية'),
        ...byTitle('سواتر الحوش'),
    ]

    const structureServices = [...byTitle('الهناجر')]

    const facadeServices = [...byTitle('كلادينج الواجهات')]

    const otherServices = services.filter(
        (s) =>
            !shadeServices.includes(s) &&
            !structureServices.includes(s) &&
            !facadeServices.includes(s),
    )

    const hasAnyService = services && services.length > 0

    const renderGroup = (
        title: string,
        subtitle: string,
        groupServices: typeof services,
    ) => {
        if (!groupServices || groupServices.length === 0) return null

        return (
            <div className="mb-16 last:mb-0">
                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">{title}</h2>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            slug={service.slug}
                            shortDescription={service.shortDescription ?? undefined}
                            imageUrl={service.coverImage ?? undefined}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="bg-primary py-16 md:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">خدماتنا</h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            حلول تظليل خارجي، هياكل ومنشآت معدنية، وواجهات كلادينج مصممة لتناسب مشاريعك السكنية
                            والتجارية.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-background">
                <Container>
                    <SectionHeading
                        title="مجالات خدماتنا"
                        subtitle="اختر المجموعة التي تناسب مشروعك في حلول التظليل، الهياكل، أو واجهات المباني."
                    />

                    {hasAnyService ? (
                        <div className="mt-10 space-y-12">
                            {renderGroup(
                                'حلول التظليل الخارجي',
                                'تظليل مخصص للمداخل، مواقف السيارات، الحدائق، الجلسات، وسواتر الحوش.',
                                shadeServices.length ? shadeServices : services,
                            )}

                            {renderGroup(
                                'حلول الهياكل والمنشآت',
                                'هياكل معدنية متينة للمستودعات والمصانع والمنشآت التجارية.',
                                structureServices,
                            )}

                            {renderGroup(
                                'حلول الواجهات والتشطيبات',
                                'واجهات كلادينج حديثة تحسن مظهر المباني وتحميها من العوامل الخارجية.',
                                facadeServices,
                            )}

                            {renderGroup(
                                'خدمات أخرى',
                                'حلول إضافية يمكن تخصيصها حسب احتياج مشروعك.',
                                otherServices,
                            )}
                        </div>
                    ) : (
                        <EmptyState
                            title="لا توجد خدمات بعد"
                            description="نحن نعمل حالياً على إضافة خدماتنا المتميزة. ترقبوا التحديث القادم."
                        />
                    )}

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-6 py-5">
                        <p className="text-sm text-muted-foreground">
                            تحتاج أكثر من خدمة أو لست متأكدًا أيها الأنسب لموقعك؟
                        </p>
                        <Link href="/request">
                            <Button variant="outline" size="sm" className="whitespace-nowrap">
                                اطلب استشارة للخدمة المناسبة
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    )
}
