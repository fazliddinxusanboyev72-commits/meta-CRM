'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { Badge } from '@/components/ui/Badge';
import { KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-28">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="primary">Xavfsizlik</Badge>
            <h1 className="text-2xl font-bold text-white">Parolni Tiklash</h1>
            <p className="text-xs text-text-secondary">
              Profilingizga biriktirilgan email manzilini kiriting
            </p>
          </div>

          <Card glow className="p-6 sm:p-8 space-y-5">
            {isSent ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-status-success mx-auto" />
                <h3 className="text-lg font-bold text-white">Tiklash havolasi yuborildi!</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-white">{email}</strong> manziliga parolni tiklash bo&apos;yicha xat yuborildi. Iltimos, pochtangizni tekshiring.
                </p>
                <div className="pt-2">
                  <Link href="/auth/reset-password">
                    <Button size="sm" variant="outline">
                      Tiklash kodini kiritish →
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email manzilingiz"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" size="md" className="w-full shadow-glow" isLoading={isLoading}>
                  Tiklash havolasini yuborish
                </Button>
              </form>
            )}

            <div className="text-center pt-2">
              <Link href="/auth/login" className="text-xs text-text-secondary hover:text-white inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Kirish sahifasiga qaytish
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
