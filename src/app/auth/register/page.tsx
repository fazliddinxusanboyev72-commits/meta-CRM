'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Parollar bir-biriga mos kelmadi');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-28">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="primary">Talaba Ro&apos;yxati</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shaxsiy Profil Yaratish</h1>
            <p className="text-xs text-text-secondary">
              MetaITSchool ta&apos;lim platformasida darslarni boshlash uchun ro&apos;yxatdan o&apos;ting
            </p>
          </div>

          <Card glow className="p-6 sm:p-8 space-y-6">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-status-success mx-auto" />
                <h3 className="text-xl font-bold text-white">Ro&apos;yxatdan o&apos;tish muvaffaqiyatli!</h3>
                <p className="text-xs text-text-secondary">
                  Profilingiz yaratildi. Endi profilingizga kirib, kurslarni o&apos;rganishni boshlashingiz mumkin.
                </p>
                <Link href="/auth/login" className="block pt-2">
                  <Button size="md" className="w-full">
                    Kirish sahifasiga o&apos;tish
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-status-error/15 border border-status-error/30 text-xs text-status-error">
                    {error}
                  </div>
                )}

                <Input
                  label="To'liq Ism va Familiya *"
                  placeholder="Sardor Aliyev"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
                <Input
                  label="Email Manzil *"
                  type="email"
                  placeholder="sardor@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  label="Telefon Raqam *"
                  placeholder="+998 90 123 45 67"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  label="Parol *"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <Input
                  label="Parolni Qayta Kiriting *"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />

                <Button type="submit" size="lg" className="w-full shadow-glow" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Ro&apos;yxatdan o&apos;tish
                </Button>
              </form>
            )}

            <div className="pt-2 text-center text-xs text-text-secondary">
              Hisobingiz bormi?{' '}
              <Link href="/auth/login" className="text-primary-cyan hover:underline font-semibold">
                Kirish
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
