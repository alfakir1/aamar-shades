import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: 'asc' },
      select: { title: true, shortDescription: true },
    })

    const companyName = settings?.companyName || 'معالم الظل'
    const phone = settings?.phone || '+966538314660'
    const whatsapp = settings?.whatsapp || '+966538314660'
    const email = settings?.email || 'info@maalim-al-dhil.com'
    const address = settings?.address || 'الرياض، المملكة العربية السعودية'

    let content = `# ${companyName} - دليل شامل للخدمات\n\n`
    content += `## معلومات الشركة\n`
    content += `- **الاسم**: ${companyName}\n`
    content += `- **المجال**: خدمات التظليل والهياكل الخارجية\n`
    content += `- **الموقع**: ${address}\n`
    content += `- **الهاتف**: ${phone}\n`
    content += `- **واتساب**: ${whatsapp}\n`
    content += `- **البريد الإلكتروني**: ${email}\n`
    content += `- **الموقع الإلكتروني**: https://maalim-al-dhil.com\n\n`
    content += `## قائمة الخدمات (مع أوصاف غنية بالكلمات المفتاحية)\n\n`

    services.forEach((service) => {
      content += `### ${service.title}\n`
      content += `${service.shortDescription || 'خدمة احترافية مع وصف مفصل عند التحديث.'}\n\n`
    })

    content += `## روابط الصفحات المهمة\n`
    content += `- الصفحة الرئيسية: /\n`
    content += `- الخدمات: /services\n`
    content += `- المعرض: /gallery\n`
    content += `- التحديثات والمقالات: /updates\n`
    content += `- طلب خدمة: /request\n`
    content += `- الأسئلة الشائعة: /faq\n`
    content += `- آراء العملاء: /testimonials\n\n`
    content += `## الأسئلة الشائعة (بصيغة نصية بسيطة)\n\n`
    content += `س: ما هي أنواع المظلات التي تقدمونها؟\n`
    content += `ج: نقدم مظلات سيارات، حدائق، مسابح، أسطح، ومتحركة بمواد مقاومة للعوامل الجوية.\n\n`
    content += `س: كم يستغرق تركيب مظلة سيارة؟\n`
    content += `ج: من 2-4 ساعات حسب الحجم مع ضمان على الجودة.\n\n`
    content += `س: هل توفرون ضمان؟\n`
    content += `ج: نعم، ضمان شامل يصل إلى 5 سنوات حسب المنتج.\n\n`
    content += `س: ما هي مواد السواتر؟\n`
    content += `ج: قماش أوروبي، حديد سعودي، خشب معالج، وبلاستيك مقاوم.\n\n`
    content += `س: هل تقدمون صيانة؟\n`
    content += `ج: نعم، صيانة دورية وإصلاح فوري على مدار الساعة.\n\n`
    content += `س: ما هي مناطق الخدمة؟\n`
    content += `ج: جميع مناطق السعودية مع تركيز على الرياض، جدة، الدمام.\n\n`
    content += `س: كيف أطلب عرض أسعار؟\n`
    content += `ج: اتصل بنا أو أرسل عبر واتساب أو النموذج الإلكتروني.\n\n`
    content += `س: هل المواد صديقة للبيئة؟\n`
    content += `ج: نعم، نحرص على استخدام مواد صديقة للبيئة ومستدامة.\n`

    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error generating LLM content:', error)
    return NextResponse.json({ error: 'Failed to generate llm.txt content' }, { status: 500 })
  }
}
