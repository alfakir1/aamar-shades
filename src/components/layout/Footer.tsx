import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Mail, Github, Instagram, Facebook } from 'lucide-react'
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

export function Footer({ settings, services }: { settings: any; services: any[] | null }) {
    const currentYear = new Date().getFullYear()

    const phone = settings?.phone || '+966 53 831 4660'
    const whatsapp = settings?.whatsapp || phone
    const email = settings?.email || 'info@aamarshades.com'
    const address = settings?.address || 'المملكة العربية السعودية'
    const companyName = settings?.companyName || 'عمار للمظلات'

    // Use dynamic services if available, fallback to hardcoded if not
    const displayServices = services && services.length > 0
        ? services.map(s => ({ href: `/services/${s.slug}`, label: s.title }))
        : footerLinks.services

    return (
        <footer className="bg-primary text-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">{companyName.charAt(0)}</span>
                            </div>
                            <div>
                                <span className="block font-bold text-xl">{companyName}</span>
                                <span className="block text-sm text-white/60">حلول التظليل الاحترافية</span>
                            </div>
                        </div>
                        <p className="text-white/70 leading-relaxed text-sm max-w-xs">
                            نختص في تصميم وتركيب المظلات والهياكل الخارجية بأعلى معايير الجودة، لنمنح مشاريعكم لمسة عصرية وحماية متينة.
                        </p>
                        <div className="mt-6 flex flex-col gap-3">
                            <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors">
                                <Phone size={16} className="text-accent flex-shrink-0" />
                                {phone}
                            </a>
                            <a href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors">
                                <MessageCircle size={16} className="text-accent flex-shrink-0" />
                                واتساب: تواصل معنا الآن
                            </a>
                            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors">
                                <Mail size={16} className="text-accent flex-shrink-0" />
                                {email}
                            </a>
                            <span className="flex items-center gap-3 text-sm text-white/70">
                                <MapPin size={16} className="text-accent flex-shrink-0" />
                                {address}
                            </span>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-base mb-5 text-white">خدماتنا</h3>
                        <ul className="flex flex-col gap-2">
                            {displayServices.map((link) => (
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
                    <div className="flex flex-col sm:flex-row items-center justify-between py-5 gap-4 text-xs text-white/40">
                        <p>© {currentYear} {companyName}. جميع الحقوق محفوظة.</p>
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                            <p>تصميم وتطوير المهندس علي الفقير</p>
                            <div className="flex items-center gap-4 text-white/70" dir="ltr">
                                <a href="https://github.com/alfakir1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Github">
                                    <Github size={16} />
                                </a>
                                <a href="https://www.facebook.com/share/1GWcs4EKaz/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" title="Facebook">
                                    <Facebook size={16} />
                                </a>
                                <a href="https://www.instagram.com/7s.i4?igsh=MXFjMGk5N2Nmd2Y1NQ==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" title="Instagram">
                                    <Instagram size={16} />
                                </a>
                                <div className="w-px h-4 bg-white/20 mx-1 hidden sm:block"></div>
                                {/* <a href="tel:+967777073977" className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap">
                                    <Phone size={14} />
                                    <span>+967 777073977</span>
                                </a> */}
                                <a
                                    href={`https://wa.me/967777073977?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدمات تصميم وتطوير المواقع الإلكترونية.')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:text-green-400 transition-colors whitespace-nowrap"
                                    title="تواصل عبر واتساب"
                                >
                                    <MessageCircle size={14} />
                                    <span>واتساب</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    )
}
