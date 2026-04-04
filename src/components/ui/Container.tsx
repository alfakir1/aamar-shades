import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Container({
    children,
    className,
    size = 'lg',
    padding = 'md'
}: ContainerProps) {
    const sizeClasses = {
        sm: 'max-w-4xl',
        md: 'max-w-6xl',
        lg: 'max-w-7xl',
        xl: 'max-w-screen-2xl',
        full: 'max-w-full'
    }

    const paddingClasses = {
        none: '',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-4 sm:px-6 lg:px-12'
    }

    return (
        <div className={cn(
            'mx-auto w-full',
            sizeClasses[size],
            paddingClasses[padding],
            className
        )}>
            {children}
        </div>
    )
}
