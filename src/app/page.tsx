import Link from 'next/link'
import { ChevronLeft, PhoneCall, MessageCircle, Shield, Award, Clock, Star } from 'lucide-react'
import prisma from '@/lib/prisma'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { PostCard } from '@/components/posts/PostCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'عمار للمظلات | الرئيسية',
    description: 'خبراء في تصميم وتركيب مظلات السيارات والسواتر والهناجر وبرجولات الحدائق في المملكة العربية السعودية.',
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
            <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary">
                {/* Background texture */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />

                <Container className="relative z-10 py-24">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-accent font-semibold text-sm">حلول تظليل وهياكل خارجية متكاملة</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                            حلول تظليل وهياكل
                            <span className="text-accent block mt-1">للسكني والتجاري في المملكة</span>
                        </h1>

                        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                            نصمم وننفذ مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات بجودة تنفيذ عالية
                            وعمر تشغيلي طويل.
                        </p>

                        <p className="text-white/70 text-sm mb-8">مشاريع حقيقية في الرياض وما حولها</p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/request">
                                <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-zinc-100">
                                    طلب عرض سعر
                                    <ChevronLeft size={20} className="rotate-180" />
                                </Button>
                            </Link>
                            <Link href="/gallery">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-primary"
                                >
                                    مشاهدة أعمالنا
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── QUICK TRUST BAR ──────────────────────────────── */}
            <section className="bg-background border-b border-border">
                <Container className="py-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                                +500
                            </div>
                            <div>
                                <p className="font-semibold text-primary text-xs">مشروع منفّذ</p>
                                <p className="text-[11px] text-muted-foreground">سكني وتجاري في المملكة</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                                +15
                            </div>
                            <div>
                                <p className="font-semibold text-primary text-xs">سنة خبرة</p>
                                <p className="text-[11px] text-muted-foreground">في حلول التظليل والهياكل</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                                SA
                            </div>
                            <div>
                                <p className="font-semibold text-primary text-xs">نخدم الرياض والمناطق المجاورة</p>
                                <p className="text-[11px] text-muted-foreground">تغطية عملية وواقعية</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                                24h
                            </div>
                            <div>
                                <p className="font-semibold text-primary text-xs">استجابة خلال 24 ساعة</p>
                                <p className="text-[11px] text-muted-foreground">للاستفسارات وطلبات العروض</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── SERVICES ─────────────────────────────────────── */}
            <section className="py-20 bg-background">
                <Container>
                    <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                        <SectionHeading
                            title="خدماتنا في حلول التظليل والواجهات"
                            subtitle="مجموعة متكاملة من مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات."
                        />
                        <Link
                            href="/services"
                            className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 whitespace-nowrap"
                        >
                            عرض جميع الخدمات <ChevronLeft size={16} className="rotate-180" />
                        </Link>
                    </div>

                    {services && services.length > 0 ? (
                        <ServiceGrid services={services} />
                    ) : (
                        <div className="text-center py-20 text-muted-foreground text-lg">
                            <p>الخدمات قيد الإضافة قريباً.</p>
                        </div>
                    )}

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-6 py-5">
                        <p className="text-sm text-muted-foreground">
                            غير متأكد أي خدمة هي الأنسب لموقعك؟
                        </p>
                        <Link href="/request">
                            <Button variant="outline" size="sm" className="whitespace-nowrap">
                                اطلب استشارة للخدمة المناسبة
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* ── WHY US ───────────────────────────────────────── */}
            <section className="py-20 bg-secondary">
                <Container>
                    <SectionHeading
                        title="لماذا تختار عمار للمظلات؟"
                        subtitle="نُقدم التزامًا حقيقيًا بالجودة في كل تفصيل من تفاصيل المشروع."
                        centered
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                        {whyItems.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="bg-white rounded-xl p-6 flex flex-col gap-3 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Icon size={22} className="text-accent" />
                                </div>
                                <h3 className="font-bold text-primary text-sm">{title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── FEATURED PROJECTS ────────────────────────────── */}
            {featuredGallery && featuredGallery.length > 0 && (
                <section className="py-20 bg-background">
                    <Container>
                        <SectionHeading
                            title="نماذج من أعمالنا"
                            subtitle="صور حقيقية لمشاريع مظلات، هناجر، برجولات، وسواتر نُفذت على أرض الواقع."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {featuredGallery.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl overflow-hidden border border-border bg-secondary/40 hover:border-accent/40 transition-all"
                                >
                                    {item.imageUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title ?? 'صورة مشروع'}
                                            className="w-full h-52 object-cover"
                                        />
                                    )}
                                    <div className="p-4 flex flex-col gap-2">
                                        <p className="text-sm font-semibold text-primary line-clamp-2">
                                            {item.title || 'مشروع من أعمالنا'}
                                        </p>
                                        {item.category?.title && (
                                            <span className="inline-flex items-center rounded-full bg-accent/10 text-accent px-3 py-1 text-[11px] font-medium w-fit">
                                                {item.category.title}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-6 py-5">
                            <p className="text-sm text-muted-foreground">
                                ترغب في تنفيذ مشروع مشابه لموقعك؟
                            </p>
                            <Link href="/request">
                                <Button variant="outline" size="sm" className="whitespace-nowrap">
                                    نفّذ مشروعًا مشابهًا
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </section>
            )}

            {/* ── PROCESS ──────────────────────────────────────── */}
            <section className="py-20 bg-secondary">
                <Container>
                    <SectionHeading
                        title="رحلتك معنا في 3 خطوات"
                        subtitle="من أول اتصال حتى تسليم المشروع، العملية واضحة وبسيطة."
                        centered
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent mb-4">
                                1
                            </div>
                            <h3 className="font-semibold text-primary mb-2">استشارة / زيارة ميدانية</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                نفهم موقع المشروع واحتياجاتك بدقة، مع أخذ القياسات ومراجعة الظروف المحيطة.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent mb-4">
                                2
                            </div>
                            <h3 className="font-semibold text-primary mb-2">تصميم وعرض فني ومالي</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                نعد لك حلولاً مقترحة مع المواد، الألوان، والجدول الزمني، إلى جانب عرض سعر واضح.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent mb-4">
                                3
                            </div>
                            <h3 className="font-semibold text-primary mb-2">تنفيذ وتركيب</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                فرق تنفيذ متخصصة تُنجز المشروع وفق الخطة، مع تسليم نظيف ومتابعة لما بعد التركيب.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <p className="text-sm text-muted-foreground">جاهز لبدء الخطوة الأولى؟</p>
                        <Link href="/request">
                            <Button size="sm">ابدأ الخطوة الأولى</Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* ── FINAL CTA ───────────────────────────────────── */}
            <section className="py-20 bg-accent">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            ابدأ مشروع التظليل أو الواجهات الآن
                        </h2>
                        <p className="text-white/80 text-sm md:text-base mb-8">
                            نخدم الرياض والمناطق المجاورة – استجابة خلال 24 ساعة على استفساراتكم وطلبات العروض.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/request">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-white text-accent hover:bg-zinc-100 hover:text-accent shadow-none"
                                >
                                    طلب عرض سعر
                                </Button>
                            </Link>
                            <a href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full sm:w-auto bg-transparent border border-white/40 text-white hover:bg-white hover:text-accent"
                                >
                                    <MessageCircle size={20} />
                                    واتساب مباشر
                                </Button>
                            </a>
                            <a href={`tel:${phone}`}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto border-white/60 text-white hover:bg-white hover:text-accent"
                                >
                                    <PhoneCall size={20} />
                                    اتصال الآن
                                </Button>
                            </a>
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
