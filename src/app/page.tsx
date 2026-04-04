import Link from 'next/link'
import { ChevronLeft, PhoneCall, MessageCircle, Shield, Award, Clock, Star, Settings, Users, FileText, Wrench, CheckCircle, Building2, Calendar, MapPin } from 'lucide-react'
import prisma from '@/lib/prisma'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { PostCard } from '@/components/posts/PostCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'معالم الظل | حلول التظليل والهياكل في السعودية',
    description: 'معالم الظل تقدم مظلات السيارات، السواتر، الهناجر، البرجولات، الجلسات الخارجية، وساندوتش بانل بجودة تنفيذ احترافية داخل المملكة.',
    keywords: ['معالم الظل', 'مظلات سيارات', 'سواتر حماية', 'هناجر', 'برجولات', 'جلسات خارجية', 'ساندوتش بانل', 'كلادينج'],
}

const whyItems = [
    {
        icon: Shield,
        title: 'جودة التنفيذ',
        desc: 'تنفيذ دقيق يقلل مشاكل ما بعد التركيب ويضمن عمرًا أطول للمشروع.',
    },
    {
        icon: Award,
        title: 'مواد متينة ومضمونة',
        desc: 'نستخدم مواد مقاومة للعوامل الجوية مع ضمان حقيقي على الهياكل.',
    },
    {
        icon: Star,
        title: 'تصميم + تصنيع + تركيب',
        desc: 'حل متكامل من أول فكرة حتى تسليم المشروع على الجاهز.',
    },
    {
        icon: Clock,
        title: 'الالتزام بالمواعيد',
        desc: 'جدول زمني واضح واحترام لمواعيد التسليم المتفق عليها.',
    },
]

