'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from './Button'

export function RequestForm({ whatsappNumber }: { whatsappNumber: string }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        service: '',
        message: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const text = `*طلب خدمة جديد*%0A
*الاسم:* ${formData.name}%0A
*الجوال:* ${formData.phone}%0A
*المدينة:* ${formData.city}%0A
*الخدمة:* ${formData.service}%0A
*الرسالة:* ${formData.message}`

        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${text}`
        window.open(whatsappUrl, '_blank')
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
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="صف مشروعك أو احتياجاتك..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
            </div>
            <Button type="submit" className="w-full gap-2" size="lg">
                <MessageCircle size={20} />
                إرسال الطلب عبر واتساب
            </Button>
        </form>
    )
}
