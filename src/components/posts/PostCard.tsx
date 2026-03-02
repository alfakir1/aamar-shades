import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface PostCardProps {
    title: string
    slug: string
    excerpt?: string
    publishedAt?: string
    imageUrl?: string
}

function formatDate(dateStr?: string) {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))
}

export function PostCard({ title, slug, excerpt, publishedAt, imageUrl }: PostCardProps) {
    return (
        <Card hoverable className="overflow-hidden flex flex-col group">
            <div className="relative h-44 bg-secondary overflow-hidden">
                {imageUrl ? (
                    <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                        <span className="text-3xl text-muted-foreground">📰</span>
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                {publishedAt && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <CalendarDays size={12} />
                        <span>{formatDate(publishedAt)}</span>
                    </div>
                )}
                <h3 className="font-bold text-base text-primary mb-2 group-hover:text-accent transition-colors">{title}</h3>
                {excerpt && <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{excerpt}</p>}
                <Link href={`/updates/${slug}`} className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm hover:gap-2 transition-all">
                    اقرأ المزيد <ArrowLeft size={16} className="rotate-180" />
                </Link>
            </div>
        </Card>
    )
}
