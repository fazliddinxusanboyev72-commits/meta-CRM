'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Kurslarga yozilish uchun dasturlashdan boshlang\'ich bilim talab qilinadimi?',
      a: 'Yo\'q, bizning "Frontend React" va "UI/UX Dizayn" kabi kurslarimiz mutlaqo noldan o\'rganuvchilar uchun mo\'ljallangan. Dastlabki darslarda kompyuter savodxonligi, mantiqiy fikrlash va dasturlash asoslari batafsil tushuntiriladi. "Full Stack Pro" va "AI & Data Science" kabi murakkab kurslar uchun esa bepul kirish testi o\'tkaziladi.',
    },
    {
      q: 'Darslar qaysi formatda olib boriladi (onlayn yoki oflayn)?',
      a: 'MetaITSchool gibrid ta\'lim tizimini taklif etadi. Toshkent shahridagi zamonaviy o\'quv markazimizda oflayn darslarda qatnashishingiz yoki dunyoning istalgan nuqtasidan jonli interaktiv onlayn darslarga qo\'shilishingiz mumkin. Har bir dars videoyozuvi talabaning shaxsiy LMS portaliga saqlanadi.',
    },
    {
      q: 'Kursni tamomlagandan so\'ng ishga joylashish kafolatlanadimi?',
      a: 'Biz o\'quvchilarimizga faqatgina diplom berib qolmaymiz. Akademiya qoshidagi Karyera Markazi rezyumeni xalqaro formatda tayyorlash, texnik intervyulardan (Mock Interviews) o\'tish va 45 dan ortiq yirik hamkor kompaniyalarimizga (Uzum, Epam, Click, TBC va IT Park) to\'g\'ridan-to\'g\'ri tavsiya qilish orqali ish topishlariga to\'liq ko\'maklashadi. Bitiruvchilarimizning 94% 3 oy ichida ishga joylashmoqda.',
    },
    {
      q: 'To\'lovni bo\'lib to\'lash imkoniyati bormi?',
      a: 'Ha, kurs to\'lovlarini har oy qismlarga bo\'lib (oyma-oy) to\'lashingiz mumkin. Shuningdek, Payme, Click va bank kartalari orqali 3 oydan 6 oygacha foizsiz muddatli to\'lov (nasiya) imkoniyati mavjud.',
    },
    {
      q: 'O\'qish uchun qanday kompyuter kerak bo\'ladi?',
      a: 'Dasturlash (Full Stack, Python) va dizayn kurslari uchun kamida 8GB tezkor xotiraga (RAM) va Core i5 / Ryzen 5 (yoki Apple M1/M2/M3) protsessoriga ega noutbuk tavsiya etiladi. Oflayn o\'quvchilar markazimizdagi jihozlangan kompyuter laboratoriyalaridan bepul foydalanishlari mumkin.',
    },
    {
      q: 'Beriladigan sertifikat xalqaro miqyosda o\'tadimi?',
      a: 'Ha, har bir bitiruvchimizga unikal raqamli ID va QR-kodga ega rasmiy sertifikat beriladi. Istalgan mahalliy yoki xalqaro ish beruvchi ushbu sertifikatni bizning veb-saytimizdagi /verify/:certificateId sahifasida bir necha soniya ichida tekshirishi mumkin.',
    },
    {
      q: 'Agar darsni o\'tkazib yuborsam, uni qanday qayta ko\'rishim mumkin?',
      a: 'Barcha darslar to\'liq HD formatda yozib olinadi va dars tugashi bilanoq talabaning shaxsiy portalidagi "Mening darslarim" bo\'limiga yuklanadi. Savollaringiz bo\'lsa, shaxsiy kuratoringizga yoki MetaAI ta\'lim assistentiga 24/7 murojaat qilishingiz mumkin.',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary">FAQ</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ko&apos;p Beriladigan Savollar
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Kurslar, to&apos;lovlar, ta&apos;lim formati va karyera imkoniyatlari haqidagi eng asosiy savollarga javoblar.
          </p>
        </div>

        {/* Accordion list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-background-elevated/70 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-background-elevated transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary-cyan flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-background-elevated to-background-panel border border-border text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-primary-cyan mx-auto" />
          <h3 className="text-xl font-bold text-white">Savolingizga javob topmadingizmi?</h3>
          <p className="text-xs sm:text-sm text-text-secondary">
            Bizning ta&apos;lim bo&apos;yicha maslahatchilarimiz sizga barcha savollaringiz bo&apos;yicha batafsil ma&apos;lumot berishdan mamnun bo&apos;lishadi.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/contact">
              <Button variant="secondary">Aloqa markazi</Button>
            </Link>
            <Link href="/apply">
              <Button variant="primary">Ariza qoldirish</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
