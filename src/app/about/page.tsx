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
    {
        icon: Award,
        title: 'الخبرة والاحترافية',
        desc: 'فريق مؤهل ومدرب على أحدث تقنيات وأساليب التركيب والتصميم.',
    },
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
                            نحن فريق متخصص في حلول التظليل والهياكل الخارجية في المملكة، نعمل في المواقع والورش
                            يوميًا لضمان أن كل مشروع يُسلَّم بالجودة التي نعد بها، وكأنه في بيتنا قبل أن يكون في
                            بيتك.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Story + Human visual */}
            <section className="py-20 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <SectionHeading title="قصتنا" subtitle="من فريق ميداني إلى مرجع صناعي" />
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    بدأت رحلتنا قبل أكثر من خمس عشرة سنة بهدف واضح: تقديم حلول تظليل وهياكل خارجية
                                    تجمع بين المتانة والجماليات، وتخدم احتياجات السوق السعودي المتنامية.
                                </p>
                                <p>
                                    اليوم، ننفذ مشاريعنا يومياً في المواقع والورش، من المنازل الخاصة إلى المشاريع
                                    التجارية والصناعية، مع حضور مباشر للفريق ومسؤولية كاملة عن النتيجة النهائية.
                                </p>
                                <p>
                                    فريقنا من المهندسين والفنيين المتخصصين يرافق مشروعك من أول زيارة ميدانية وحتى
                                    التسليم، مع تواصل مستمر وشرح واضح لما يتم في كل مرحلة.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 border border-border">
                            <div className="absolute inset-0 bg-[url('/images/about-workshop-placeholder.jpg')] bg-cover bg-center opacity-80" />
                            <div className="relative z-10 w-full h-full bg-gradient-to-t from-black/40 to-black/5 flex items-end">
                                <div className="p-6">
                                    <p className="text-white text-sm font-semibold">
                                        لقطة من أرض الواقع أثناء تجهيز وتركيب أحد مشاريع المظلات.
                                    </p>
                                </div>
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
                            <div
                                key={title}
                                className="bg-white rounded-xl p-6 border border-border hover:border-accent/30 hover:shadow-lg transition-all"
                            >
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

            {/* Why us + practical trust */}
            <section className="py-20 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <SectionHeading
                                title="لماذا نحن الخيار الأول؟"
                                subtitle="مميزات تجعل عمار للمظلات شريكًا عمليًا في موقعك"
                            />
                            <div className="mt-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    في مواقع العمل نحرص على احترام خصوصية المكان والجيران، وتنظيم منطقة العمل بحيث
                                    لا تعطل حركة ساكني الموقع أو مرتاديه.
                                </p>
                                <p>
                                    نلتزم بتنظيف الموقع بعد الانتهاء من التنفيذ وإزالة المخلفات الناتجة عن التركيب،
                                    حتى تستلم مشروعك جاهزًا للاستخدام دون عناء إضافي.
                                </p>
                                <p>
                                    طوال فترة المشروع نبقى على تواصل معك عبر الهاتف أو الرسائل، لتكون مطّلعًا على
                                    ما يتم أولاً بأول وتطمئن لسير العمل.
                                </p>
                            </div>
                        </div>
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
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            إذا كنت تبحث عن فريق ينفذ مشروعك كما لو كان في بيته
                        </h2>
                        <p className="text-white/70 mb-8">
                            يسعدنا الحديث معك والتعرّف على تفاصيل مشروعك القادم في التظليل أو الواجهات.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/request">
                                <Button size="lg" className="w-full sm:w-auto">
                                    طلب عرض سعر
                                </Button>
                            </Link>
                            <Link href="https://wa.me/966538314660" target="_blank">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto border-white/40 text-white hover:bg-white hover:text-primary"
                                >
                                    تواصل عبر واتساب
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
