import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma'
import fs from 'fs'
import path from 'path'

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Helper to find file with different extensions
function findImagePath(basePath: string, fileName: string): string | null {
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.PNG', '.JPG', '.JPEG', '.WEBP'];
  for (const ext of extensions) {
    const fullPath = path.join(process.cwd(), 'public', basePath, fileName + ext);
    if (fs.existsSync(fullPath)) {
      return `/${basePath}/${fileName}${ext}`;
    }
  }
  // Check without hyphen or with different naming convention
  return null;
}

async function main() {
  console.log('🌱 Starting database seed with real images...')

  // 1. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings-1' },
    update: {
      companyName: 'عمار للمظلات',
      phone: '+966538314660',
      whatsapp: '+966538314660',
      email: 'info@aamar-shades.com',
      address: 'الرياض، المملكة العربية السعودية',
      defaultSeoTitle: 'عمار للمظلات | تركيب مظلات وسواتر وهناجر بجودة عالية',
      defaultSeoDescription: 'متخصصون في تركيب مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات بأعلى المعايير وأفضل الأسعار.',
    },
    create: {
      id: 'settings-1',
      companyName: 'عمار للمظلات',
      phone: '+966538314660',
      whatsapp: '+966538314660',
      email: 'info@aamar-shades.com',
      address: 'الرياض، المملكة العربية السعودية',
      defaultSeoTitle: 'عمار للمظلات | تركيب مظلات وسواتر وهناجر بجودة عالية',
      defaultSeoDescription: 'متخصصون في تركيب مظلات السيارات، الهناجر، البرجولات، الجلسات الخارجية، السواتر، وكلادينج الواجهات بأعلى المعايير وأفضل الأسعار.',
    },
  })

  // 2. Services Data
  const services = [
    {
      slug: 'car-shades',
      title: 'مظلات السيارات',
      shortDescription: 'حماية مثالية لسيارتك من أشعة الشمس والعوامل الجوية على مدار العام.',
      description: 'نقدم في عمار للمظلات حلولاً متكاملة لمظلات السيارات التي تجمع بين الجمال والوظيفة. تُصنَّع مظلاتنا من أفضل الخامات المقاومة للأشعة فوق البنفسجية والصدأ، مما يضمن حماية دائمة لطلاء سيارتك وداخلها من الحرارة الشديدة. نوفر تصاميم متعددة تلائم كافة الأذواق والمساحات سواء كانت مداخل المنازل أو المواقف التجارية.',
      featured: true,
      displayOrder: 1,
    },
    {
      slug: 'hangars',
      title: 'الهناجر',
      shortDescription: 'بناء وتنفيذ هناجر صناعية وتجارية بهياكل حديدية متينة.',
      description: 'نتميز في تصميم وتنفيذ الهناجر الصناعية والتجارية بمعايير هندسية عالية الجودة. نستخدم هياكل فولاذية مجلفنة مقاومة للصدأ مغطاة بأنواع الصاج المعزول حرارياً وصوتياً. تُبنى هناجرنا لتلبية احتياجات المصانع والمستودعات والمشاريع الزراعية بمساحات مرنة قابلة للتخصيص.',
      featured: true,
      displayOrder: 2,
    },
    {
      slug: 'pergolas',
      title: 'برجولات الحدائق',
      shortDescription: 'برجولات خشبية وحديدية تمنح حديقتك طابعاً جمالياً راقياً.',
      description: 'تُعدّ البرجولات من أبرز عناصر تصميم الحدائق والأسطح الحديثة. نصمم ونركب في عمار للمظلات برجولات بأسلوبين كلاسيكي وعصري تناسب الأحواش والروف والمناطق الخارجية. نستخدم خشب الـ WPC المقاوم للرطوبة أو حديد مطلي بمساحيق كهروستاتيكية لضمان أطول عمر ممكن مع الحفاظ على الجماليات.',
      featured: true,
      displayOrder: 3,
    },
    {
      slug: 'outdoor-seating',
      title: 'الجلسات الخارجية',
      shortDescription: 'تجهيز مناطق الجلوس الخارجية بتصاميم مريحة وعصرية.',
      description: 'نحول مساحاتك الخارجية إلى أماكن استرخاء تجمع الأناقة والراحة. تشمل جلساتنا الخارجية إنشاء السقائف، أسقف مؤجلة، جدران خشبية، وتوريد جلسات مائلة تتحمل عوامل الطقس قسوة. نهتم بكل تفصيل من الإضاءة حتى الديكورات الجانبية لتقديم بيئة ترفيهية متكاملة تليق بعائلتك.',
      featured: true,
      displayOrder: 4,
    },
    {
      slug: 'privacy-screens',
      title: 'سواتر الحوش',
      shortDescription: 'سواتر توفر الخصوصية والأمان لمحيط منزلك بأذواق مختلفة.',
      description: 'نوفر في عمار للمظلات أنواعاً متعددة من السواتر المصممة لحجب الرؤية وتوفير الخصوصية الكاملة. تشمل السواتر القماشية المقاومة للرياح، والحديدية المطلية، وألواح الـ PVC ذات التصاميم الأنيقة. نحرص على أن تنسجم السواتر مع هوية المبنى المعمارية مع ضمان المتانة في الاستخدام.',
      featured: false,
      displayOrder: 5,
    },
    {
      slug: 'facade-cladding',
      title: 'كلادينج الواجهات',
      shortDescription: 'تركيب كلادينج الواجهات لإضفاء طابع الفخامة على مبناك.',
      description: 'يُعدّ كلادينج الواجهات حلاً مثالياً لمنح المباني التجارية والسكنية مظهراً عصرياً يعكس الهوية البصرية للمشروع. نستخدم في عمار للمظلات ألواح كلادينج مقاومة للحريق والتشقق والرطوبة بأكثر من 50 لوناً وتشطيباً. نقدم الاستشارة الكاملة من التصميم ثلاثي الأبعاد حتى التركيب النهائي.',
      featured: false,
      displayOrder: 6,
    },
  ]

  for (const s of services) {
    // Try to find cover image in gallery (since user put them there) or services
    const coverPath = findImagePath('temp/gallery', s.slug) || findImagePath('temp/services', s.slug) || '/temp/services/' + s.slug + '.jpg';

    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        ...s,
        coverImage: coverPath,
      },
      create: {
        ...s,
        coverImage: coverPath,
      },
    })

    // Seed Service Images (usually from gallery)
    for (let i = 1; i <= 2; i++) {
      // User naming: car-shades1.webp
      const imgPath = findImagePath('temp/gallery', `${s.slug}${i}`) || findImagePath('temp/gallery', `${s.slug}-${i}`) || `/temp/gallery/${s.slug}${i}.jpg`;

      await prisma.serviceImage.upsert({
        where: { id: `img-${s.slug}-${i}` },
        update: {
          imageUrl: imgPath,
          altText: `${s.title} - صورة ${i}`,
          displayOrder: i,
        },
        create: {
          id: `img-${s.slug}-${i}`,
          serviceId: service.id,
          imageUrl: imgPath,
          altText: `${s.title} - صورة ${i}`,
          displayOrder: i,
        }
      })
    }

    // Seed Gallery Category
    const category = await prisma.galleryCategory.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        displayOrder: s.displayOrder,
      },
      create: {
        title: s.title,
        slug: s.slug,
        displayOrder: s.displayOrder,
      }
    })

    // Seed Gallery Items
    for (let i = 1; i <= 2; i++) {
      const imgPath = findImagePath('temp/gallery', `${s.slug}${i}`) || findImagePath('temp/gallery', `${s.slug}-${i}`) || `/temp/gallery/${s.slug}${i}.jpg`;

      await prisma.galleryItem.upsert({
        where: { id: `gallery-${s.slug}-${i}` },
        update: {
          title: `${s.title} - مشروع ${i}`,
          imageUrl: imgPath,
          altText: `معرض أعمال ${s.title} - نموذج ${i}`,
        },
        create: {
          id: `gallery-${s.slug}-${i}`,
          categoryId: category.id,
          title: `${s.title} - مشروع ${i}`,
          imageUrl: imgPath,
          altText: `معرض أعمال ${s.title} - نموذج ${i}`,
        }
      })
    }
  }

  // 3. Blog Posts
  const posts = [
    {
      slug: 'car-shades-importance-summer',
      title: 'أهمية تركيب مظلات السيارات في الصيف',
      excerpt: 'تعرف على الفوائد العديدة لتركيب مظلة سيارة احترافية وكيف تحافظ على سيارتك وتقلل من تكاليف الصيانة.',
      content: `تُعدّ الحرارة الشديدة من أبرز التحديات التي تواجه أصحاب السيارات خلال فصل الصيف. وجود مظلة متينة وعالية الجودة ليس رفاهية بل ضرورة...\n\nللحجز تواصل معنا بمؤسسة عمار.`,
      coverImage: findImagePath('temp/posts', 'car-shades-summer') || findImagePath('temp/gallery', 'car-shades') || '/temp/posts/car-shades-summer.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'how-to-choose-pergola',
      title: 'كيف تختار البرجولة المثالية لحديقتك؟',
      excerpt: 'دليل شامل لمساعدتك على اختيار نوع وحجم وتصميم البرجولة المناسبة بما يتوافق مع مساحتك وميزانيتك.',
      content: `البرجولة ليست مجرد سقف إضافي، بل هي مساحة حياتية تزيد من قيمة منزلك وتمنحك مكانًا مريحًا في الهواء الطلق...\n\nمؤسسة عمار للمظلات.`,
      coverImage: findImagePath('temp/posts', 'choosing-pergola') || findImagePath('temp/gallery', 'pergolas') || '/temp/posts/choosing-pergola.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'facade-cladding-benefits-commercial',
      title: 'أبرز مميزات كلادينج الواجهات للمباني التجارية',
      excerpt: 'اكتشف لماذا يُعدّ كلادينج الواجهات الخيار الأمثل لتحديث المباني التجارية وتعزيز هويتها البصرية.',
      content: `في بيئة تجارية تنافسية، يلعب المظهر الخارجي للمبنى دوراً محورياً في استقطاب العملاء. يُقدّم كلادينج الواجهات مزايا عديدة...\n\nمؤسسة عمار للمواصفات القياسية.`,
      coverImage: findImagePath('temp/posts', 'cladding-benefits') || findImagePath('temp/gallery', 'facade-cladding') || '/temp/posts/cladding-benefits.jpg',
      publishedAt: new Date(),
    },
  ]

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  console.log('✅ Database seeded successfully with found image extensions.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
