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

const SERVICE_HIGHIGHTS: Record<string, { heroSubtitle: string; benefits: string[]; useCases: string[] }> = {
    'car-shades': {
        heroSubtitle: 'حماية متكاملة للمركبات من الشمس والأتربة والعوامل الجوية.',
        benefits: [
            'خفض درجة حرارة السيارة وتجنب تلف الطلاء.',
            'زيادة عمر الإطارات والزجاج المقاوم للأشعة.',
            'نظام تثبيت آمن مقاوم للرياح والعواصف.',
        ],
        useCases: [
            'مواقف المنازل الخاصة.',
            'مواقف المولات التجارية.',
            'مواقف الشركات والمرافق الحكومية.',
        ],
    },
    'hangars': {
        heroSubtitle: 'هناجر قوية للمشروعات الصناعية والتخزين التجاري.',
        benefits: [
            'هياكل فولاذية مجلفنة تتحمل الضغوط الجوية.',
            'عزل حراري وصوتي حسب الطلب.',
            'تصاميم قابلة للتوسيع وفق متطلبات الموقع.',
        ],
        useCases: [
            'مستودعات التخزين.',
            'ورش ومصانع الإنتاج.',
            'محطات توزيع وأماكن لوجستية.',
        ],
    },
    'pergolas': {
        heroSubtitle: 'برجولات أنيقة تعزّز جمالية الحدائق والأسطح الخارجية.',
        benefits: [
            'تصميمات متناسقة مع الطابع المعماري للموقع.',
            'مواد مقاومة للرطوبة والتآكل.',
            'تنفيذ سريع مع لمسات ديكورية محترفة.',
        ],
        useCases: [
            'حدائق المنازل.',
            'أسطح الفلل والقصور.',
            'أماكن الجلسات المفتوحة في المشاريع السكنية.',
        ],
    },
    'outdoor-seating': {
        heroSubtitle: 'جلسات خارجية مريحة تتيح الاستمتاع بالهواء الطلق بأمان وأناقة.',
        benefits: [
            'تصميمات وظيفية لأقصى درجات الراحة.',
            'خيارات مقاومة للعوامل الجوية.',
            'تنسيق مع الإضاءة والأرضيات الخارجية.',
        ],
        useCases: [
            'جلسات ساحات المنازل.',
            'مساحات القهوة والمطاعم.',
            'حدائق الفنادق والمجمعات التجارية.',
        ],
    },
    'privacy-screens': {
        heroSubtitle: 'سواتر حماية أنيقة تعزز الخصوصية وتقي من الغبار والرياح.',
        benefits: [
            'توفير خصوصية فورية للمساحات الخارجية.',
            'خيارات تصميم متنوعة تناسب الواجهات.',
            'مواد متينة وسهلة الصيانة.',
        ],
        useCases: [
            'أسوار الفلل والأحواش.',
            'فواصل بين المساحات الخارجية.',
            'مواقف السيارات والممرات الجانبية.',
        ],
    },
    'sandwich-panel': {
        heroSubtitle: 'ساندوتش بانل للمنشآت يوفّر عزلًا حراريًا وصناعيًا قويًا.',
        benefits: [
            'عزل حراري وصوتي عالي الكفاءة.',
            'تركيب سريع واقتصادي.',
            'ملائم للمباني الصناعية والتجارية.',
        ],
        useCases: [
            'جدران المستودعات.',
            'المنشآت الصناعية.',
            'أقسام التبريد والمستودعات.',
        ],
    },
    'facade-cladding': {
        heroSubtitle: 'كلادينج واجهات يمنح المباني مظهرًا عصريًا ومتينًا.',
        benefits: [
            'تحسين المظهر الخارجي للمبنى.',
            'حماية من العوامل الجوية.',
            'مواد سهلة التنظيف والصيانة.',
        ],
        useCases: [
            'واجهات المباني التجارية.',
            'الواجهات السكنية الحديثة.',
            'مداخل الشركات والفنادق.',
        ],
    },
    tents: {
        heroSubtitle: 'خيام ثابتة ومتنقلة للمخيمات والفلل والمناسبات الخاصة.',
        benefits: [
            'تصاميم ملكية وعصرية مقاومة للرياح.',
            'سهولة التركيب والنقل.',
            'خيارات متنوعة للأحجام والألوان.',
        ],
        useCases: [
            'مخيمات الصحراء.',
            'فلل ومنازل فاخرة.',
            'فعاليات ومناسبات خارجية.',
        ],
    },
    'roof-tiles': {
        heroSubtitle: 'قرميد إيطالي وأسباني ووطني بألوان متنوعة للأسقف.',
        benefits: [
            'متانة عالية ومقاومة للعوامل الجوية.',
            'ألوان وأشكال متنوعة.',
            'سهولة التركيب والصيانة.',
        ],
        useCases: [
            'أسقف المنازل السكنية.',
            'مباني تجارية وصناعية.',
            'فلل وقصور فاخرة.',
        ],
    },
    'pyramid-shades': {
        heroSubtitle: 'مظلات مسابح هرمية لحماية من الشمس والغبار.',
        benefits: [
            'حماية كاملة من أشعة الشمس والغبار.',
            'تصميم هرمي أنيق.',
            'مواد مقاومة للماء والرطوبة.',
        ],
        useCases: [
            'مسابح المنازل.',
            'مسابح الفنادق.',
            'منتجعات سياحية.',
        ],
    },
    'movable-shades': {
        heroSubtitle: 'مظلات متحركة للأسطح والحدائق مع نظام تحكم كهربائي.',
        benefits: [
            'نظام تحكم كهربائي سهل.',
            'توفير الطاقة والتحكم في الظل.',
            'تصميم عصري ومتين.',
        ],
        useCases: [
            'أسطح المنازل.',
            'حدائق المطاعم.',
            'مناطق الجلسات الخارجية.',
        ],
    },
    'wooden-screens': {
        heroSubtitle: 'سواتر خشبية طبيعية لإضافة خصوصية وجمال للحدائق.',
        benefits: [
            'مظهر طبيعي أنيق.',
            'خصوصية عالية.',
            'مقاومة للعوامل الجوية.',
        ],
        useCases: [
            'حدائق المنازل.',
            'ممرات خارجية.',
            'فواصل بصرية.',
        ],
    },
    'fabric-screens': {
        heroSubtitle: 'سواتر قماشية أوروبية مقاومة للرياح والأمطار.',
        benefits: [
            'خامات أوروبية عالية الجودة.',
            'مقاومة للرياح والأمطار.',
            'سهولة التركيب والصيانة.',
        ],
        useCases: [
            'أحواش المنازل.',
            'حدائق عامة.',
            'مواقف سيارات.',
        ],
    },
    'iron-screens': {
        heroSubtitle: 'سواتر حديد صناعة سعودية متينة ومقاومة للصدأ.',
        benefits: [
            'صناعة سعودية عالية الجودة.',
            'مقاومة للصدأ والتآكل.',
            'متانة طويلة الأمد.',
        ],
        useCases: [
            'مشاريع سكنية.',
            'مباني تجارية.',
            'منشآت صناعية.',
        ],
    },
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
        title: `${service.title} | معالم الظل`,
        description: service.shortDescription ?? undefined,
        keywords: [
            service.title,
            'معالم الظل',
            'خدمات التظليل',
            'سواتر حماية',
            'ساندوتش بانل',
        ],
        openGraph: {
            title: `${service.title} | معالم الظل`,
            description: service.shortDescription ?? undefined,
            images: service.coverImage ? [service.coverImage] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} | معالم الظل`,
            description: service.shortDescription ?? undefined,
            images: service.coverImage ? [service.coverImage] : [],
        },
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const service = await prisma.service.findUnique({
        where: { slug },
        include: {
            images: { orderBy: { displayOrder: 'asc' } },
            posts: { orderBy: { publishedAt: 'desc' } },
        },
    })

    if (!service) notFound()

    const settings = await prisma.siteSettings.findFirst()
    const phone = settings?.phone || '+966538314660'
    const whatsapp = settings?.whatsapp || phone
    const siteUrl = 'https://maalim-al-dhil.com'
    const highlights = SERVICE_HIGHIGHTS[service.slug] || {
        heroSubtitle: 'حلول مخصصة لتلبية احتياجات مشروعك بمواصفات عالية الجودة.',
        benefits: ['تنفيذ متكامل.', 'مواد عالية الجودة.', 'دعم فني مستمر بعد التسليم.'],
        useCases: ['مواقع سكنية وتجارية.', 'مشاريع صناعية.', 'متاجر ومرافق خدمات.'],
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription || service.description || '',
        provider: {
            '@type': 'Organization',
            name: settings?.companyName || 'معالم الظل',
            url: siteUrl,
        },
        serviceType: service.title,
        areaServed: 'المملكة العربية السعودية',
        url: `${siteUrl}/services/${service.slug}`,
    }

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
                    <p className="text-white/80 mt-3 max-w-2xl">{highlights.heroSubtitle}</p>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
                                    <h3 className="font-semibold text-lg text-primary mb-4">الفوائد</h3>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        {highlights.benefits.map((benefit) => (
                                            <li key={benefit} className="flex gap-3">
                                                <span className="mt-1 text-accent">•</span>
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
                                    <h3 className="font-semibold text-lg text-primary mb-4">حالات الاستخدام</h3>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        {highlights.useCases.map((useCase) => (
                                            <li key={useCase} className="flex gap-3">
                                                <span className="mt-1 text-accent">•</span>
                                                <span>{useCase}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

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

                            {service.posts && service.posts.length > 0 && (
                                <div className="pt-6">
                                    <h2 className="text-xl font-bold text-primary mb-4">مقالات مرتبطة</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.posts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/updates/${post.slug}`}
                                                className="block rounded-3xl border border-border bg-white p-6 transition hover:shadow-lg"
                                            >
                                                <h3 className="font-semibold text-base text-primary mb-2">{post.title}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                            </Link>
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
                                href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`أريد الاستفسار عن خدمة: ${service.title}`)}`}
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </>
    )
}
