'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface GalleryImage {
    asset: { _id: string; url: string }
    alt?: string
}

interface GalleryItemData {
    _id: string
    title: string
    category: { _id: string; title: string; slug: { current: string } }
    images: GalleryImage[]
}

interface GalleryCategoryData {
    _id: string
    title: string
    slug: { current: string }
}

interface GalleryClientProps {
    items: GalleryItemData[]
    categories: GalleryCategoryData[]
}

export function GalleryClient({ items, categories }: GalleryClientProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
    const [lightboxAlt, setLightboxAlt] = useState<string>('')

    const filtered = activeCategory === 'all' ? items : items.filter((item) => item.category?.slug?.current === activeCategory)

    const allImages = filtered.flatMap((item) =>
        item.images.map((img) => ({ ...img, title: item.title }))
    )

    return (
        <>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-3 mb-10">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${activeCategory === 'all'
                            ? 'bg-accent text-white border-accent'
                            : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
                        }`}
                >
                    الكل
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => setActiveCategory(cat.slug.current)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${activeCategory === cat.slug.current
                                ? 'bg-accent text-white border-accent'
                                : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
                            }`}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {allImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {allImages.map((img, i) => (
                        <button
                            key={`${img.asset._id}-${i}`}
                            onClick={() => { setLightboxSrc(img.asset.url); setLightboxAlt(img.alt || img.title) }}
                            className="relative aspect-square overflow-hidden rounded-xl bg-secondary group focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            <Image
                                src={img.asset.url}
                                alt={img.alt || img.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">{img.title}</span>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 text-muted-foreground">
                    <p className="text-lg mb-2">لا توجد صور في هذه الفئة</p>
                </div>
            )}

            {/* Lightbox */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxSrc(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        onClick={() => setLightboxSrc(null)}
                        aria-label="إغلاق"
                    >
                        <X size={24} />
                    </button>
                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={lightboxSrc}
                            alt={lightboxAlt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
