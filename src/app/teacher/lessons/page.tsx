'use client';

import React from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, BookOpen, Plus, PlayCircle } from 'lucide-react';

export default function TeacherLessonsPage() {
  const modules = [
    {
      title: '1-Modul: Zamonaviy Frontend Asoslari & TypeScript',
      lessons: [
        { title: 'Zamonaviy Veb Standartlari & Dasturlash Muhiti', duration: '45 daqiqa' },
        { title: 'TypeScript: Turlar, Interfeyslar va Genericlar', duration: '60 daqiqa' },
      ],
    },
    {
      title: '2-Modul: React 19 va Next.js 14 App Router',
      lessons: [
        { title: 'Server Components vs Client Components', duration: '55 daqiqa' },
        { title: 'Server Actions va Dinamik Ma\'lumotlar Mutatsiyasi', duration: '50 daqiqa' },
      ],
    },
  ];

  return (
    <TeacherLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dars Rejalari va Videodarsliklar
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Modullar, video darsliklar havolasi va yuklangan resurslar
          </p>
        </div>

        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Yangi Dars Qo&apos;shish
        </Button>
      </div>

      <div className="space-y-6">
        {modules.map((m, idx) => (
          <Card key={idx} className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-border">
              {m.title}
            </h3>

            <div className="space-y-2">
              {m.lessons.map((l, lIdx) => (
                <div
                  key={lIdx}
                  className="p-3.5 rounded-xl bg-background-panel border border-border flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-4 h-4 text-primary-cyan flex-shrink-0" />
                    <span className="font-medium text-white">{l.title}</span>
                  </div>
                  <span className="text-xs text-text-muted">{l.duration}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
