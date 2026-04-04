import { PrismaClient } from '../src/generated/prisma'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

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
  console.log('Starting database seed with internet images...')

  // 1. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings-1' },
    update: {
      companyName: 'معالم الظل',
      phone: '+966538314660',
      whatsapp: '+966538314660',
      email: 'info@maalim-al-dhil.com',
      address: 'الرياض، المملكة العربية السعودية',
      defaultSeoTitle: 'معالم الظل | حلول مظلات وسواتر وهناجر متكاملة',
      defaultSeoDescription: 'معالم الظل تقدم مظلات السيارات، السواتر، الهناجر، البرجولات، الجلسات الخارجية، الساندوتش بانل، والكلادينج في السعودية.',
    },
    create: {
      id: 'settings-1',
      companyName: 'معالم الظل',
      phone: '+966538314660',
      whatsapp: '+966538314660',
      email: 'info@maalim-al-dhil.com',
      address: 'الرياض، المملكة العربية السعودية',
      defaultSeoTitle: 'معالم الظل | حلول مظلات وسواتر وهناجر متكاملة',
      defaultSeoDescription: 'معالم الظل تقدم مظلات السيارات، السواتر، الهناجر، البرجولات، الجلسات الخارجية، الساندوتش بانل، والكلادينج في السعودية.',
    },
  })

  // 2. Services Data
  const services = [
    {
      slug: 'car-shades',
      title: 'مظلات السيارات',
      shortDescription: 'حماية مثالية لسيارتك من أشعة الشمس والعوامل الجوية على مدار العام.',
      description: 'معالم الظل تقدم مظلات سيارات مميزة من مواد مقاومة للأشعة فوق البنفسجية والصدأ، مع تصاميم تناسب مواقف المنازل والمشاريع التجارية.',
      featured: true,
      displayOrder: 1,
    },
    {
      slug: 'hangars',
      title: 'الهناجر',
      shortDescription: 'هناجر صناعية وتجارية بهياكل فولاذية متينة وعازلة.',
      description: 'نصمم وننفذ هناجر عالية الجودة باستخدام هياكل مجلفنة وساندوتش بانل عند الطلب، لتلبية متطلبات التخزين والمصانع والمشاريع التجارية.',
      featured: true,
      displayOrder: 2,
    },
    {
      slug: 'pergolas',
      title: 'برجولات الحدائق',
      shortDescription: 'برجولات حدائق أنيقة تجمع بين المتانة والجمال.',
      description: 'نصنع برجولات مصممة بعناية مع مواد مقاومة للرطوبة والتآكل، لتمنح حديقتك مساحة جلوس خارجية راقية ومريحة.',
      featured: true,
      displayOrder: 3,
    },
    {
      slug: 'outdoor-seating',
      title: 'الجلسات الخارجية',
      shortDescription: 'مساحات جلوس خارجية مريحة تناسب السكني والتجاري.',
      description: 'نُجهّز مناطق الجلوس الخارجية بأسقف وظلال وأنظمة فنية مبتكرة لتضمن راحة استخدام استثنائية ومظهراً عصرياً للمكان.',
      featured: true,
      displayOrder: 4,
    },
    {
      slug: 'privacy-screens',
      title: 'سواتر الحوش',
      shortDescription: 'سواتر حماية وخصوصية عالية الجودة لمحيط منزلك.',
      description: 'نركب سواتر حماية بتصاميم متعددة، من القماش المقاوم للرياح إلى ألواح PVC المخصصة، لتأمين الخصوصية والمظهر الجمالي للخارجية.',
      featured: true,
      displayOrder: 5,
    },
    {
      slug: 'security-screens',
      title: 'سواتر حماية',
      shortDescription: 'سواتر حماية متينة توفر أماناً بصرياً وخصوصية للمساحات الخارجية.',
      description: 'سواتر حماية متقدمة تمنحك حماية من الرياح، الغبار، والتطفل البصري مع تصميم أنيق يناسب الواجهات والممرات الخارجية.',
      featured: false,
      displayOrder: 6,
    },
    {
      slug: 'sandwich-panel',
      title: 'ساندوتش بانل',
      shortDescription: 'ساندوتش بانل للعزل الحراري والصناعي في المنشآت.',
      description: 'نقدم حلول ساندوتش بانل عالية الأداء للجدران والأسقف الصناعية والتجارية، مع قدرات عزل حراري وصوتي وتصاميم سهلة التركيب.',
      featured: false,
      displayOrder: 7,
    },
    {
      slug: 'facade-cladding',
      title: 'كلادينج الواجهات',
      shortDescription: 'تركيب واجهات كلادينج أنيقة تحمي المبنى وتعزّز مظهره.',
      description: 'كلادينج الواجهات من معالم الظل يقدم تشطيبات عصرية مقاومة للعوامل الجوية، مع خيارات ألوان ومواد متعددة تناسب المشاريع السكنية والتجارية.',
      featured: false,
      displayOrder: 8,
    },
    {
      slug: 'tents',
      title: 'بيوت الشعر',
      shortDescription: 'خيام ثابتة ومتنقلة للمخيمات والفلل والمناسبات الخاصة.',
      description: 'نقدم بيوت شعر عالية الجودة بتصاميم ملكية وعصرية، مقاومة للرياح والأمطار، مثالية للمخيمات، الفلل، والفعاليات الخارجية. كلمات مفتاحية: خيام ثابتة، بيوت شعر ملكية، خيام مخيمات، خيام فلل، خيام مناسبات.',
      featured: true,
      displayOrder: 9,
    },
    {
      slug: 'roof-tiles',
      title: 'القرميد',
      shortDescription: 'قرميد إيطالي وأسباني ووطني بألوان متنوعة للأسقف.',
      description: 'نقدم قرميد فاخر من أفضل المصانع الإيطالية والأسبانية والسعودية، بألوان وأشكال متنوعة لتغطية الأسقف بأناقة ومتانة. كلمات مفتاحية: قرميد إيطالي، قرميد أسباني، قرميد سعودي، تغطية أسقف، قرميد ملون.',
      featured: false,
      displayOrder: 10,
    },
    {
      slug: 'pyramid-shades',
      title: 'مظلات هرمية',
      shortDescription: 'مظلات مسابح هرمية لحماية من الشمس والغبار.',
      description: 'مظلات هرمية متخصصة للمسابح والحدائق، مصممة بأحدث الخامات للحماية الكاملة من أشعة الشمس والغبار والأتربة. كلمات مفتاحية: مظلات مسابح، مظلات هرمية، حماية من الشمس، مظلات حدائق هرمية.',
      featured: false,
      displayOrder: 11,
    },
    {
      slug: 'movable-shades',
      title: 'المظلات المتحركة',
      shortDescription: 'مظلات متحركة للأسطح والحدائق مع نظام تحكم كهربائي.',
      description: 'مظلات متحركة متقدمة للأسطح والحدائق، مع نظام تحكم كهربائي سهل الاستخدام، مثالية للتحكم في الظل حسب الحاجة. كلمات مفتاحية: مظلات متحركة، مظلات أسطح، مظلات كهربائية، مظلات حدائق متحركة.',
      featured: false,
      displayOrder: 12,
    },
    {
      slug: 'wooden-screens',
      title: 'سواتر خشبية',
      shortDescription: 'سواتر خشبية طبيعية لإضافة خصوصية وجمال للحدائق.',
      description: 'سواتر خشبية عالية الجودة لحجب الرؤية وإضافة خصوصية وحماية لمنزلك، مع تصاميم طبيعية أنيقة تناسب الحدائق والممرات. كلمات مفتاحية: سواتر خشبية، سواتر حدائق، سواتر خصوصية، سواتر خشب طبيعي.',
      featured: false,
      displayOrder: 13,
    },
    {
      slug: 'fabric-screens',
      title: 'سواتر قماش',
      shortDescription: 'سواتر قماشية أوروبية مقاومة للرياح والأمطار.',
      description: 'سواتر قماشية من أفضل الخامات الأوروبية والوطنية، مقاومة للرياح والأمطار، مثالية للحماية والخصوصية في الأحواش والحدائق. كلمات مفتاحية: سواتر قماش، سواتر مقاومة للرياح، سواتر أوروبية، سواتر حدائق قماشية.',
      featured: false,
      displayOrder: 14,
    },
    {
      slug: 'iron-screens',
      title: 'سواتر حديد',
      shortDescription: 'سواتر حديد صناعة سعودية متينة ومقاومة للصدأ.',
      description: 'سواتر حديد باستخدام أفضل الصناعات السعودية (حديد سابك)، متينة ومقاومة للصدأ، مثالية للحماية والخصوصية في المشاريع السكنية والتجارية. كلمات مفتاحية: سواتر حديد، سواتر سابك، سواتر مقاومة للصدأ، سواتر حديد سعودية.',
      featured: false,
      displayOrder: 15,
    },
  ]

  const serviceCoverImages: Record<string, string> = {
    'car-shades': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    hangars: 'https://images.unsplash.com/photo-1519846982420-5e9be6346ee6?auto=format&fit=crop&w=1400&q=80',
    pergolas: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1400&q=80',
    'outdoor-seating': 'https://images.unsplash.com/photo-1505693416388-8ce4d2e3757b?auto=format&fit=crop&w=1400&q=80',
    'privacy-screens': 'https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'security-screens': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
    'sandwich-panel': 'https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'facade-cladding': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    tents: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1400&q=80',
    'roof-tiles': 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1400&q=80',
    'pyramid-shades': 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    'movable-shades': 'https://images.unsplash.com/photo-1490122417551-3b2c26d63b6f?auto=format&fit=crop&w=1400&q=80',
    'wooden-screens': 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1400&q=80',
    'fabric-screens': 'https://images.pexels.com/photos/325576/pexels-photo-325576.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'iron-screens': 'https://images.unsplash.com/photo-1512187849-3bfe0ccd4f40?auto=format&fit=crop&w=1400&q=80',
  }

  const serviceGalleryImages: Record<string, string[]> = {
    'car-shades': [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    hangars: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490122417551-3b2c26d63b6f?auto=format&fit=crop&w=1200&q=80',
    ],
    pergolas: [
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    'outdoor-seating': [
      'https://images.unsplash.com/photo-1494526515065-37ed77c80e4b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1438354882110-43658e78f8b6?auto=format&fit=crop&w=1200&q=80',
    ],
    'privacy-screens': [
      'https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/325576/pexels-photo-325576.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    'security-screens': [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512187849-3bfe0ccd4f40?auto=format&fit=crop&w=1200&q=80',
    ],
    'sandwich-panel': [
      'https://images.pexels.com/photos/373941/pexels-photo-373941.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/374023/pexels-photo-374023.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    'facade-cladding': [
      'https://images.unsplash.com/photo-1505693416388-4d99d0ef15ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    ],
    tents: [
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    'roof-tiles': [
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    ],
    'pyramid-shades': [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490122417551-3b2c26d63b6f?auto=format&fit=crop&w=1200&q=80',
    ],
    'movable-shades': [
      'https://images.unsplash.com/photo-1490122417551-3b2c26d63b6f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    ],
    'wooden-screens': [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512187849-3bfe0ccd4f40?auto=format&fit=crop&w=1200&q=80',
    ],
    'fabric-screens': [
      'https://images.pexels.com/photos/325576/pexels-photo-325576.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    'iron-screens': [
      'https://images.unsplash.com/photo-1512187849-3bfe0ccd4f40?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=80',
    ],
  }

  for (const s of services) {
    const coverUrl =
      findImagePath('temp/gallery', s.slug) ||
      findImagePath('temp/services', s.slug) ||
      serviceCoverImages[s.slug] ||
      '/temp/services/' + s.slug + '.jpg'

    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        ...s,
        coverImage: coverUrl,
      },
      create: {
        ...s,
        coverImage: coverUrl,
      },
    })

    const galleryUrls = serviceGalleryImages[s.slug] || []

    for (let i = 0; i < galleryUrls.length; i++) {
      const imageUrl =
        findImagePath('temp/gallery', `${s.slug}${i + 1}`) ||
        findImagePath('temp/gallery', `${s.slug}-${i + 1}`) ||
        galleryUrls[i]

      await prisma.serviceImage.upsert({
        where: { id: `img-${s.slug}-${i + 1}` },
        update: {
          imageUrl,
          altText: `${s.title} - صورة ${i + 1}`,
          displayOrder: i + 1,
        },
        create: {
          id: `img-${s.slug}-${i + 1}`,
          serviceId: service.id,
          imageUrl,
          altText: `${s.title} - صورة ${i + 1}`,
          displayOrder: i + 1,
        },
      })
    }

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
      },
    })

    for (let i = 0; i < galleryUrls.length; i++) {
      const imageUrl =
        findImagePath('temp/gallery', `${s.slug}${i + 1}`) ||
        findImagePath('temp/gallery', `${s.slug}-${i + 1}`) ||
        galleryUrls[i]

      await prisma.galleryItem.upsert({
        where: { id: `gallery-${s.slug}-${i + 1}` },
        update: {
          title: `${s.title} - مشروع ${i + 1}`,
          imageUrl,
          altText: `معرض أعمال ${s.title} - نموذج ${i + 1}`,
        },
        create: {
          id: `gallery-${s.slug}-${i + 1}`,
          categoryId: category.id,
          title: `${s.title} - مشروع ${i + 1}`,
          imageUrl,
          altText: `معرض أعمال ${s.title} - نموذج ${i + 1}`,
        },
      })
    }
  }

  // 3. Blog Posts
  const posts = [
    {
      slug: 'car-shades-importance-summer',
      title: 'أهمية تركيب مظلات السيارات في الصيف',
      excerpt: 'تعرف على الفوائد العديدة لتركيب مظلة سيارة احترافية وكيف تحافظ على سيارتك وتقلل من تكاليف الصيانة.',
      content: `تُعدّ الحرارة الشديدة من أبرز التحديات التي تواجه أصحاب السيارات خلال فصل الصيف. وجود مظلة متينة وعالية الجودة ليس رفاهية بل ضرورة...\n\nللحجز تواصل معنا بمعالم الظل.`,
      coverImage: findImagePath('temp/posts', 'car-shades-summer') || findImagePath('temp/gallery', 'car-shades') || '/temp/posts/car-shades-summer.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'how-to-choose-pergola',
      title: 'كيف تختار البرجولة المثالية لحديقتك؟',
      excerpt: 'دليل شامل لمساعدتك على اختيار نوع وحجم وتصميم البرجولة المناسبة بما يتوافق مع مساحتك وميزانيتك.',
      content: `البرجولة ليست مجرد سقف إضافي، بل هي مساحة حياتية تزيد من قيمة منزلك وتمنحك مكانًا مريحًا في الهواء الطلق...\n\nمعالم الظل.`,
      coverImage: findImagePath('temp/posts', 'choosing-pergola') || findImagePath('temp/gallery', 'pergolas') || '/temp/posts/choosing-pergola.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'facade-cladding-benefits-commercial',
      title: 'أبرز مميزات كلادينج الواجهات للمباني التجارية',
      excerpt: 'اكتشف لماذا يُعدّ كلادينج الواجهات الخيار الأمثل لتحديث المباني التجارية وتعزيز هويتها البصرية.',
      content: `في بيئة تجارية تنافسية، يلعب المظهر الخارجي للمبنى دوراً محورياً في استقطاب العملاء. يُقدّم كلادينج الواجهات مزايا عديدة...\n\nمعالم الظل.`,
      coverImage: findImagePath('temp/posts', 'cladding-benefits') || findImagePath('temp/gallery', 'facade-cladding') || '/temp/posts/cladding-benefits.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'best-pergolas-for-gardens',
      title: 'أفضل أنواع البرجولات للحدائق والمساحات الخارجية',
      excerpt: 'دليل شامل لاختيار البرجولة المثالية لحديقتك مع نصائح للتصميم والصيانة.',
      content: `البرجولة ليست مجرد مظلة، بل هي عنصر معماري يضيف قيمة جمالية ووظيفية لمساحتك الخارجية. في هذا الدليل، نستعرض أفضل أنواع البرجولات...\n\nمع نصائح من معالم الظل.`,
      coverImage: findImagePath('temp/posts', 'pergolas-guide') || findImagePath('temp/gallery', 'pergolas') || '/temp/posts/pergolas-guide.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'car-shades-maintenance-tips',
      title: 'نصائح لصيانة مظلات السيارات وحمايتها من التلف',
      excerpt: 'تعرف على أهم النصائح للحفاظ على مظلات سيارتك في أفضل حالة لأطول فترة ممكنة.',
      content: `صيانة مظلات السيارات أمر ضروري لضمان استمراريتها في حماية مركبتك. إليك أهم النصائح...\n\nمن خبراء معالم الظل.`,
      coverImage: findImagePath('temp/posts', 'car-shades-maintenance') || findImagePath('temp/gallery', 'car-shades') || '/temp/posts/car-shades-maintenance.jpg',
      publishedAt: new Date(),
    },
    {
      slug: 'hangars-vs-traditional-warehouses',
      title: 'الهناجر مقابل المستودعات التقليدية: أيهما أفضل؟',
      excerpt: 'مقارنة شاملة بين الهناجر الحديثة والمستودعات التقليدية من حيث التكلفة والكفاءة.',
      content: `في عالم الأعمال اللوجستية، يواجه أصحاب المشاريع خياراً صعباً بين الهناجر الحديثة والمستودعات التقليدية. دعونا نقارن...\n\nتحليل من معالم الظل.`,
      coverImage: findImagePath('temp/posts', 'hangars-vs-warehouses') || findImagePath('temp/gallery', 'hangars') || '/temp/posts/hangars-vs-warehouses.jpg',
      publishedAt: new Date(),
    },
  ]

  // 4. Testimonials
  const testimonials = [
    {
      name: 'أحمد محمد',
      position: 'مدير مشاريع',
      company: 'شركة البناء الحديث',
      content: 'خدمة ممتازة وفريق محترف. تم تركيب مظلات السيارات في مشروعنا بكفاءة عالية وجودة لا تُضاهى.',
      rating: 5,
      featured: true,
    },
    {
      name: 'فاطمة علي',
      position: 'مالكة فيلا',
      company: 'فيلا الأندلس',
      content: 'معالم الظل قدموا لنا برجولة حديقة رائعة. التصميم عصري والتنفيذ دقيق. نوصي بهم بشدة.',
      rating: 5,
      featured: true,
    },
    {
      name: 'خالد السعد',
      position: 'مدير مصنع',
      company: 'مصنع الألمنيوم',
      content: 'الهناجر التي بنوها لنا متينة وعازلة تماماً. خدمة ما بعد البيع ممتازة وأسعار تنافسية.',
      rating: 5,
      featured: true,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${testimonial.name.replace(/\s+/g, '-').toLowerCase()}` },
      update: testimonial,
      create: {
        id: `testimonial-${testimonial.name.replace(/\s+/g, '-').toLowerCase()}`,
        ...testimonial,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
