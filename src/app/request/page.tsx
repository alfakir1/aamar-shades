import { PhoneCall, MessageCircle, MapPin, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { RequestForm } from '@/components/ui/RequestForm'
import prisma from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'طلب خدمة | معالم الظل',
    description: 'اطلب عرض سعر أو استشارة مجانية من معالم الظل لجميع خدمات المظلات، السواتر، الهناجر، البرجولات، والكلادينج.',
    keywords: ['طلب خدمة', 'عرض سعر', 'استشارة', 'معالم الظل'],
}

export default async function RequestPage() {
    const [settings, services] = await Promise.all([
        prisma.siteSettings.findFirst(),
        prisma.service.findMany({ orderBy: { displayOrder: 'asc' } }),
    ])

    const phone = settings?.phone || '+966538314660'
    const whatsapp = settings?.whatsapp || phone
    const email = settings?.email || 'info@aamarshades.com'
    const address = settings?.address || 'المملكة العربية السعودية'
    const serviceTitles = services.map((service) => service.title)

    const contactOptions = [
        { icon: PhoneCall, label: 'هاتف', value: phone, href: `tel:${phone}` },
        { icon: MessageCircle, label: 'واتساب', value: 'تواصل عبر واتساب الآن', href: `https://wa.me/${whatsapp.replace(/\+/g, '')}` },
        { icon: MapPin, label: 'الموقع', value: address, href: '#' },
        { icon: Mail, label: 'البريد الإلكتروني', value: email, href: `mailto:${email}` },
    ]

    return (
        <>
            <section className="bg-primary py-16 md:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">طلب خدمة</h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            تواصل معنا لمناقشة مشروعك والحصول على تسعيرة دقيقة مجانًا.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <SectionHeading title="معلومات التواصل" subtitle="نحن في خدمتكم على مدار الساعة" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                                {contactOptions.map(({ icon: Icon, label, value, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-accent/40 hover:shadow-md transition-all bg-background group"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                            <Icon size={22} className="text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="font-semibold text-primary text-sm mt-0.5">{value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <a href={`tel:${phone}`} className="flex-1">
                                    <Button size="lg" className="w-full">
                                        <PhoneCall size={18} />
                                        اتصل الآن
                                    </Button>
                                </a>
                                <a href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=أريد طلب عرض سعر`} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" size="lg" className="w-full">
                                        <MessageCircle size={18} />
                                        واتساب
                                    </Button>
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-secondary rounded-2xl p-8 border border-border">
                            <h2 className="text-xl font-bold text-primary mb-6">أرسل طلبك</h2>
                            <RequestForm whatsappNumber={whatsapp} serviceOptions={serviceTitles} siteUrl="https://maalim-al-dhil.com" />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
