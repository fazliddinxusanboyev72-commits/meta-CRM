import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getTestimonials } from '@/lib/db';
import { Star, Quote, CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary">Haqiqiy Fikrlar</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bitiruvchilarimizning Biz Haqimizdagi Fikrlari
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            O&apos;quvchilarimizning haqiqiy muvaffaqiyat hikoyalari, ta&apos;lim sifati va dars jarayonlari haqida
            xolis fikrlari bilan tanishing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <Card key={item.id} glow className="p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-status-warning">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-status-warning" />
                    ))}
                  </div>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Tasdiqlangan Bitiruvchi
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary italic leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.studentName}
                  className="w-12 h-12 rounded-full object-cover border border-primary-purple"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{item.studentName}</h3>
                  <div className="text-xs text-primary-cyan">{item.role} {item.company ? `• ${item.company}` : ''}</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">{item.courseTitle}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-primary/40 bg-background-elevated p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Siz ham o&apos;z muvaffaqiyat hikoyangizni yozing</h2>
          <p className="text-sm text-text-secondary max-w-lg mx-auto">
            Bugunoq ro&apos;yxatdan o&apos;ting va eng nufuzli IT mutaxassislaridan biriga aylaning.
          </p>
          <Link href="/apply">
            <Button size="lg" className="shadow-glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Ta&apos;limni boshlash
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
