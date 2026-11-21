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
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Badge variant="primary">Yangi Parol</Badge>
            <h1 className="text-2xl font-bold text-white">Yangi Parol O&apos;rnatish</h1>
            <p className="text-xs text-text-secondary">
              Email orqali olingan tasdiqlash kodi va yangi parolni kiriting
            </p>
          </div>

          <Card glow className="p-6 sm:p-8 space-y-5">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-status-success mx-auto" />
                <h3 className="text-lg font-bold text-white">Parolingiz muvaffaqiyatli yangilandi!</h3>
                <p className="text-xs text-text-secondary">
                  Endi yangi parolingiz yordamida shaxsiy kabinetingizga kirishingiz mumkin.
                </p>
                <Link href="/auth/login" className="block pt-2">
                  <Button size="md" className="w-full">
                    Kirish sahifasiga o&apos;tish
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Tasdiqlash kodi *"
                  placeholder="Masalan: 849201"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Input
                  label="Yangi parol *"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type="submit" size="md" className="w-full shadow-glow" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Parolni yangilash
                </Button>
              </form>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
