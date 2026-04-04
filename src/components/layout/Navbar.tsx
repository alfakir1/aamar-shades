'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/services', label: 'خدماتنا' },
    { href: '/gallery', label: 'معرض الأعمال' },
    { href: '/updates', label: 'المستجدات' },
    { href: '/testimonials', label: 'آراء العملاء' },
    { href: '/request', label: 'طلب خدمة' },
]

export function Navbar({ settings }: { settings: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const phone = settings?.phone || '+966 53 831 4660'
    const companyName = settings?.companyName || 'معالم الظل'

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-500',
                scrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-border/50'
                    : 'bg-white/90 backdrop-blur-sm'
            )}
        >
            <Container>
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Premium Logo */}
                    <Link href="/" className="flex items-center gap-4 group hover-scale transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-professional border-2 border-border flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                            <img src="/logo.png" alt={`${companyName} logo`} className="w-full h-full object-contain" />
                        </div>
                        <div className="leading-tight">
                            <span className="block font-bold text-primary text-xl group-hover:text-accent transition-colors">{companyName}</span>
                            <span className="block text-sm text-muted-foreground font-medium">MAALIM AL-DHIL | Professional Shading Solutions</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    href={link.href}
                                    className="px-5 py-3 text-sm font-semibold text-foreground rounded-xl hover:bg-secondary hover:text-accent transition-all duration-300 hover-lift relative group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Premium CTA */}
                    <a
                        href={`tel:${phone}`}
                        className="hidden md:inline-flex items-center gap-3 bg-gradient-professional text-white px-6 py-3 rounded-xl font-bold text-sm hover-lift-professional shadow-lg hover:shadow-glow transition-all duration-300"
                    >
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <Phone size={16} className="text-white" />
                        </div>
                        اتصل بنا
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-3 rounded-xl text-primary hover:bg-secondary transition-all duration-300 hover-lift"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </Container>

            {/* Premium Mobile Menu */}
            <div
                className={cn(
                    'md:hidden overflow-hidden transition-all duration-500 bg-white/95 backdrop-blur-xl border-t border-border/50',
                    isOpen ? 'max-h-[500px] shadow-xl' : 'max-h-0'
                )}
            >
                <Container>
                    <nav className="flex flex-col gap-2 py-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-4 text-base font-semibold text-foreground rounded-xl hover:bg-secondary hover:text-accent transition-all duration-300 hover-lift animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={`tel:${phone}`}
                            className="mt-4 flex items-center justify-center gap-3 bg-gradient-professional text-white px-6 py-4 rounded-xl font-bold text-base hover-lift-professional shadow-lg animate-fade-in-up"
                            style={{ animationDelay: '0.5s' }}
                        >
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <Phone size={16} className="text-white" />
                            </div>
                            اتصل بنا
                        </a>
                    </nav>
                </Container>
            </div>
        </header>
    )
}