export default async function HomePage() {
    const [services, posts, settings, featuredGallery] = await Promise.all([
        prisma.service.findMany({
            where: { featured: true },
            orderBy: { displayOrder: 'asc' },
            take: 6,
        }),
        prisma.post.findMany({
            orderBy: { publishedAt: 'desc' },
            take: 3,
        }),
        prisma.siteSettings.findFirst(),
        prisma.galleryItem.findMany({
            include: { category: { select: { title: true } } },
            orderBy: { createdAt: 'desc' },
            take: 6,
        }),
    ])

    const whatsapp = settings?.whatsapp || '+966538314660'
    const phone = settings?.phone || '+966538314660'

    return (
        <>
            {/* ── HERO ───────────────────────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-900 to-primary-800">
                {/* Professional background pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                </div>

                {/* Floating elements for premium feel */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
                <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

                <Container className="relative z-10 py-24">
                    <div className="max-w-4xl">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 animate-fade-in-scale">
                                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                                <span className="text-white/90 font-semibold text-sm">حلول تظليل وهياكل خارجية متكاملة</span>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl glass-professional px-6 py-3 animate-slide-in-right">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center">
                                    <img src="/logo.png" alt="معالم الظل" className="w-full h-full object-contain" />
                                </div>
                                <div className="text-white">
                                    <span className="block font-bold text-lg">معالم الظل</span>
                                    <span className="block text-xs text-white/60">MAALIM AL-DHIL | Professional Shading Solutions</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-8 animate-fade-in-up text-balance">
                            حلول تظليل وهياكل
                            <span className="text-accent block mt-2 animate-glow">للسكني والتجاري في المملكة</span>
                        </h1>

                        <p className="text-white/80 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl animate-slide-in-left text-pretty">
                            نصمم وننفذ مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات
                            بأعلى معايير الجودة العالمية وعمر تشغيلي طويل الأمد.
                        </p>

                        <div className="text-white/60 text-base mb-10 animate-fade-in">
                            مشاريع حقيقية في الرياض والمناطق المجاورة • تنفيذ احترافي معتمد
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in">
                            <Link href="/request">
                                <Button size="lg" className="btn-gradient-professional w-full sm:w-auto text-lg px-8 py-4 hover-lift-professional">
                                    طلب عرض سعر احترافي
                                    <ChevronLeft size={24} className="rotate-180" />
                                </Button>
                            </Link>
                            <Link href="/gallery">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="btn-outline-professional w-full sm:w-auto text-lg px-8 py-4 border-2 hover:bg-white hover:text-primary"
                                >
                                    استكشف أعمالنا المتميزة
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── PROFESSIONAL TRUST BAR ──────────────────────────────── */}
            <section className="bg-gradient-subtle border-y border-border">
                <Container className="py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center group hover-scale transition-all duration-300">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <Building2 size={28} className="text-white" />
                            </div>
                            <p className="font-bold text-primary text-sm">500+</p>
                            <p className="text-xs text-muted-foreground">مشروع منفّذ</p>
                            <p className="text-xs text-muted-foreground">سكني وتجاري في المملكة</p>
                        </div>
                        <div className="text-center group hover-scale transition-all duration-300">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <Calendar size={28} className="text-white" />
                            </div>
                            <p className="font-bold text-primary text-sm">15+</p>
                            <p className="text-xs text-muted-foreground">سنة خبرة</p>
                            <p className="text-xs text-muted-foreground">في حلول التظليل والهياكل</p>
                        </div>
                        <div className="text-center group hover-scale transition-all duration-300">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <MapPin size={28} className="text-white" />
                            </div>
                            <p className="font-bold text-primary text-sm">الرياض والمناطق المجاورة</p>
                            <p className="text-xs text-muted-foreground">تغطية عملية وواقعية</p>
                        </div>
                        <div className="text-center group hover-scale transition-all duration-300">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <Clock size={28} className="text-white" />
                            </div>
                            <p className="font-bold text-primary text-sm">24 ساعة</p>
                            <p className="text-xs text-muted-foreground">استجابة سريعة</p>
                            <p className="text-xs text-muted-foreground">للاستفسارات وطلبات العروض</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── PROFESSIONAL SERVICES ─────────────────────────────────────── */}
            <section className="section-spacing bg-background">
                <Container>
                    <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
                        <SectionHeading
                            title="خدماتنا المتكاملة في حلول التظليل والواجهات"
                            subtitle="مجموعة شاملة من الحلول المصممة خصيصاً للسوق السعودي بأعلى معايير الجودة العالمية."
                            className="animate-fade-in-up"
                        />
                        <Link
                            href="/services"
                            className="btn-ghost-professional text-accent font-semibold text-base hover:underline flex items-center gap-2 whitespace-nowrap animate-slide-in-right"
                        >
                            استكشف جميع الخدمات
                            <ChevronLeft size={18} className="rotate-180" />
                        </Link>
                    </div>

                    {services && services.length > 0 ? (
                        <div className="animate-fade-in-scale">
                            <ServiceGrid services={services} />
                        </div>
                    ) : (
                        <div className="text-center py-20 animate-fade-in">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-accent-professional flex items-center justify-center">
                                <Settings className="text-white" size={32} />
                            </div>
                            <p className="text-muted-foreground text-xl font-medium">الخدمات قيد الإضافة قريباً.</p>
                            <p className="text-muted-foreground text-sm mt-2">نعمل على إعداد محتوى شامل لخدماتنا</p>
                        </div>
                    )}

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border-2 border-dashed border-accent/30 bg-gradient-subtle px-8 py-6 animate-fade-in-up">
                        <div className="text-center sm:text-right">
                            <p className="text-base text-muted-foreground font-medium mb-1">
                                غير متأكد أي خدمة هي الأنسب لموقعك؟
                            </p>
                            <p className="text-sm text-muted-foreground">
                                استشر خبرائنا للحصول على الحل المثالي
                            </p>
                        </div>
                        <Link href="/request">
                            <Button variant="gradient" size="lg" className="btn-gradient-professional whitespace-nowrap hover-lift-professional">
                                اطلب استشارة مجانية
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* ── WHY CHOOSE US ───────────────────────────────────────── */}
            <section className="section-spacing bg-gradient-subtle">
                <Container>
                    <SectionHeading
                        title="لماذا يختار العملاء معالم الظل؟"
                        subtitle="نلتزم بأعلى معايير الجودة والاحترافية في كل تفصيل من تفاصيل مشاريعنا."
                        centered
                        className="animate-fade-in-up"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {whyItems.map(({ icon: Icon, title, desc }, index) => (
                            <div
                                key={title}
                                className="card-premium p-8 flex flex-col gap-4 text-center group hover-lift-professional animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                                    <Icon size={28} className="text-white" />
                                </div>
                                <h3 className="font-bold text-primary text-lg leading-tight">{title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="animate-fade-in-scale">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                                <Award size={32} className="text-white" />
                            </div>
                            <h4 className="font-bold text-primary text-lg mb-2">معتمد ومرخص</h4>
                            <p className="text-muted-foreground leading-relaxed">جميع أعمالنا معتمدة وفق المعايير السعودية والدولية</p>
                        </div>
                        <div className="animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                                <Shield size={32} className="text-white" />
                            </div>
                            <h4 className="font-bold text-primary text-lg mb-2">ضمان شامل</h4>
                            <p className="text-muted-foreground leading-relaxed">ضمان على المواد والتنفيذ لسنوات طويلة مع صيانة دورية</p>
                        </div>
                        <div className="animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                                <Clock size={32} className="text-white" />
                            </div>
                            <h4 className="font-bold text-primary text-lg mb-2">التزام زمني</h4>
                            <p className="text-muted-foreground leading-relaxed">نحترم المواعيد المتفق عليها بدقة عالية وتسليم في الوقت المحدد</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── PREMIUM PROJECTS ────────────────────────────── */}
            {featuredGallery && featuredGallery.length > 0 && (
                <section className="section-spacing bg-background">
                    <Container>
                        <SectionHeading
                            title="نماذج من أعمالنا المتميزة"
                            subtitle="صور حقيقية لمشاريع مظلات، هناجر، برجولات، وسواتر نفذت بأعلى معايير الجودة في السوق السعودي."
                            className="animate-fade-in-up"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {featuredGallery.map((item, index) => {
                                // Map gallery categories to service slugs
                                const categoryToServiceMap: Record<string, string> = {
                                    'مظلات السيارات': 'car-shades',
                                    'الهناجر': 'hangars',
                                    'برجولات الحدائق': 'pergolas',
                                    'الجلسات الخارجية': 'outdoor-seating',
                                    'سواتر حماية': 'security-screens',
                                    'ساندوتش بانل': 'sandwich-panel',
                                    'كلادينج الواجهات': 'facade-cladding',
                                    'car shades': 'car-shades',
                                    'hangars': 'hangars',
                                    'pergolas': 'pergolas',
                                    'outdoor seating': 'outdoor-seating',
                                    'security screens': 'security-screens',
                                    'sandwich panel': 'sandwich-panel',
                                    'facade cladding': 'facade-cladding'
                                };

                                const serviceSlug = categoryToServiceMap[item.category?.title?.toLowerCase() || ''] || 'services';
                                const serviceUrl = `/services/${serviceSlug}`;

                                return (
                                    <Link
                                        key={item.id}
                                        href={serviceUrl}
                                        className="card-premium overflow-hidden group cursor-pointer animate-fade-in-up hover-lift-professional block"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {item.imageUrl && (
                                            <div className="aspect-video overflow-hidden relative">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title ?? 'صورة مشروع معالم الظل'}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    <ChevronLeft size={20} className="text-primary rotate-180" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <p className="text-lg font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                                                {item.title || 'مشروع من أعمالنا المتميزة'}
                                            </p>
                                            {item.category?.title && (
                                                <div className="flex items-center justify-between">
                                                    <span className="badge-premium">
                                                        {item.category.title}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                                                        عرض الخدمة ←
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border-2 border-dashed border-accent/30 bg-gradient-subtle px-8 py-6 animate-fade-in-up">
                            <div className="text-center sm:text-right">
                                <p className="text-base text-muted-foreground font-medium mb-1">
                                    ترغب في تنفيذ مشروع مشابه لموقعك؟
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    شاهد المزيد من أعمالنا وتواصل معنا
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/gallery">
                                    <Button variant="outline" size="lg" className="btn-outline-professional">
                                        معرض الأعمال الكامل
                                    </Button>
                                </Link>
                                <Link href="/request">
                                    <Button variant="gradient" size="lg" className="btn-gradient-professional hover-lift-professional">
                                        نفّذ مشروعًا مماثلاً
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* ── PROFESSIONAL PROCESS ──────────────────────────────────────── */}
            <section className="section-spacing bg-gradient-subtle">
                <Container>
                    <SectionHeading
                        title="رحلتك المهنية معنا في 3 خطوات"
                        subtitle="عملية واضحة ومنظمة تضمن تنفيذ مشروعك بأعلى معايير الجودة والاحترافية."
                        centered
                        className="animate-fade-in-up"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="card-premium p-8 text-center group hover-lift-professional animate-slide-in-left">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <Users size={28} className="text-white" />
                            </div>
                            <h3 className="font-bold text-primary text-xl mb-4">استشارة فنية شاملة</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                نفهم موقع المشروع واحتياجاتك بدقة عالية، مع أخذ القياسات الميدانية ودراسة الظروف البيئية والمناخية المحيطة.
                            </p>
                        </div>
                        <div className="card-premium p-8 text-center group hover-lift-professional animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <FileText size={28} className="text-white" />
                            </div>
                            <h3 className="font-bold text-primary text-xl mb-4">تصميم وتخطيط احترافي</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                نعد لك حلولاً مصممة خصيصاً مع المواد، الألوان، والجدول الزمني، إلى جانب عرض سعر واضح وشامل للمشروع.
                            </p>
                        </div>
                        <div className="card-premium p-8 text-center group hover-lift-professional animate-slide-in-right">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-accent-professional flex items-center justify-center shadow-lg group-hover:shadow-glow">
                                <Wrench size={28} className="text-white" />
                            </div>
                            <h3 className="font-bold text-primary text-xl mb-4">تنفيذ وتسليم احترافي</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                فرق تنفيذ متخصصة تُنجز المشروع وفق الخطة المعتمدة، مع تسليم نظيف ومتابعة لما بعد التركيب وضمان شامل.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up">
                        <div className="text-center">
                            <p className="text-base text-muted-foreground font-medium mb-2">
                                جاهز لبدء الخطوة الأولى في رحلتك المهنية؟
                            </p>
                            <p className="text-sm text-muted-foreground">
                                تواصل معنا اليوم وابدأ مشروعك بثقة
                            </p>
                        </div>
                        <Link href="/request">
                            <Button size="lg" className="btn-gradient-professional hover-lift-professional px-8">
                                ابدأ الخطوة الأولى الآن
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* ── PREMIUM FINAL CTA ───────────────────────────────────── */}
            <section className="section-spacing bg-gradient-to-r from-primary via-primary-900 to-primary-800 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                </div>

                <Container className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 mb-8 animate-fade-in-scale">
                            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                            <span className="text-white/90 font-semibold">منصة معالم الظل - الريادة في حلول التظليل المتكاملة</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up text-balance">
                            ابدأ مشروع التظليل أو الواجهات
                            <span className="text-accent block mt-2 animate-glow">مع الخبراء المعتمدين</span>
                        </h2>

                        <p className="text-white/80 text-xl md:text-2xl leading-relaxed mb-10 max-w-3xl mx-auto animate-slide-in-left text-pretty">
                            نخدم الرياض والمناطق المجاورة – استجابة خلال 24 ساعة على استفساراتكم وطلبات العروض.
                            حلول متكاملة بأعلى معايير الجودة العالمية.
                        </p>

                        <div className="text-white/60 text-base mb-10 animate-fade-in">
                            مشاريع حقيقية • تنفيذ احترافي • ضمان شامل • خدمة متميزة
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-bounce-in">
                            <Link href="/request">
                                <Button
                                    size="lg"
                                    className="btn-gradient-professional w-full sm:w-auto text-xl px-10 py-5 hover-lift-professional shadow-2xl"
                                >
                                    طلب عرض سعر احترافي
                                    <ChevronLeft size={24} className="rotate-180 ml-2" />
                                </Button>
                            </Link>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="btn-outline-professional w-full sm:w-auto text-lg px-8 py-4 border-2 hover:bg-white hover:text-primary"
                                    >
                                        <MessageCircle size={22} className="ml-2" />
                                        واتساب فوري
                                    </Button>
                                </a>
                                <a href={`tel:${phone}`}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="btn-outline-professional w-full sm:w-auto text-lg px-8 py-4 border-2 hover:bg-white hover:text-primary"
                                    >
                                        <PhoneCall size={22} className="ml-2" />
                                        اتصال مباشر
                                    </Button>
                                </a>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm animate-fade-in-up">
                            <span className="flex items-center gap-2">
                                <Award size={16} className="text-accent" />
                                معتمد من الهيئة السعودية للمهندسين
                            </span>
                            <span className="flex items-center gap-2">
                                <Shield size={16} className="text-accent" />
                                ضمان شامل على المواد والتنفيذ
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-accent" />
                                تنفيذ وفق المعايير الدولية
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} className="text-accent" />
                                التزام تام بالمواعيد المتفق عليها
                            </span>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── RECENT UPDATES (اختياري بعد الـ CTA) ───────── */}
            {posts && posts.length > 0 && (
                <section className="py-20 bg-background">
                    <Container>
                        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                            <SectionHeading
                                title="آخر المستجدات"
                                subtitle="نصائح ومشاريع حديثة في مجال التظليل والهياكل الخارجية."
                            />
                            <Link
                                href="/updates"
                                className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 whitespace-nowrap"
                            >
                                جميع المقالات <ChevronLeft size={16} className="rotate-180" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    title={post.title}
                                    slug={post.slug}
                                    excerpt={post.excerpt ?? undefined}
                                    publishedAt={post.publishedAt?.toISOString()}
                                    imageUrl={post.coverImage ?? undefined}
                                />
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </>
    )
}
