import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import prisma from '@/lib/prisma'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'آراء العملاء | معالم الظل',
  description: 'اقرأ آراء عملائنا الراضين عن خدمات معالم الظل في مجال المظلات والسواتر والهناجر في السعودية.',
  keywords: ['آراء العملاء', 'مراجعات', 'عملاء راضون', 'معالم الظل'],
}

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <Container>
      <div className="py-16">
        <SectionHeading
          title="آراء عملائنا"
          subtitle="نفخر بثقة عملائنا ونجاح مشاريعهم معنا"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                {testimonial.position && testimonial.company && (
                  <div className="text-sm text-gray-600">
                    {testimonial.position} - {testimonial.company}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}