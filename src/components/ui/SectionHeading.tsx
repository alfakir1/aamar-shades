import { cn } from '@/lib/utils'

interface SectionHeadingProps {
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
    accentWord?: string
}

export function SectionHeading({ title, subtitle, centered = false, className, accentWord }: SectionHeadingProps) {
    const titleWithAccent = accentWord
        ? title.replace(accentWord, `<span class="text-accent">${accentWord}</span>`)
        : title

    return (
        <div className={cn('mb-10', centered && 'text-center', className)}>
            <h2
                className="text-3xl md:text-4xl font-bold text-primary leading-tight"
                dangerouslySetInnerHTML={{ __html: titleWithAccent }}
            />
            {subtitle && (
                <p className="mt-3 text-muted-foreground text-lg max-w-2xl leading-relaxed">
                    {subtitle}
                </p>
            )}
            <div className={cn('mt-4 h-1 w-16 bg-accent rounded-full', centered && 'mx-auto')} />
        </div>
    )
}
