import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ChevronLeft, MessageCircle } from 'lucide-react'
import { safeFetch } from '@/lib/sanity.client'
import { postBySlugQuery, postsSlugsQuery } from '@/lib/sanity.queries'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
    params: Promise<{ slug: string }>
}

function formatDate(dateStr?: string) {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))
}

export async function generateStaticParams() {
    const slugs = await safeFetch<string[]>(postsSlugsQuery)
    return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await safeFetch<any>(postBySlugQuery, { slug })
    if (!post) return { title: 'مقال غير موجود' }
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage?.asset?.url ? [post.coverImage.asset.url] : [],
        },
    }
}

export default async function PostDetailPage({ params }: Props) {
    const { slug } = await params
    const post = await safeFetch<any>(postBySlugQuery, { slug }, { next: { revalidate: 3600 } })

    if (!post) notFound()

    return (
        <>
            {/* Cover */}
            <div className="relative h-56 md:h-96 bg-primary overflow-hidden">
                {post.coverImage?.asset?.url ? (
                    <Image src={post.coverImage.asset.url} alt={post.title} fill className="object-cover opacity-50" sizes="100vw" priority />
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

                        {/* Portable text placeholder – install @portabletext/react for rich rendering */}
                        {post.content && (
                            <div className="prose prose-zinc max-w-none text-muted-foreground leading-relaxed">
                                <p className="text-sm italic text-muted-foreground">المحتوى الكامل يُعرض هنا.</p>
                            </div>
                        )}

                        {/* Footer CTA */}
                        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Link href="/updates" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1">
                                <ChevronLeft size={16} />
                                العودة إلى المستجدات
                            </Link>
                            <a href="https://wa.me/966555000000" target="_blank" rel="noopener noreferrer">
                                <Button>
                                    <MessageCircle size={18} />
                                    تواصل معنا
                                </Button>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
