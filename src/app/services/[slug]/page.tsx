import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PhoneCall, MessageCircle, ChevronLeft } from 'lucide-react'
import prisma from '@/lib/prisma'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const services = await prisma.service.findMany({ select: { slug: true } })
    return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const service = await prisma.service.findUnique({ where: { slug } })
    if (!service) return { title: 'خدمة غير موجودة' }
    return {
        title: service.title,
        description: service.shortDescription ?? undefined,
        openGraph: {
            title: service.title,
            description: service.shortDescription ?? undefined,
            images: service.coverImage ? [service.coverImage] : [],
        },
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const service = await prisma.service.findUnique({
        where: { slug },
        include: { images: { orderBy: { displayOrder: 'asc' } } },
    })

    if (!service) notFound()

    const settings = await prisma.siteSettings.findFirst()
    const phone = settings?.phone || '+966538314660'
    const whatsapp = settings?.whatsapp || phone
    const siteUrl = 'https://aamar-shades.com'

    return (
        <>
            {/* Cover */}
            <div className="relative h-64 md:h-[420px] bg-primary overflow-hidden">
                {service.coverImage ? (
                    <Image
                        src={service.coverImage}
                        alt={service.title}
                        fill
                        className="object-cover opacity-60"
                        sizes="100vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-b from-primary to-zinc-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <Container className="relative z-10 h-full flex flex-col justify-end pb-10">
                    <nav className="flex items-center gap-2 text-white/50 text-sm mb-4">
                        <Link href="/" className="hover:text-white">الرئيسية</Link>
                        <ChevronLeft size={14} className="rotate-180" />
                        <Link href="/services" className="hover:text-white">الخدمات</Link>
                        <ChevronLeft size={14} className="rotate-180" />
                        <span className="text-white">{service.title}</span>
                    </nav>
                    <h1 className="text-3xl md:text-5xl font-bold text-white">{service.title}</h1>
                </Container>
            </div>

            <section className="py-16 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main */}
                        <div className="lg:col-span-2 space-y-8">
                            {service.shortDescription && (
                                <div>
                                    <h2 className="text-xl font-bold text-primary mb-3">نظرة عامة</h2>
                                    <p className="text-muted-foreground leading-relaxed text-base">{service.shortDescription}</p>
                                </div>
                            )}

                            {service.description && (
                                <div>
                                    <h2 className="text-xl font-bold text-primary mb-3">تفاصيل الخدمة</h2>
                                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {service.description}
                                    </div>
                                </div>
                            )}

                            {/* Gallery */}
                            {service.images && service.images.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-primary mb-4">معرض الصور</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {service.images.map((img, i) => (
                                            <div key={img.id} className="relative h-40 rounded-xl overflow-hidden bg-secondary">
                                                <Image
                                                    src={img.imageUrl}
                                                    alt={img.altText || `${service.title} - صورة ${i + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar CTA */}
                        <div className="space-y-6">
                            <div className="bg-secondary rounded-2xl p-6 border border-border sticky top-24">
                                <h3 className="font-bold text-primary text-lg mb-2">هل أنت مهتم بهذه الخدمة؟</h3>
                                <p className="text-muted-foreground text-sm mb-6">تواصل معنا الآن للحصول على استشارة مجانية وتسعيرة دقيقة.</p>
                                <div className="flex flex-col gap-3">
                                    <a href={`tel:${phone}`}>
                                        <Button className="w-full">
                                            <PhoneCall size={18} />
                                            اتصل الآن
                                        </Button>
                                    </a>
                                    <a href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`أريد الاستفسار عن خدمة: ${service.title}%0A%0Aرابط الخدمة: ${siteUrl}/services/${service.slug}${service.coverImage ? `%0Aصورة الغلاف: ${siteUrl}${service.coverImage}` : ''}`)}`} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full">
                                            <MessageCircle size={18} />
                                            واتساب
                                        </Button>
                                    </a>
                                    <Link href="/request">
                                        <Button variant="ghost" className="w-full text-sm">
                                            أو أرسل طلب عرض سعر مكتوبًا ←
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Bottom CTA */}
            <section className="pb-16 bg-background">
                <Container>
                    <div className="mt-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-primary mb-1">
                                هل هذه الخدمة هي ما تبحث عنه لموقعك؟
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                أرسل لنا تفاصيل موقعك لنقترح لك أفضل طريقة لتنفيذ {service.title} مع تقدير تكلفة ومدة التنفيذ.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/request">
                                <Button size="sm" className="whitespace-nowrap">
                                    طلب عرض سعر لهذه الخدمة
                                </Button>
                            </Link>
                            <a
                                href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(
                                    `أريد الاستفسار عن خدمة: ${service.title}`,
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="sm" className="whitespace-nowrap">
                                    <MessageCircle size={16} />
                                    واتساب مباشر
                                </Button>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
