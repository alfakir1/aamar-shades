import prisma from '@/lib/prisma'
import { PostCard } from '@/components/posts/PostCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'المستجدات',
    description: 'آخر أخبار عمار للمظلات، مشاريعنا الجديدة، ومقالات تقنية في مجال التظليل.',
}

export default async function UpdatesPage() {
    const posts = await prisma.post.findMany({
        orderBy: { publishedAt: 'desc' },
    })

    return (
        <>
            <section className="bg-primary py-16 md:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">المستجدات</h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            أحدث مشاريعنا المنجزة ومقالات عملية تساعدك على اختيار حلول التظليل والواجهات لموقعك.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-background">
                <Container>
                    <SectionHeading
                        title="جميع المقالات"
                        subtitle="محتوى خفيف وسهل القراءة يدعم قراراتك في مشروعك القادم."
                    />
                    {posts && posts.length > 0 ? (
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
                    ) : (
                        <EmptyState
                            title="لا توجد مقالات بعد"
                            description="تابعنا قريباً للحصول على أحدث نصائح التظليل وأخبار مشاريعنا."
                        />
                    )}

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-6 py-5">
                        <p className="text-sm text-muted-foreground">
                            جاهز لتطبيق هذه الأفكار في مشروعك على أرض الواقع؟
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
