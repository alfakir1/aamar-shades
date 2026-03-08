'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/services', label: 'خدماتنا' },
    { href: '/gallery', label: 'معرض الأعمال' },
    { href: '/updates', label: 'المستجدات' },
    { href: '/request', label: 'طلب خدمة' },
]

export function Navbar({ settings }: { settings: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const phone = settings?.phone || '+966 53 831 4660'
    const companyName = settings?.companyName || 'عمار للمظلات'

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md'
                    : 'bg-white border-b border-border'
            )}
        >
            <Container>
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                            <span className="text-white font-bold text-lg">{companyName.charAt(0)}</span>
                        </div>
                        <div className="leading-tight">
                            <span className="block font-bold text-primary text-lg">{companyName}</span>
                            <span className="block text-xs text-muted-foreground">حلول التظليل الاحترافية</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-secondary hover:text-accent transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Phone */}
                    <a
                        href={`tel:${phone}`}
                        className="hidden md:flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors"
                    >
                        <Phone size={16} />
                        اتصل بنا
                    </a>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg text-primary hover:bg-secondary transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'md:hidden overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-[400px] border-t border-border' : 'max-h-0'
                )}
            >
                <Container>
                    <nav className="flex flex-col gap-1 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-foreground rounded-lg hover:bg-secondary hover:text-accent transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={`tel:${phone}`}
                            className="mt-2 flex items-center justify-center gap-2 bg-accent text-white px-4 py-3 rounded-lg font-semibold text-sm"
                        >
                            <Phone size={16} />
                            اتصل بنا
                        </a>
                    </nav>
                </Container>
            </div>
        </header>
    )
}
