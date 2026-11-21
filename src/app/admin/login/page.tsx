'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User, ArrowRight, AlertTriangle, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { Badge } from '@/components/ui/Badge';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Kirishda xatolik yuz berdi.');
      } else {
        router.push('/admin/dashboard');
      }
    } catch {
      setError('Server bilan bog\'lanishda xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Cyber Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-purple/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-cyan/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-purple to-primary-cyan flex items-center justify-center text-white shadow-glow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              META<span className="text-primary-cyan">IT</span>SCHOOL
            </span>
          </Link>
          <div className="inline-block">
            <Badge variant="primary" size="sm">
              Maximum Enterprise Security
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Boshqaruv Markazi</h1>
          <p className="text-xs text-text-secondary">
            Faqatgina vakolatli 3 nafar administrator uchun himoyalangan tizim
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-3xl border border-border bg-background-elevated/85 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-status-error/15 border border-status-error/30 text-xs text-status-error flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Foydalanuvchi Nomi"
              placeholder="fazliddin / yaxyobek / jasurbek"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Xavfsizlik Paroli"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full shadow-glow"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Tizimga Kirish
            </Button>
          </form>

          {/* Authorized accounts hint info box */}
          <div className="p-3 rounded-xl bg-background-panel border border-border/80 text-[11px] text-text-muted space-y-1">
            <div className="font-semibold text-text-secondary flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-primary-cyan" />
              Vakolatli Administratorlar:
            </div>
            <div className="font-mono text-primary-cyan">
              • fazliddin &nbsp;• yaxyobek &nbsp;• jasurbek
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-text-secondary hover:text-white transition-colors">
            ← Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
