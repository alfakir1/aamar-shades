'use client'

import Link from 'next/link'
import { Settings, Plus } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
    title: string
    description?: string
    actionLabel?: string
    actionHref?: string
    showAdminAction?: boolean
}

export function EmptyState({
    title,
    description,
    actionLabel = 'إضافة محتوى',
    actionHref = '/studio',
    showAdminAction = true,
}: EmptyStateProps) {
    // In a real app, we'd check if the user is an admin or in dev mode
    const isDev = process.env.NODE_ENV === 'development'

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border rounded-2xl bg-secondary/30">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Settings className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
            {description && (
                <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">
                    {description}
                </p>
            )}

            {(isDev || !showAdminAction) && (
                <Link href={actionHref}>
                    <Button className="gap-2">
                        <Plus size={18} />
                        {actionLabel}
                    </Button>
                </Link>
            )}

            {!isDev && showAdminAction && (
                <p className="text-xs text-muted-foreground mt-4">
                    يمكن للمسؤولين إضافة المحتوى عبر لوحة التحكم.
                </p>
            )}
        </div>
    )
}

export function SkeletonGrid({ count = 3, type = 'card' }: { count?: number, type?: 'card' | 'post' }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-secondary rounded-xl overflow-hidden">
                    <div className="aspect-video bg-border/50" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 bg-border/50 rounded w-1/2" />
                        <div className="h-3 bg-border/50 rounded w-full" />
                        <div className="h-3 bg-border/50 rounded w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}
