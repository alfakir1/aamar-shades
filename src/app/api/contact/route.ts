import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, phone, serviceId, message } = body

        // Validate required fields
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ error: 'الاسم مطلوب' }, { status: 400 })
        }
        if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
            return NextResponse.json({ error: 'رقم الهاتف مطلوب' }, { status: 400 })
        }

        const contactRequest = await prisma.contactRequest.create({
            data: {
                name: name.trim(),
                phone: phone.trim(),
                serviceId: serviceId || null,
                message: message?.trim() || null,
            },
        })

        return NextResponse.json(
            { success: true, id: contactRequest.id },
            { status: 201 }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.' },
            { status: 500 }
        )
    }
}
