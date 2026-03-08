import { ServiceCard } from './ServiceCard'

interface Service {
    id: string
    title: string
    slug: string
    shortDescription?: string | null
    coverImage?: string | null
}

interface ServiceGridProps {
    services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    title={service.title}
                    slug={service.slug}
                    shortDescription={service.shortDescription}
                    imageUrl={service.coverImage ?? undefined}
                />
            ))}
        </div>
    )
}
