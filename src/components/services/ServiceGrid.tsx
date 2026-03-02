import { ServiceCard } from './ServiceCard'

interface Service {
    _id: string
    title: string
    slug: { current: string }
    shortDescription: string
    coverImage?: { asset: { url: string } }
}

interface ServiceGridProps {
    services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
                <ServiceCard
                    key={service._id}
                    title={service.title}
                    slug={service.slug.current}
                    shortDescription={service.shortDescription}
                    imageUrl={service.coverImage?.asset?.url}
                />
            ))}
        </div>
    )
}
