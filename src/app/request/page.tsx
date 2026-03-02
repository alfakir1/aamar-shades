import { PhoneCall, MessageCircle, MapPin, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'طلب خدمة',
    description: 'تواصل مع عمار للمظلات لطلب عرض سعر أو استشارة مجانية.',
}

const contactOptions = [
    { icon: PhoneCall, label: 'هاتف', value: '+966 55 500 0000', href: 'tel:+966555000000' },
    { icon: MessageCircle, label: 'واتساب', value: 'تواصل عبر واتساب الآن', href: 'https://wa.me/966555000000' },
    { icon: MapPin, label: 'الموقع', value: 'المملكة العربية السعودية', href: '#' },
    { icon: Mail, label: 'البريد الإلكتروني', value: 'info@aamarshades.com', href: 'mailto:info@aamarshades.com' },
]

export default function RequestPage() {
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

                            {/* Quick actions */}
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <a href="tel:+966555000000" className="flex-1">
                                    <Button size="lg" className="w-full">
                                        <PhoneCall size={18} />
                                        اتصل الآن
                                    </Button>
                                </a>
                                <a href="https://wa.me/966555000000?text=أريد طلب عرض سعر" target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" size="lg" className="w-full">
                                        <MessageCircle size={18} />
                                        واتساب
                                    </Button>
                                </a>
                            </div>
                        </div>

                        {/* Form placeholder */}
                        <div className="bg-secondary rounded-2xl p-8 border border-border">
                            <h2 className="text-xl font-bold text-primary mb-6">أرسل طلبك</h2>
                            <div className="space-y-5">
                                {[
                                    { label: 'الاسم الكامل', type: 'text', placeholder: 'أدخل اسمك' },
                                    { label: 'رقم الجوال', type: 'tel', placeholder: '05xxxxxxxx' },
                                    { label: 'المدينة', type: 'text', placeholder: 'مثال: الرياض' },
                                ].map((f) => (
                                    <div key={f.label}>
                                        <label className="block text-sm font-semibold text-primary mb-1.5">{f.label}</label>
                                        <input
                                            type={f.type}
                                            placeholder={f.placeholder}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-1.5">نوع الخدمة المطلوبة</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent/50">
                                        <option value="">اختر الخدمة</option>
                                        <option>مظلات السيارات</option>
                                        <option>الهناجر</option>
                                        <option>برجولات الحدائق</option>
                                        <option>الجلسات الخارجية</option>
                                        <option>سواتر الحوش</option>
                                        <option>كلادينج الواجهات</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-1.5">ملاحظات إضافية</label>
                                    <textarea
                                        rows={4}
                                        placeholder="صف مشروعك أو احتياجاتك..."
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                                    />
                                </div>
                                <Button className="w-full" size="lg">إرسال الطلب</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
