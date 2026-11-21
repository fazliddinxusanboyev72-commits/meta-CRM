'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormControls';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, Sparkles, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const [courses, setCourses] = useState<{ label: string; value: string }[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '20',
    courseId: '',
    preferredSchedule: 'Kechki guruh (18:30)',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const options = data.map((c: any) => ({ label: `${c.title} (${c.duration})`, value: c.id }));
          setCourses(options);
          if (options.length > 0) {
            setFormData((prev) => ({ ...prev, courseId: options[0].value }));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
      } else {
        setIsSuccess(true);
      }
    } catch {
      setErrorMessage('Server bilan bog\'lanishda xatolik yuz berdi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="primary">Qabul 2026</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              MetaITSchool da ta&apos;lim olish uchun ariza topshiring
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Biz bilan kelajagingizni bugundan quring. Ariza qoldirishingiz bilan ta&apos;lim bo&apos;yicha mutaxassislarimiz
              siz bilan 15 daqiqa ichida bog&apos;lanib, qobiliyatlaringizga mos yo&apos;nalishni tanlashda yordam beradi.
            </p>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-status-success/20 text-status-success flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Bepul Texnik Konsultatsiya</h4>
                  <p className="text-xs text-text-secondary">Darajangizni aniqlash va individual o&apos;quv rejasini tuzish.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-purple/20 text-primary-cyan flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">25% Gacha Grant & Chegirmalar</h4>
                  <p className="text-xs text-text-secondary">Birinchi 20 nafar ro&apos;yxatdan o&apos;tgan o&apos;quvchiga maxsus imtiyoz.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-blue/20 text-primary-blue flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Amaliy Darslar</h4>
                  <p className="text-xs text-text-secondary">Birinchi haftadanoq o&apos;z portfoliosingiz ustida ishlashni boshlang.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <Card glow className="p-6 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-status-success/20 text-status-success flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Arizangiz muvaffaqiyatli qabul qilindi!</h3>
                  <p className="text-sm text-text-secondary max-w-md mx-auto">
                    Rahmat, <strong className="text-white">{formData.fullName}</strong>. Tez orada qabul komissiyasi mutaxassisi siz bilan ko&apos;rsatilgan telefon raqami orqali bog&apos;lanadi.
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <Link href="/courses">
                      <Button variant="secondary">Kurslarni ko&apos;rish</Button>
                    </Link>
                    <Link href="/">
                      <Button variant="primary">Bosh sahifaga qaytish</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white">Ariza shakli</h3>
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-status-error/15 border border-status-error/30 text-xs text-status-error">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="To'liq ism va familiyangiz *"
                      placeholder="Masalan: Sardor Aliyev"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <Input
                      label="Telefon raqamingiz *"
                      placeholder="+998 90 123 45 67"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Yoshingiz"
                      type="number"
                      min="12"
                      max="65"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                    <Select
                      label="Qulay dars vaqti"
                      options={[
                        { label: 'Kechki guruh (18:30 - 20:30)', value: 'Kechki guruh (18:30)' },
                        { label: 'Kunduzgi guruh (15:00 - 17:00)', value: 'Kunduzgi guruh (15:00)' },
                        { label: 'Ertalabki guruh (10:00 - 12:00)', value: 'Ertalabki guruh (10:00)' },
                        { label: 'Shanba-Yakshanba (Weekend)', value: 'Shanba-Yakshanba' },
                      ]}
                      value={formData.preferredSchedule}
                      onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                    />
                  </div>

                  <Select
                    label="O'rganmoqchi bo'lgan kursingiz *"
                    options={
                      courses.length > 0
                        ? courses
                        : [
                            { label: 'Full Stack JavaScript & Next.js Pro', value: 'full-stack-javascript' },
                            { label: 'Python, Sun\'iy Intellekt va Data Science', value: 'python-ai-data' },
                            { label: 'Professional UI/UX & Product Design', value: 'ui-ux-design-pro' },
                            { label: 'Flutter Mobile Dasturlash', value: 'mobile-flutter' },
                            { label: 'Kiberxavfsizlik va Axborot Himoyasi', value: 'cyber-security' },
                          ]
                    }
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  />

                  <Textarea
                    label="Qo'shimcha izoh yoki savolingiz (ixtiyoriy)"
                    placeholder="Qiziqishlaringiz, avvalgi tajribangiz yoki maqsadlaringiz haqida yozishingiz mumkin..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full shadow-glow"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Arizani yuborish
                  </Button>

                  <p className="text-[11px] text-text-muted text-center">
                    Tugmani bosish orqali siz shaxsiy ma&apos;lumotlarni qayta ishlash shartlariga rozilik bildirasiz.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
