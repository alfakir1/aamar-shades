'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryItemData {
    id: string
    title?: string | null
    imageUrl: string
    altText?: string | null
    category: {
        slug: string
        title: string
    }
}

interface GalleryCategoryData {
    id: string
    title: string
    slug: string
}

interface GalleryClientProps {
    items: GalleryItemData[]
    categories: GalleryCategoryData[]
}

export function GalleryClient({ items, categories }: GalleryClientProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const filtered = activeCategory === 'all'
        ? items
        : items.filter((item) => item.category?.slug === activeCategory)

    const openLightbox = (index: number) => setLightboxIndex(index)
    const closeLightbox = () => setLightboxIndex(null)

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return
        setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
    }, [lightboxIndex, filtered.length])

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return
        setLightboxIndex((lightboxIndex + 1) % filtered.length)
    }, [lightboxIndex, filtered.length])

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') goPrev()    // RTL: left = previous
            if (e.key === 'ArrowRight') goNext()   // RTL: right = next
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightboxIndex, goPrev, goNext])

    const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

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
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${activeCategory === cat.slug
                            ? 'bg-accent text-white border-accent'
                            : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
                            }`}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filtered.map((item, i) => (
                        <button
                            key={`${item.id}-${i}`}
                            onClick={() => openLightbox(i)}
                            className="relative aspect-square overflow-hidden rounded-xl bg-secondary group focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.altText || item.title || ''}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">{item.title}</span>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 text-muted-foreground">
                    <p className="text-lg mb-2">لا توجد صور في هذه الفئة</p>
                </div>
            )}

            {/* Lightbox with navigation */}
            {currentItem && lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition-colors"
                        onClick={closeLightbox}
                        aria-label="إغلاق"
                    >
                        <X size={24} />
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
                        {lightboxIndex + 1} / {filtered.length}
                    </div>

                    {/* Prev arrow */}
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full p-3 transition-colors"
                        onClick={(e) => { e.stopPropagation(); goPrev() }}
                        aria-label="السابق"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* Next arrow */}
                    <button
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full p-3 transition-colors"
                        onClick={(e) => { e.stopPropagation(); goNext() }}
                        aria-label="التالي"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Image */}
                    <div
                        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={currentItem.imageUrl}
                            alt={currentItem.altText || currentItem.title || ''}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Title below */}
                    {currentItem.title && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white text-sm bg-black/50 px-4 py-2 rounded-full max-w-xs text-center">
                            {currentItem.title}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
