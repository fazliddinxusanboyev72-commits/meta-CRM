'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { Badge } from '@/components/ui/Badge';
import { User, Lock, ArrowRight, AlertTriangle, GraduationCap, School } from 'lucide-react';

export default function AuthLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Kirishda xatolik yuz berdi');
      } else {
        if (role === 'teacher') {
          router.push('/teacher/dashboard');
        } else {
          router.push('/student/dashboard');
        }
      }
    } catch {
      setError('Server xatoligi yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-28 relative">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="primary">Portalga Kirish</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Ta&apos;lim Portaliga Xush Kelibsiz</h1>
            <p className="text-xs text-text-secondary">
              Darslaringiz, topshiriqlar va baholaringizni kuzatish uchun profilingizga kiring
            </p>
          </div>

          <Card glow className="p-6 sm:p-8 space-y-6">
            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-background-panel border border-border">
              <button
                type="button"
                onClick={() => {
                  setRole('student');
                  setError('');
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  role === 'student'
                    ? 'bg-primary-purple text-white shadow-glow'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Talaba
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('teacher');
                  setError('');
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  role === 'teacher'
                    ? 'bg-primary-purple text-white shadow-glow'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                <School className="w-4 h-4" /> O&apos;qituvchi
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-status-error/15 border border-status-error/30 text-xs text-status-error flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={role === 'student' ? "Email yoki Talaba ID (masalan: META-S-1001)" : "O'qituvchi Email manzili"}
                placeholder={role === 'student' ? "bobur@student.metaitschool.uz yoki META-S-1001" : "javohir@metaitschool.uz"}
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
              />

              <div>
                <Input
                  label="Parol"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <div className="flex justify-end mt-1.5">
                  <Link href="/auth/forgot-password" className="text-[11px] text-text-secondary hover:text-primary-cyan transition-colors">
                    Parolni unutdingizmi?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full shadow-glow"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Kirish
              </Button>
            </form>

            <div className="pt-2 text-center text-xs text-text-secondary">
              Profilingiz yo&apos;qmi?{' '}
              <Link href="/auth/register" className="text-primary-cyan hover:underline font-semibold">
                Ro&apos;yxatdan o&apos;tish
              </Link>
            </div>

            <div className="p-3 rounded-xl bg-background-panel border border-border/70 text-[11px] text-text-muted space-y-1">
              <div>💡 <strong>Demo hisoblar:</strong></div>
              <div>Talaba: <code>bobur@student.metaitschool.uz</code> / parol: <code>student123</code></div>
              <div>Ustoz: <code>javohir@metaitschool.uz</code> / parol: <code>teacher123</code></div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
