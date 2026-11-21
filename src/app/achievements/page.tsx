import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, TrendingUp, Briefcase, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AchievementsPage() {
  const partners = [
    { name: 'Uzum Technologies', role: 'FinTech & E-commerce', hires: '45+ bitiruvchi' },
    { name: 'EPAM Systems', role: 'Global IT Outsourcing', hires: '30+ bitiruvchi' },
    { name: 'Click Fintech', role: 'Raqamli to\'lovlar', hires: '25+ bitiruvchi' },
    { name: 'IT Park Uzbekistan', role: 'Texnopark & Startaplar', hires: '60+ bitiruvchi' },
    { name: 'Payme', role: 'To\'lov tizimlari', hires: '20+ bitiruvchi' },
    { name: 'TBC Bank Uzbekistan', role: 'Raqamli Bank', hires: '18+ bitiruvchi' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary">Karyera & Natijalar</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bitiruvchilarimizning Yutuqlari va Natijalari
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Biz o&apos;quvchilarimiz shunchaki kursni tugatishini emas, balki IT bozorida yuqori maoshli o&apos;ringa ega
            bo&apos;lishlarini eng asosiy maqsadimiz deb bilamiz.
          </p>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card glow className="p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary-purple/20 text-primary-cyan flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">1,450+</div>
            <div className="text-xs text-text-secondary font-medium">Muvaffaqiyatli Bitiruvchilar</div>
          </Card>

          <Card glow className="p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-status-success/20 text-status-success flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-status-success">94%</div>
            <div className="text-xs text-text-secondary font-medium">3 oy ichida ishga joylashish</div>
          </Card>

          <Card glow className="p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary-blue/20 text-primary-blue flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">$650+</div>
            <div className="text-xs text-text-secondary font-medium">Junior Dasturchilar Boshlang&apos;ich Maoshi</div>
          </Card>

          <Card glow className="p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-status-warning/20 text-status-warning flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">45+</div>
            <div className="text-xs text-text-secondary font-medium">Hamkor IT Kompaniyalar</div>
          </Card>
        </div>

        {/* Partners */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Bizning Hamkor Kompaniyalar</h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Bitiruvchilarimiz O&apos;zbekiston va xalqaro miqyosdagi eng nufuzli IT korxonalarida ishlamoqda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, idx) => (
              <Card key={idx} glow className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">{p.role}</p>
                </div>
                <Badge variant="success" size="sm">{p.hires}</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-background-elevated border border-border text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Siz ham IT karyerangizni boshlang</h3>
          <p className="text-sm text-text-secondary max-w-xl mx-auto">
            Orzuingizdagi kompaniyada ishlash uchun eng to&apos;g&apos;ri vaqt — hozir!
          </p>
          <Link href="/apply">
            <Button size="lg" className="shadow-glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Ariza topshirish
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
