'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { CheckCircle2, Lock } from 'lucide-react';

export default function StudentSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Xavfsizlik va Parolni O&apos;zgartirish
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Kabinetingiz xavfsizligini ta&apos;minlash uchun parolni yangilab turing
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-status-success/15 border border-status-success/30 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Parolingiz muvaffaqiyatli yangilandi!</span>
        </div>
      )}

      <Card className="p-6 max-w-xl space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Joriy Parol"
            type="password"
            required
            placeholder="••••••••"
          />
          <Input
            label="Yangi Parol"
            type="password"
            required
            placeholder="••••••••"
          />
          <Input
            label="Yangi Parolni Qayta Kiriting"
            type="password"
            required
            placeholder="••••••••"
          />

          <div className="flex justify-end pt-2">
            <Button type="submit" size="md" variant="primary">
              Parolni Yangilash
            </Button>
          </div>
        </form>
      </Card>
    </StudentLayout>
  );
}
