import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Car, Warehouse, Trees, Sofa, Shield, Square, Building, Tent, Layers, Package, Home } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface ServiceCardProps {
    title: string
    slug: string
    shortDescription?: string | null
    imageUrl?: string
}

const getServiceIcon = (slug: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
        'car-shades': Car,
        'hangars': Warehouse,
        'pergolas': Trees,
        'outdoor-seating': Sofa,
        'security-screens': Shield,
        'sandwich-panel': Layers,
        'facade-cladding': Building,
        'tents': Tent,
        'roof-tiles': Home,
        'pyramid-shades': Package,
        'movable-shades': Home,
        'wooden-screens': Layers,
        'fabric-screens': Tent,
        'iron-screens': Shield,
    }

    return iconMap[slug] || Building
}

export function ServiceCard({ title, slug, shortDescription, imageUrl }: ServiceCardProps) {
    const IconComponent = getServiceIcon(slug)

    return (
        <Card hoverable className="overflow-hidden flex flex-col h-full group">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
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
                        <IconComponent size={48} className="text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <IconComponent size={20} className="text-primary" />
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-base md:text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-3">
                    {shortDescription}
                </p>
                <Link
                    href={`/services/${slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-xs md:text-sm hover:gap-2 transition-all"
                >
                    اعرف المزيد
                    <ArrowLeft size={16} className="rotate-180" />
                </Link>
            </div>
        </Card>
    )
}
