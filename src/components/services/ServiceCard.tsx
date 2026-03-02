import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface ServiceCardProps {
    title: string
    slug: string
    shortDescription: string
    imageUrl?: string
}

export function ServiceCard({ title, slug, shortDescription, imageUrl }: ServiceCardProps) {
    return (
        <Card hoverable className="overflow-hidden flex flex-col h-full group">
            {/* Image */}
            <div className="relative h-52 bg-secondary overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                        <span className="text-4xl text-muted-foreground">🏗️</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {shortDescription}
                </p>
                <Link
                    href={`/services/${slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm hover:gap-2 transition-all"
                >
                    اعرف المزيد
                    <ArrowLeft size={16} className="rotate-180" />
                </Link>
            </div>
        </Card>
    )
}
