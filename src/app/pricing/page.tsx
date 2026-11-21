import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Standart Dastur',
      desc: 'IT ga yangi qadam qo\'yayotganlar uchun to\'liq amaliy guruh kursi.',
      price: '1,400,000',
      period: 'oyiga',
      isPopular: false,
      features: [
        'Haftasiga 3 marta 2 soatdan jonli darslar',
        'Mac va PC laboratoriyalarida erkin amaliyot',
        'Shaxsiy kurator va assistent yordami',
        'Barcha darslar videoyozuvlari va materiallari',
        'Har dars uy vazifalarini tekshirish (Code Review)',
        'Bitiruv sertifikati (QR-kodli)',
      ],
      cta: 'Ushbu reja bilan boshlash',
    },
    {
      name: 'Intensive Pro',
      desc: 'Eng ommabop ta\'lim formati: tezkor natija va to\'liq portfolio.',
      price: '1,800,000',
      period: 'oyiga',
      isPopular: true,
      features: [
        'Barcha Standart imkoniyatlar',
        'Senior dasturchilardan shaxsiy 1-on-1 mentorlik',
        '5 ta real tijoriy portfolio loyihasi',
        'Karyera markazi bilan rezyume va intervyu tayyorgarligi',
        'IT Park va hamkor kompaniyalarga to\'g\'ridan-to\'g\'ri tavsiya',
        'Mock Interview (Ingliz va o\'zbek tilida texnik suhbat)',
      ],
      cta: 'Pro Rejaga Yozilish',
    },
    {
      name: 'VIP Individual Mentorship',
      desc: 'Shaxsiy jadval, shaxsiy Senior mentor va 100% individual yondashuv.',
      price: '3,500,000',
      period: 'oyiga',
      isPopular: false,
      features: [
        'Barcha Intensive Pro imkoniyatlar',
        'Mentor bilan yakkama-yakka darslar',
        'O\'zingizga mos moslashuvchan dars jadvali',
        'Shaxsiy startapingiz yoki biznesingiz arxitekturasini qurish',
        'Ishga joylashish kafolati (shartnoma asosida)',
        '24/7 shaxsiy texnik qo\'llab-quvvatlash',
      ],
      cta: 'VIP Mentorlikka Yozilish',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary">Shaffof Ta&apos;lim Narxlari</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Kelajagingiz Uchun Eng To&apos;g&apos;ri Sarmoya
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Hech qanday yashirin to&apos;lovlarsiz, qulay oylik to&apos;lovlar va grant imtiyozlari bilan ta&apos;lim oling.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, idx) => (
            <Card
              key={idx}
              glow={p.isPopular}
              className={`p-8 flex flex-col justify-between space-y-8 relative ${
                p.isPopular ? 'border-primary-purple shadow-glow bg-background-elevated' : 'bg-background-elevated/70'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" className="shadow-md">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Eng ko&apos;p tanlangan
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-text-secondary mt-1">{p.desc}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">{p.price}</span>
                    <span className="text-xs text-text-secondary">so&apos;m / {p.period}</span>
                  </div>
                  <div className="text-[11px] text-status-success font-medium mt-1">
                    Oylik to&apos;lov (muddatli to&apos;lov imkoniyati bilan)
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Kiritilgan xizmatlar:</div>
                  <ul className="space-y-2.5">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-text-main">
                        <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/apply">
                <Button
                  size="md"
                  variant={p.isPopular ? 'primary' : 'outline'}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {p.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Scholarships / Grants Note */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-primary-purple/15 to-primary-blue/15 border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Iqtidorli Yoshlar Uchun Grantlar</h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">
              Kirish imtihonida eng yuqori ball to&apos;plagan o&apos;quvchilarga 25% dan 100% gacha ta&apos;lim grantlari taqdim etiladi.
            </p>
          </div>
          <Link href="/apply">
            <Button variant="secondary" className="whitespace-nowrap">
              Grantga topshirish
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
