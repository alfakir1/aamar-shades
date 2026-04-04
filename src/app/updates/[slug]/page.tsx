import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ChevronLeft, MessageCircle } from 'lucide-react'
import prisma from '@/lib/prisma'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
    params: Promise<{ slug: string }>
}

function formatDate(date?: Date | null) {
    if (!date) return ''
    return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({ select: { slug: true } })
    return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await prisma.post.findUnique({ where: { slug } })
    if (!post) return { title: 'مقال غير موجود' }
    return {
        title: `${post.title} | معالم الظل`,
        description: post.excerpt ?? undefined,
        openGraph: {
            title: `${post.title} | معالم الظل`,
            description: post.excerpt ?? undefined,
            images: post.coverImage ? [post.coverImage] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | معالم الظل`,
            description: post.excerpt ?? undefined,
            images: post.coverImage ? [post.coverImage] : [],
        },
    }
}

export default async function PostDetailPage({ params }: Props) {
    const { slug } = await params
    const post = await prisma.post.findUnique({ where: { slug } })

    if (!post) notFound()

    const settings = await prisma.siteSettings.findFirst()
    const whatsapp = settings?.whatsapp || '+966538314660'

    return (
        <>
            {/* Cover */}
            <div className="relative h-56 md:h-96 bg-primary overflow-hidden">
                {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover opacity-50" sizes="100vw" priority />
                ) : (
                    <div className="w-full h-full bg-gradient-to-b from-primary to-zinc-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <Container className="relative z-10 h-full flex flex-col justify-end pb-10">
                    <nav className="flex items-center gap-2 text-white/50 text-sm mb-4">
                        <Link href="/" className="hover:text-white">الرئيسية</Link>
                        <ChevronLeft size={14} className="rotate-180" />
                        <Link href="/updates" className="hover:text-white">المستجدات</Link>
                        <ChevronLeft size={14} className="rotate-180" />
                        <span className="text-white truncate max-w-xs">{post.title}</span>
                    </nav>
                    <h1 className="text-2xl md:text-4xl font-bold text-white">{post.title}</h1>
                    {post.publishedAt && (
                        <div className="flex items-center gap-2 text-white/60 text-sm mt-3">
                            <CalendarDays size={14} />
                            <span>{formatDate(post.publishedAt)}</span>
                        </div>
                    )}
                </Container>
            </div>

            <section className="py-16 bg-background">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        {post.excerpt && (
                            <p className="text-lg text-muted-foreground leading-relaxed border-r-4 border-accent pr-5 mb-10">
                                {post.excerpt}
                            </p>
                        )}

                        {post.content && (
                            <div className="prose prose-zinc max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                                {post.content}
                            </div>
                        )}

                        {/* Footer CTA */}
                        <div className="mt-16 pt-8 border-t border-border flex flex-col gap-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <Link
                                    href="/updates"
                                    className="text-accent font-semibold text-sm hover:underline flex items-center gap-1"
                                >
                                    <ChevronLeft size={16} />
                                    العودة إلى المستجدات
                                </Link>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link href="/request">
                                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                                            طلب عرض سعر
                                        </Button>
                                    </Link>
                                    <a
                                        href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button size="sm" className="whitespace-nowrap">
                                            <MessageCircle size={18} />
                                            واتساب مباشر
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
