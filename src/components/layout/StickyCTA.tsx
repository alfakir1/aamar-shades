'use client'

import { Phone, MessageCircle } from 'lucide-react'

export function StickyCTA({ settings }: { settings: any }) {
    const phone = settings?.phone || '+966 53 831 4660'
    const whatsapp = settings?.whatsapp || phone
    const WHATSAPP_MESSAGE = encodeURIComponent('مرحباً، أود الاستفسار عن خدماتكم')

    return (
        <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-3" style={{ direction: 'ltr' }}>
            {/* WhatsApp */}
            <a
                href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl text-white transition-transform hover:scale-110 active:scale-95"
                style={{ backgroundColor: '#25D366' }}
                aria-label="تواصل عبر واتساب"
            >
                <MessageCircle size={26} fill="white" strokeWidth={0} />
            </a>

            {/* Phone */}
            <a
                href={`tel:${phone}`}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
                aria-label="اتصل بنا"
            >
                <Phone size={22} />
            </a>
        </div>
    )
}
