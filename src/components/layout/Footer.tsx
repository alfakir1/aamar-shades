import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Mail, Github, Instagram, Facebook } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const footerLinks = {
    services: [
        { href: '/services/car-shades', label: 'مظلات السيارات' },
        { href: '/services/hangars', label: 'الهناجر' },
        { href: '/services/pergolas', label: 'برجولات الحدائق' },
        { href: '/services/outdoor-seating', label: 'الجلسات الخارجية' },
        { href: '/services/security-screens', label: 'سواتر حماية' },
        { href: '/services/sandwich-panel', label: 'ساندوتش بانل' },
        { href: '/services/facade-cladding', label: 'كلادينج الواجهات' },
    ],
    pages: [
        { href: '/about', label: 'من نحن' },
        { href: '/gallery', label: 'معرض الأعمال' },
        { href: '/updates', label: 'المستجدات' },
        { href: '/testimonials', label: 'آراء العملاء' },
        { href: '/faq', label: 'الأسئلة الشائعة' },
        { href: '/request', label: 'طلب خدمة' },
    ],
    social: [
        { href: 'https://wa.me/966538314660', label: 'واتساب', icon: MessageCircle },
        { href: 'https://instagram.com/maalim_aldhil', label: 'إنستغرام', icon: Instagram },
        { href: 'https://tiktok.com/@maalim_aldhil', label: 'تيك توك', icon: Github }, // استخدم Github كبديل لـ TikTok
    ],
}

export function Footer({ settings, services }: { settings: any; services: any[] | null }) {
    const currentYear = new Date().getFullYear()

    const phone = settings?.phone || '+966 53 831 4660'
    const whatsapp = settings?.whatsapp || phone
    const email = settings?.email || 'info@maalim-al-dhil.com'
    const address = settings?.address || 'الرياض، المملكة العربية السعودية'
    const companyName = settings?.companyName || 'معالم الظل'

    // Use dynamic services if available, fallback to hardcoded if not
    const displayServices = services && services.length > 0
        ? services.map(s => ({ href: `/services/${s.slug}`, label: s.title }))
        : footerLinks.services

    return (
        <footer className="bg-gradient-to-br from-primary via-primary-900 to-primary-800 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
                    {/* Premium Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
                                <img src="/logo.png" alt={`${companyName} logo`} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <span className="block font-bold text-2xl text-white">{companyName}</span>
                                <span className="block text-base text-white/60 font-medium">Professional Shading & Structural Solutions</span>
                            </div>
                        </div>
                        <p className="text-white/70 leading-relaxed text-base max-w-md mb-8">
                            نختص في تصميم وتركيب المظلات والهياكل الخارجية بأعلى معايير الجودة العالمية، لنمنح مشاريعكم لمسة عصرية وحماية متينة في المملكة العربية السعودية.
                        </p>
                        <div className="flex flex-col gap-4">
                            <a href={`tel:${phone}`} className="flex items-center gap-4 text-white/70 hover:text-accent transition-all duration-300 hover-lift group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <Phone size={18} className="text-accent" />
                                </div>
                                <span className="font-medium">{phone}</span>
                            </a>
                            <a href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`} className="flex items-center gap-4 text-white/70 hover:text-accent transition-all duration-300 hover-lift group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <MessageCircle size={18} className="text-accent" />
                                </div>
                                <span className="font-medium">واتساب: تواصل معنا الآن</span>
                            </a>
                            <a href={`mailto:${email}`} className="flex items-center gap-4 text-white/70 hover:text-accent transition-all duration-300 hover-lift group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <Mail size={18} className="text-accent" />
                                </div>
                                <span className="font-medium">{email}</span>
                            </a>
                            <div className="flex items-center gap-4 text-white/70">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <MapPin size={18} className="text-accent" />
                                </div>
                                <span className="font-medium">{address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Premium Services */}
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-white">خدماتنا المتكاملة</h3>
                        <ul className="flex flex-col gap-3">
                            {displayServices.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/70 hover:text-accent transition-all duration-300 hover-lift flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Premium Pages */}
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-white">روابط سريعة</h3>
                        <ul className="flex flex-col gap-3">
                            {footerLinks.pages.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/70 hover:text-accent transition-all duration-300 hover-lift flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center gap-6 mt-8">
                    {footerLinks.social.map((social) => (
                        <a
                            key={social.href}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover-lift hover:scale-110"
                            aria-label={social.label}
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
            </Container>

            {/* Premium Bottom Bar */}
            <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <Container>
                    <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-6 text-sm">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <p className="text-white/40">© {currentYear} {companyName}. جميع الحقوق محفوظة.</p>
                            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                            <p className="text-white/40">تصميم وتطوير المهندس علي الفقير</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-white/70" dir="ltr">
                                <a href="https://github.com/alfakir1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover-lift hover:scale-110">
                                    <Github size={18} />
                                </a>
                                <a href="https://www.facebook.com/share/1GWcs4EKaz/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all duration-300 hover-lift hover:scale-110">
                                    <Facebook size={18} />
                                </a>
                                <a href="https://www.instagram.com/7s.i4?igsh=MXFjMGk5N2Nmd2Y1NQ==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-all duration-300 hover-lift hover:scale-110">
                                    <Instagram size={18} />
                                </a>
                                <div className="w-px h-6 bg-white/20 mx-2"></div>
                                <a
                                    href={`https://wa.me/967777073977?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدمات تصميم وتطوير المواقع الإلكترونية.')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-green-400 transition-all duration-300 hover-lift hover:scale-110"
                                    title="تواصل عبر واتساب"
                                >
                                    <MessageCircle size={16} />
                                    <span className="font-medium">واتساب</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    )
}
