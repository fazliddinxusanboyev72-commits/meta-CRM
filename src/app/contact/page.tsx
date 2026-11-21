'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormControls';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary">Aloqa Markazi</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Biz Bilan Bog&apos;laning
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Savollaringiz bormi yoki o&apos;quv markazimizga tashrif buyurmoqchimisiz? Biz har doim muloqotga tayyormiz!
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card glow className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-cyan/20 text-primary-cyan flex items-center justify-center mx-auto">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Telefon</h4>
            <p className="text-xs text-text-secondary">+998 (71) 200-50-50</p>
            <p className="text-xs text-text-secondary">+998 (90) 123-45-67</p>
          </Card>

          <Card glow className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-purple/20 text-primary-purple flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Elektron Pochta</h4>
            <p className="text-xs text-text-secondary">info@metaitschool.uz</p>
            <p className="text-xs text-text-secondary">support@metaitschool.uz</p>
          </Card>

          <Card glow className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-status-success/20 text-status-success flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Manzil</h4>
            <p className="text-xs text-text-secondary">Toshkent sh., Amir Temur shoh ko&apos;chasi, 108-uy</p>
            <p className="text-[11px] text-text-muted">IT Park binosi, 3-qavat</p>
          </Card>

          <Card glow className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-status-warning/20 text-status-warning flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Ish Vaqti</h4>
            <p className="text-xs text-text-secondary">Dushanba - Shanba</p>
            <p className="text-xs text-status-success font-semibold">09:00 - 21:00</p>
          </Card>
        </div>

        {/* Message Form & Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <Card glow className="p-6 sm:p-10 space-y-6">
              <h3 className="text-xl font-bold text-white">Xabar yuborish</h3>
              {isSent ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-status-success mx-auto" />
                  <h4 className="text-lg font-bold text-white">Xabaringiz qabul qilindi!</h4>
                  <p className="text-xs text-text-secondary">Tez orada mutaxassislarimiz siz bilan bog&apos;lanishadi.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Ismingiz *"
                      required
                      placeholder="Sardor Aliyev"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label="Telefon raqamingiz *"
                      required
                      placeholder="+998 90 123 45 67"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Email manzilingiz"
                    type="email"
                    placeholder="example@mail.uz"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Textarea
                    label="Savolingiz yoki xabaringiz *"
                    required
                    placeholder="Sizga qanday yordam bera olamiz?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <Button type="submit" size="md" className="w-full shadow-glow" isLoading={isLoading} rightIcon={<Send className="w-4 h-4" />}>
                    Xabarni Yuborish
                  </Button>
                </form>
              )}
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Akademiyamizga tashrif buyuring</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Biz talabalarimiz uchun qulay, shinam va zamonaviy ta&apos;lim muhitini yaratganmiz.
                Istalgan ish kuni kelib dars xonalari, kovorking va laboratoriyalarimiz bilan yaqindan tanishishingiz mumkin.
              </p>

              <div className="rounded-2xl overflow-hidden border border-border h-56 bg-background-panel relative">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80"
                  alt="MetaITSchool binosi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                  <Badge variant="primary" className="shadow-lg backdrop-blur-md">
                    📍 IT Park Tashkent, 3-qavat
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
