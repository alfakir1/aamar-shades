'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: Variant
    size?: Size
    className?: string
}

const variants: Record<Variant, string> = {
    primary:
        'bg-accent text-white hover:bg-accent/90 shadow-sm hover:shadow-md disabled:shadow-none disabled:bg-accent/60',
    secondary:
        'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md disabled:bg-primary/60 disabled:shadow-none',
    outline:
        'border border-accent text-accent hover:bg-accent/5 hover:border-accent/90 disabled:text-accent/60 disabled:border-accent/40',
    ghost: 'text-primary hover:bg-secondary/60',
}

const sizes: Record<Size, string> = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-5 py-2.5 text-sm md:text-base',
    lg: 'px-6 py-3 text-sm md:text-lg',
}

export function Button({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    )
}
