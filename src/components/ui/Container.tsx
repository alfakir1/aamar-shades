import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}>
            {children}
        </div>
    )
}
