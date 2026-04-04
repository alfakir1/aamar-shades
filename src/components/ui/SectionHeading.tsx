import { cn } from '@/lib/utils'

interface SectionHeadingProps {
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
    accentWord?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showDivider?: boolean
    dividerColor?: 'accent' | 'primary' | 'gradient'
}

export function SectionHeading({
    title,
    subtitle,
    centered = false,
    className,
    accentWord,
    size = 'lg',
    showDivider = true,
    dividerColor = 'accent'
}: SectionHeadingProps) {
    const titleWithAccent = accentWord
        ? title.replace(accentWord, `<span class="text-accent">${accentWord}</span>`)
        : title

    const sizeClasses = {
        sm: 'text-2xl md:text-3xl',
        md: 'text-3xl md:text-4xl',
        lg: 'text-3xl md:text-5xl',
        xl: 'text-4xl md:text-6xl'
    }

    const dividerClasses = {
        accent: 'bg-accent',
        primary: 'bg-primary',
        gradient: 'bg-gradient-to-r from-accent to-accent-600'
    }

    return (
        <div className={cn('mb-12', centered && 'text-center', className)}>
            <h2
                className={cn(
                    'font-bold text-primary leading-tight tracking-tight',
                    sizeClasses[size]
                )}
                dangerouslySetInnerHTML={{ __html: titleWithAccent }}
            />
            {subtitle && (
                <p className={cn(
                    'mt-4 text-muted-foreground leading-relaxed max-w-3xl',
                    centered ? 'mx-auto' : '',
                    size === 'xl' ? 'text-xl' : size === 'lg' ? 'text-lg' : 'text-base'
                )}>
                    {subtitle}
                </p>
            )}
            {showDivider && (
                <div className={cn(
                    'mt-6 h-1.5 w-20 rounded-full',
                    dividerClasses[dividerColor],
                    centered && 'mx-auto'
                )} />
            )}
        </div>
    )
}
