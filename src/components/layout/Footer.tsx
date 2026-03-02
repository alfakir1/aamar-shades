import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const footerLinks = {
    services: [
        { href: '/services/car-shades', label: 'مظلات السيارات' },
        { href: '/services/hangars', label: 'الهناجر' },
        { href: '/services/pergolas', label: 'برجولات الحدائق' },
        { href: '/services/outdoor-seating', label: 'الجلسات الخارجية' },
        { href: '/services/courtyard-screens', label: 'سواتر الحوش' },
        { href: '/services/facade-cladding', label: 'كلادينج الواجهات' },
    ],
    pages: [
        { href: '/about', label: 'من نحن' },
        { href: '/gallery', label: 'معرض الأعمال' },
        { href: '/updates', label: 'المستجدات' },
        { href: '/request', label: 'طلب خدمة' },
    ],
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-primary text-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">ع</span>
                            </div>
                            <div>
                                <span className="block font-bold text-xl">عمار للمظلات</span>
                                <span className="block text-sm text-white/60">حلول التظليل الاحترافية</span>
                            </div>
                        </div>
                        <p className="text-white/70 leading-relaxed text-sm max-w-xs">
                            نختص في تصميم وتركيب المظلات والهياكل الخارجية بأعلى معايير الجودة، لنمنح مشاريعكم لمسة عصرية وحماية متينة.
                        </p>
                        <div className="mt-6 flex flex-col gap-3">
                            <a href="tel:+966555000000" className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors">
                                <Phone size={16} className="text-accent flex-shrink-0" />
                                +966 55 500 0000
                            </a>
                            <a href="https://wa.me/966555000000" className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors">
                                <MessageCircle size={16} className="text-accent flex-shrink-0" />
                                واتساب: تواصل معنا الآن
                            </a>
                            <span className="flex items-center gap-3 text-sm text-white/70">
                                <MapPin size={16} className="text-accent flex-shrink-0" />
                                المملكة العربية السعودية
                            </span>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-base mb-5 text-white">خدماتنا</h3>
                        <ul className="flex flex-col gap-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/60 hover:text-accent transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pages */}
                    <div>
                        <h3 className="font-bold text-base mb-5 text-white">روابط سريعة</h3>
                        <ul className="flex flex-col gap-2">
                            {footerLinks.pages.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/60 hover:text-accent transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <Container>
                    <div className="flex flex-col sm:flex-row items-center justify-between py-5 gap-2 text-xs text-white/40">
                        <p>© {currentYear} عمار للمظلات. جميع الحقوق محفوظة.</p>
                        <p>تصميم وتطوير احترافي</p>
                    </div>
                </Container>
            </div>
        </footer>
    )
}
