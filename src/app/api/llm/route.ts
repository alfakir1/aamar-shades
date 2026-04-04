import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: 'asc' },
      select: {
        title: true,
        shortDescription: true,
        slug: true,
      }
    })

    const companyName = settings?.companyName || 'معالم الظل'
    const phone = settings?.phone || '+966538314660'
    const whatsapp = settings?.whatsapp || '+966538314660'
    const email = settings?.email || 'info@maalim-al-dhil.com'
    const address = settings?.address || 'الرياض، المملكة العربية السعودية'

    let content = `# ${companyName} - دليل شامل للخدمات

## معلومات الشركة
- **الاسم**: ${companyName}
- **المجال**: خدمات التظليل والحماية الخارجية
- **الموقع**: ${address}
- **الهاتف**: ${phone}
- **واتساب**: ${whatsapp}
- **البريد الإلكتروني**: ${email}
- **الموقع الإلكتروني**: https://maalim-al-dhil.com

## قائمة الخدمات (مع أوصاف غنية بالكلمات المفتاحية)

`

    services.forEach(service => {
      content += `### ${service.title}
${service.shortDescription || 'وصف الخدمة'}

`
    })

    content += `## روابط الصفحات المهمة
- الصفحة الرئيسية: /
- الخدمات: /services
- المعرض: /gallery
- التحديثات والمقالات: /updates
- طلب خدمة: /request
- الأسئلة الشائعة: /faq
- معلومات عنا: /about

## الأسئلة الشائعة (بصيغة نصية بسيطة)

س: ما هي أنواع المظلات التي تقدمونها؟
ج: نقدم مظلات سيارات، حدائق، مسابح، أسطح، ومتحركة بمواد مقاومة للعوامل الجوية.

س: كم يستغرق تركيب مظلة سيارة؟
ج: من 2-4 ساعات حسب الحجم مع ضمان على الجودة.

س: هل توفرون ضمان؟
ج: نعم، ضمان شامل يصل إلى 5 سنوات حسب المنتج.

س: ما هي مواد السواتر؟
ج: قماش أوروبي، حديد سعودي، خشب معالج، وبلاستيك مقاوم.

س: هل تقدمون صيانة؟
ج: نعم، صيانة دورية وإصلاح فوري على مدار الساعة.

س: ما هي مناطق الخدمة؟
ج: جميع مناطق السعودية مع تركيز على الرياض، جدة، الدمام.

س: كيف أطلب عرض أسعار؟
ج: اتصل بنا أو أرسل عبر واتساب أو النموذج الإلكتروني.

س: هل المواد صديقة للبيئة؟
ج: نعم، نحرص على استخدام مواد صديقة للبيئة ومستدامة.
`

    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error generating LLM content:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}