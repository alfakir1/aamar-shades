import Link from 'next/link'
import { ChevronLeft, PhoneCall, MessageCircle, Shield, Award, Clock, Star } from 'lucide-react'
import { safeFetch } from '@/lib/sanity.client'
import { featuredServicesQuery, recentPostsQuery } from '@/lib/sanity.queries'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { PostCard } from '@/components/posts/PostCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'عمار للمظلات | الرئيسية',
  description: 'خبراء في تصميم وتركيب مظلات السيارات والسواتر والهناجر وبرجولات الحدائق في المملكة العربية السعودية.',
}

const highlights = [
  { icon: Shield, label: 'ضمان موثوق على جميع الأعمال', color: 'text-accent' },
  { icon: Award, label: 'أكثر من 15 عامًا من الخبرة المتخصصة', color: 'text-accent' },
  { icon: Clock, label: 'التزام تام بالمواعيد المتفق عليها', color: 'text-accent' },
  { icon: Star, label: 'مواد خام عالية الجودة ومعتمدة', color: 'text-accent' },
]

export default async function HomePage() {
  const [services, posts] = await Promise.all([
    safeFetch<any[]>(featuredServicesQuery, {}, { next: { revalidate: 3600 } }),
    safeFetch<any[]>(recentPostsQuery, {}, { next: { revalidate: 3600 } }),
  ])

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-primary">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Accent blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-semibold text-sm">رواد صناعة التظليل في المملكة</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              حلول تظليل
              <span className="text-accent block mt-1">احترافية ومتكاملة</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              نصمم وننفذ مشاريع المظلات والسواتر والهناجر بأعلى المواصفات الهندسية، لنمنح مشاريعكم جمالاً يدوم وحماية تُبنى لتمتد عبر السنين.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  استكشف خدماتنا
                  <ChevronLeft size={20} className="rotate-180" />
                </Button>
              </Link>
              <a href="https://wa.me/966555000000" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-primary">
                  <MessageCircle size={20} />
                  واتساب
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-md">
              {[
                { num: '+500', label: 'مشروع منجز' },
                { num: '+15', label: 'سنة خبرة' },
                { num: '100%', label: 'رضا العملاء' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-accent">{s.num}</div>
                  <div className="text-xs text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── FEATURED SERVICES ──────────────────────────────── */}
      <section className="py-20 bg-background">
        <Container>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionHeading
              title="خدماتنا الرئيسية"
              subtitle="مجموعة متكاملة من الحلول الإنشائية الخارجية المتخصصة"
            />
            <Link href="/services" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 whitespace-nowrap">
              عرض جميع الخدمات <ChevronLeft size={16} className="rotate-180" />
            </Link>
          </div>

          {services && services.length > 0 ? (
            <ServiceGrid services={services} />
          ) : (
            <div className="text-center py-20 text-muted-foreground text-lg">
              <p className="mb-4">الخدمات قيد الإضافة في لوحة التحكم.</p>
              <p className="text-sm">قم بإضافة خدمات عبر Sanity Studio وضع علامة &quot;مميز&quot; لتظهر هنا.</p>
            </div>
          )}
        </Container>
      </section>

      {/* ── HIGHLIGHTS ─────────────────────────────────────── */}
      <section className="py-20 bg-secondary">
        <Container>
          <SectionHeading
            title="لماذا تختار عمار للمظلات؟"
            subtitle="نُقدم التزامًا حقيقيًا بالجودة عند كل تفصيل وكل لحمة حديد"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center gap-4 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon size={26} className="text-accent" />
                </div>
                <p className="text-primary font-semibold text-sm leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-20 bg-accent">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">هل أنت مستعد لبدء مشروعك؟</h2>
            <p className="text-white/80 text-lg mb-8">
              تواصل معنا اليوم للحصول على استشارة مجانية وتقدير تكلفة دقيق لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+966555000000">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <PhoneCall size={20} />
                  اتصل الآن
                </Button>
              </a>
              <Link href="/request">
                <Button size="lg" className="w-full sm:w-auto bg-white text-accent hover:bg-zinc-100 hover:text-accent shadow-none">
                  طلب عرض سعر
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── RECENT UPDATES ─────────────────────────────────── */}
      {posts && posts.length > 0 && (
        <section className="py-20 bg-background">
          <Container>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <SectionHeading
                title="آخر المستجدات"
                subtitle="أحدث مشاريعنا ومقالاتنا التقنية"
              />
              <Link href="/updates" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 whitespace-nowrap">
                جميع المقالات <ChevronLeft size={16} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: { _id: string; title: string; slug: { current: string }; excerpt?: string; publishedAt?: string; coverImage?: { asset: { url: string } } }) => (
                <PostCard
                  key={post._id}
                  title={post.title}
                  slug={post.slug.current}
                  excerpt={post.excerpt}
                  publishedAt={post.publishedAt}
                  imageUrl={post.coverImage?.asset?.url}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
