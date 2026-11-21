'use client';

import React, { useState } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormControls';
import { CheckCircle2, User, Star } from 'lucide-react';

export default function TeacherProfilePage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ustoz Shaxsiy Profili
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Pedagogik ma&apos;lumotlar va bio tahrirlash
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
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Javohir Rahmatov"
              className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-primary-cyan shadow-glow"
            />
            <div>
              <h3 className="text-lg font-bold text-white">Javohir Rahmatov</h3>
              <p className="text-xs text-primary-cyan font-semibold">Senior Full Stack Engineer</p>
              <div className="flex items-center justify-center gap-1 text-xs text-status-warning mt-2">
                <Star className="w-4 h-4 fill-status-warning" />
                <span className="font-bold">4.95</span> (340+ o&apos;quvchi)
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-border">
              Ustoz Ma&apos;lumotlari
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="To'liq Ism"
                defaultValue="Javohir Rahmatov"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  defaultValue="javohir@metaitschool.uz"
                />
                <Input
                  label="Telefon"
                  defaultValue="+998 90 123 45 67"
                />
              </div>

              <Textarea
                label="Biografiya va Tajriba"
                defaultValue="7+ yillik tajribaga ega Senior Full Stack Engineer. Next.js, Node.js, mikroservislar va yuqori yuklamali arxitekturalar bo'yicha mutaxassis."
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
    </TeacherLayout>
  );
}
