import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PhoneCall, MessageCircle, ChevronLeft } from 'lucide-react'
import { safeFetch } from '@/lib/sanity.client'
import { serviceBySlugQuery, servicesSlugsQuery } from '@/lib/sanity.queries'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = await safeFetch<string[]>(servicesSlugsQuery)
    return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const service = await safeFetch<any>(serviceBySlugQuery, { slug })
    if (!service) return { title: 'خدمة غير موجودة' }
    return {
        title: service.title,
        description: service.shortDescription,
        openGraph: {
            title: service.title,
            description: service.shortDescription,
            images: service.coverImage?.asset?.url ? [service.coverImage.asset.url] : [],
        },
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const service = await safeFetch<any>(serviceBySlugQuery, { slug }, { next: { revalidate: 3600 } })

    if (!service) notFound()

    return (
        <>
            {/* Cover */}
            <div className="relative h-64 md:h-[420px] bg-primary overflow-hidden">
                {service.coverImage?.asset?.url ? (
                    <Image
                        src={service.coverImage.asset.url}
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
                            <div>
                                <h2 className="text-xl font-bold text-primary mb-3">نظرة عامة</h2>
                                <p className="text-muted-foreground leading-relaxed text-base">{service.shortDescription}</p>
                            </div>

                            {service.content && (
                                <div className="prose prose-zinc max-w-none text-muted-foreground leading-relaxed">
                                    {/* Portable text rendering placeholder - install @portabletext/react if needed */}
                                    <p className="text-sm text-muted-foreground italic">المحتوى التفصيلي يُعرض هنا من Sanity Portable Text.</p>
                                </div>
                            )}

                            {/* Gallery */}
                            {service.galleryImages && service.galleryImages.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-primary mb-4">معرض الصور</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {service.galleryImages.map((img: { asset: { _id: string; url: string }; alt?: string }, i: number) => (
                                            <div key={img.asset._id} className="relative h-40 rounded-xl overflow-hidden bg-secondary">
                                                <Image
                                                    src={img.asset.url}
                                                    alt={img.alt || `${service.title} - صورة ${i + 1}`}
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
                                    <a href="tel:+966555000000">
                                        <Button className="w-full">
                                            <PhoneCall size={18} />
                                            اتصل الآن
                                        </Button>
                                    </a>
                                    <a href="https://wa.me/966555000000?text=أريد الاستفسار عن خدمة: " target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full">
                                            <MessageCircle size={18} />
                                            واتساب
                                        </Button>
                                    </a>
                                    <Link href="/request">
                                        <Button variant="ghost" className="w-full text-sm">
                                            أو أرسل طلبًا مكتوبًا ←
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
