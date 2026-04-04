'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'gradient'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: Variant
    size?: Size
    className?: string
    loading?: boolean
}

const variants: Record<Variant, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-200 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 shadow-sm hover:shadow-md',
    accent: 'bg-accent text-accent-foreground hover:bg-accent-600 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 shadow-sm hover:shadow-md',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
    ghost: 'text-primary hover:bg-primary/5 hover:text-primary-800',
    gradient: 'bg-gradient-to-r from-accent to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
}

const sizes: Record<Size, string> = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl'
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    loading = false,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                loading && 'cursor-wait',
                className,
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    )
}
