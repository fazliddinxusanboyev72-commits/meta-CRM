import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getCMSSettings, getTeachers } from '@/lib/db';
import {
  Code2,
  Target,
  Eye,
  Heart,
  Award,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 0;

export default async function AboutPage() {
  const [cms, teachers] = await Promise.all([getCMSSettings(), getTeachers()]);

  const timeline = [
    {
      year: '2024',
      title: 'MetaITSchool Asos Solinishi',
      desc: 'Yetakchi Senior dasturchilar va mentorlar jamoasi tomonidan Toshkent shahrida zamonaviy ta\'lim markaziga asos solindi.',
    },
    {
      year: '2025',
      title: '500+ Bitiruvchilar & Xalqaro Hamkorlik',
      desc: 'Uzum, Click, Epam va boshqa yirik IT kompaniyalar bilan bitiruvchilarni ishga joylashtirish bo\'yicha memorandumlar imzolandi.',
    },
    {
      year: '2026',
      title: 'MetaITSchool Maximum & LMS Ekotizimi',
      desc: 'Sun\'iy intellekt assistenti, to\'liq avtomatlashtirilgan CRM va zamonaviy masofaviy ta\'lim platformasi ishga tushirildi.',
    },
    {
      year: '2027+',
      title: 'Global IT Eksport Markazi',
      desc: '10,000 dan ortiq yoshlarni jahon IT bozorida yuqori maoshli mutaxassis sifatida tayyorlash rejalashtirilmoqda.',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 w-full pt-28 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <Badge variant="primary">Kelajak Sari Qadam</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Biz shunchaki o&apos;qitmaymiz.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan">
              Biz IT sohasining yangi yetakchilarini tarbiyalaymiz.
            </span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            MetaITSchool — bu zamonaviy texnologiyalar, real loyihalar va xalqaro tajribaga ega ustozlar birlashgan
            raqamli ta&apos;lim makoni.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card glow className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-purple/20 text-primary-cyan flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Bizning Missiyamiz</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {cms.about.mission}
              </p>
            </Card>

            <Card glow className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-blue/20 text-primary-blue flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Bizning Viziyamiz</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {cms.about.vision}
              </p>
            </Card>

            <Card glow className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-status-success/20 text-status-success flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Bizning Qadriyatlarimiz</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Halollik, 100% amaliy yondashuv, o&apos;quvchi natijasi uchun cheksiz mas&apos;uliyat va to&apos;xtovsiz innovatsiyalar.
              </p>
            </Card>
          </div>
        </div>

        {/* Story & Philosophy */}
        <div className="py-20 bg-background-secondary/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="primary">Bizning Tariximiz</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Noldan boshlab IT olamining cho&apos;qqisigacha
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {cms.about.story}
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-text-main">
                  <CheckCircle2 className="w-5 h-5 text-status-success flex-shrink-0" />
                  <span>Har bir o&apos;quvchiga individual mentorlik yondashuvi</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-main">
                  <CheckCircle2 className="w-5 h-5 text-status-success flex-shrink-0" />
                  <span>Zamonaviy Mac va PC laboratoriyalari, kovorking zonasi</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-main">
                  <CheckCircle2 className="w-5 h-5 text-status-success flex-shrink-0" />
                  <span>Ingliz tili va Soft Skills bo&apos;yicha qo&apos;shimcha bepul modullar</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
                  alt="MetaITSchool o'quv muhiti"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Roadmap */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <Badge variant="primary">Rivojlanish Yo&apos;li</Badge>
            <h2 className="text-3xl font-extrabold text-white">Bizning Yo&apos;limiz va Maqsadlarimiz</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {timeline.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background-elevated border border-border space-y-3 relative">
                <span className="text-2xl font-extrabold text-primary-cyan font-mono block">
                  {item.year}
                </span>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-r from-background-elevated to-background-panel p-8 sm:p-12 text-center space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Bizning jamoaga qo&apos;shiling</h2>
            <p className="text-sm text-text-secondary max-w-xl mx-auto">
              IT sohasida professional darajaga erishish va o&apos;z portfoliosingizni yaratish uchun bugun birinchi qadamni tashlang.
            </p>
            <Link href="/apply">
              <Button size="lg" className="shadow-glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Hoziroq Ro&apos;yxatdan O&apos;tish
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
