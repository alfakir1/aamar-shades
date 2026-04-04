'use client'

import { useState } from 'react'
import { MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './Button'

interface RequestFormProps {
    whatsappNumber: string
    serviceSlug?: string
    serviceCoverImage?: string
    siteUrl?: string
    serviceOptions?: string[]
}

const DEFAULT_SERVICES = [
    'مظلات السيارات',
    'الهناجر',
    'برجولات الحدائق',
    'الجلسات الخارجية',
    'سواتر الحوش',
    'سواتر حماية',
    'ساندوتش بانل',
    'كلادينج الواجهات',
]

export function RequestForm({ whatsappNumber, serviceSlug, serviceCoverImage, siteUrl = 'https://maalim-al-dhil.com', serviceOptions }: RequestFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        service: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            // Save to database
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    message: `المدينة: ${formData.city}\nالخدمة: ${formData.service}\n${formData.message}`.trim(),
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'خطأ غير متوقع')
            }

            setStatus('success')

            // Build WhatsApp message - including service URL which will show cover image as link preview in WhatsApp
            const selectedSlug = serviceSlug || undefined
            const serviceUrl = selectedSlug ? `${siteUrl}/services/${selectedSlug}` : ''

            const messageParts = [
                `*طلب خدمة جديد*`,
                `*الاسم:* ${formData.name}`,
                `*الجوال:* ${formData.phone}`,
                `*المدينة:* ${formData.city}`,
                `*الخدمة:* ${formData.service}`,
                formData.message ? `*الرسالة:* ${formData.message}` : '',
                serviceUrl ? `\nرابط الخدمة: ${serviceUrl}` : '',
            ].filter(Boolean).join('%0A')

            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${messageParts}`
            window.open(whatsappUrl, '_blank')

            // Reset form
            setFormData({ name: '', phone: '', city: '', service: '', message: '' })
        } catch (err) {
            setStatus('error')
            setErrorMsg(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الطلب')
        }
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <CheckCircle size={56} className="text-green-500" />
                <h3 className="text-xl font-bold text-primary">تم إرسال طلبك بنجاح!</h3>
                <p className="text-muted-foreground text-sm">سيتم التواصل معك قريباً. كما تم فتح واتساب لتواصل أسرع.</p>
                <Button variant="outline" onClick={() => setStatus('idle')}>إرسال طلب جديد</Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">الاسم الكامل</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">رقم الجوال</label>
                <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05xxxxxxxx"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">المدينة</label>
                <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="مثال: الرياض"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">نوع الخدمة المطلوبة</label>
                <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                    <option value="">اختر الخدمة</option>
                    {(serviceOptions ?? DEFAULT_SERVICES).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">ملاحظات إضافية</label>
                <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="صف مشروعك أو احتياجاتك..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                </div>
            )}

            <Button type="submit" className="w-full gap-2" size="lg" disabled={status === 'loading'}>
                {status === 'loading' ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        جاري الإرسال...
                    </>
                ) : (
                    <>
                        <MessageCircle size={20} />
                        إرسال الطلب
                    </>
                )}
            </Button>
        </form>
    )
}
