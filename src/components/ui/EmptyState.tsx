'use client'

import Link from 'next/link'
import { Settings, Plus, Sparkles } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
    title: string
    description?: string
    actionLabel?: string
    actionHref?: string
    showAdminAction?: boolean
    icon?: 'settings' | 'plus' | 'sparkles'
    variant?: 'default' | 'minimal' | 'card'
}

export function EmptyState({
    title,
    description,
    actionLabel = 'إضافة محتوى',
    actionHref = '/studio',
    showAdminAction = true,
    icon = 'settings',
    variant = 'default'
}: EmptyStateProps) {
    // In a real app, we'd check if the user is an admin or in dev mode
    const isDev = process.env.NODE_ENV === 'development'

    const icons = {
        settings: Settings,
        plus: Plus,
        sparkles: Sparkles
    }

    const Icon = icons[icon]

    const variantClasses = {
        default: 'border-2 border-dashed border-border rounded-2xl bg-secondary/30',
        minimal: 'rounded-xl bg-secondary/20',
        card: 'rounded-xl bg-card border border-border shadow-sm'
    }

    return (
        <div className={`flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in ${variantClasses[variant]}`}>
            <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center">
                    <Icon className="text-accent" size={36} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                </div>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-3 leading-tight">{title}</h3>

            {description && (
                <p className="text-muted-foreground text-base max-w-md mx-auto mb-8 leading-relaxed">
                    {description}
                </p>
            )}

            {(isDev || !showAdminAction) && (
                <Link href={actionHref}>
                    <Button variant="gradient" size="lg" className="gap-2 hover-lift">
                        <Plus size={20} />
                        {actionLabel}
                    </Button>
                </Link>
            )}

            {!isDev && showAdminAction && (
                <p className="text-sm text-muted-foreground mt-6 px-4 py-2 bg-secondary/50 rounded-lg">
                    يمكن للمسؤولين إضافة المحتوى عبر لوحة التحكم.
                </p>
            )}
        </div>
    )
}
