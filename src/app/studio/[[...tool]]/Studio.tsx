'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { isValidProjectId, projectId } from '@/sanity/env'

export function Studio() {
    if (!isValidProjectId) {
        return (
            <div className="flex h-screen items-center justify-center p-6 text-center" dir="rtl" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                <div className="max-w-md space-y-4">
                    <h1 className="text-2xl font-bold">إعداد Sanity مطلوب</h1>
                    <p className="text-muted-foreground">
                        قيمة <code className="bg-zinc-100 px-1 rounded border">NEXT_PUBLIC_SANITY_PROJECT_ID</code> ({projectId || 'فارغة'}) غير صالحة.
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-600">
                        Sanity يتطلب Project ID يتكون من أحرف وأرقام وشرطات فقط. يرجى الحصول عليه من لوحة تحكم Sanity وإضافته في ملف <code className="bg-zinc-100 px-1 rounded border">.env.local</code>.
                    </p>
                    <div className="pt-4">
                        <a href="https://sanity.io" target="_blank" className="inline-block bg-accent text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-colors">
                            انتقل إلى Sanity.io
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    return <NextStudio config={config} />
}
