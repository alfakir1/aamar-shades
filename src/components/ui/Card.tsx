import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
    hoverable?: boolean
}

export function Card({ children, className, hoverable = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-card rounded-2xl border border-border',
                hoverable &&
                    'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30',
                className,
            )}
        >
            {children}
        </div>
    )
}
