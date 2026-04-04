import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
    variant?: 'default' | 'elevated' | 'glass' | 'gradient'
    hoverable?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
    children,
    className,
    variant = 'default',
    hoverable = false,
    padding = 'md'
}: CardProps) {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    }

    const variantClasses = {
        default: 'bg-card border border-border shadow-sm',
        elevated: 'bg-card border border-border shadow-lg',
        glass: 'glass',
        gradient: 'bg-gradient-to-br from-card to-secondary border border-border/50'
    }

    return (
        <div
            className={cn(
                'rounded-xl transition-all duration-300',
                variantClasses[variant],
                paddingClasses[padding],
                hoverable && 'hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 hover:shadow-accent/10',
                className,
            )}
        >
            {children}
        </div>
    )
}
