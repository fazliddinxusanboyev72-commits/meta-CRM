'use client';

import React, { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/FormControls';
import { User, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

export default function StudentProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mening Profilim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Shaxsiy ma&apos;lumotlaringiz va ta&apos;lim kabinetingiz sozlamalari
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-status-success/15 border border-status-success/30 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profil ma&apos;lumotlari muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4">
          <Card glow className="p-6 text-center space-y-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
              alt={user?.fullName || 'Talaba'}
              className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-primary-purple shadow-glow"
            />
            <div>
              <h3 className="text-lg font-bold text-white">{user?.fullName || 'Bobur Mirzayev'}</h3>
              <p className="text-xs text-primary-cyan font-mono">META-S-1001</p>
              <Badge variant="success" size="sm" className="mt-2">Faol Talaba</Badge>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-border">
              Shaxsiy Ma&apos;lumotlar
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="To'liq Ismingiz"
                defaultValue={user?.fullName || 'Bobur Mirzayev'}
              />
              <Input
                label="Email Manzilingiz"
                defaultValue={user?.email || 'bobur@student.metaitschool.uz'}
              />
              <Input
                label="Telefon Raqamingiz"
                defaultValue="+998 90 111 22 33"
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" size="md" variant="primary">
                  O&apos;zgarishlarni Saqlash
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
