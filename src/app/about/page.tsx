import { Shield, Award, Users, CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
    title: 'من نحن',
    description: 'تعرف على شركة عمار للمظلات وخبرتها الطويلة في مجال أنظمة التظليل والهياكل الخارجية.',
}

const values = [
    { icon: Shield, title: 'الجودة أولاً', desc: 'لا نتنازل عن معايير الجودة في أي مرحلة من مراحل التنفيذ.' },
    { icon: Award, title: 'الخبرة والاحترافية', desc: 'فريق مؤهل ومدرب على أحدث تقنيات وأساليب التركيب والتصميم.' },
    { icon: Users, title: 'خدمة العملاء', desc: 'نرافق عملاءنا من أول استشارة حتى آخر لحمة في المشروع.' },
    { icon: CheckCircle, title: 'الالتزام بالمواعيد', desc: 'نحترم وقتك ونلتزم بالجداول الزمنية المتفق عليها دون تساهل.' },
]

const whyUs = [
    'أكثر من 500 مشروع منجز في مختلف مناطق المملكة',
    'استخدام أجود خامات الحديد والألمنيوم والأقمشة المعتمدة',
    'فريق هندسي متخصص يضمن سلامة الإنشاء',
    'ضمان شامل على الهياكل الإنشائية',
    'أسعار تنافسية مع إمكانية التقسيط',
    'خدمة صيانة دورية ما بعد التسليم',
]

export default function AboutPage() {
    return (
        <>
            {/* Page Header */}
            <section className="bg-primary py-16 md:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">من نحن</h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            عمار للمظلات — شركة سعودية رائدة في مجال تصميم وتركيب أنظمة التظليل والهياكل الخارجية بمعايير اختبارية صارمة.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Story */}
            <section className="py-20 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <SectionHeading title="قصتنا" subtitle="من فكرة إلى مرجع صناعي" />
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    بدأت رحلتنا قبل أكثر من خمس عشرة سنة بهدف واحد واضح: تقديم حلول تظليل تجمع بين المتانة والجماليات، تلبيةً لاحتياجات السوق السعودي المتنامية.
                                </p>
                                <p>
                                    اليوم، نفخر بقاعدة عملاء واسعة تمتد من المنازل الخاصة إلى المشاريع التجارية والصناعية الكبرى، محافظين في كل خطوة على الجودة التي بنينا عليها سمعتنا.
                                </p>
                                <p>
                                    فريقنا من المهندسين والفنيين المتخصصين يضمن تنفيذ كل مشروع وفق أعلى المواصفات الفنية وبإشراف هندسي دقيق من مرحلة التصميم حتى التسليم.
                                </p>
                            </div>
                        </div>
                        {/* Placeholder visual */}
                        <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 border border-border flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🏗️</div>
                                <p className="text-muted-foreground text-sm">صورة المشاريع</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Values */}
            <section className="py-20 bg-secondary">
                <Container>
                    <SectionHeading title="قيمنا" subtitle="المبادئ التي تحكم كل قرار نتخذه" centered />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-xl p-6 border border-border hover:border-accent/30 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                                    <Icon size={24} className="text-accent" />
                                </div>
                                <h3 className="font-bold text-primary mb-2">{title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Why us */}
            <section className="py-20 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <SectionHeading title="لماذا نحن الخيار الأول؟" subtitle="مميزات تجعل عمار للمظلات شريكك الأمثل" />
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {whyUs.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary">
                <Container>
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">جاهزون لخدمتكم</h2>
                        <p className="text-white/70 mb-8">تواصلوا معنا لمناقشة متطلبات مشروعكم</p>
                        <Link href="/request">
                            <Button size="lg">طلب استشارة مجانية</Button>
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    )
}
