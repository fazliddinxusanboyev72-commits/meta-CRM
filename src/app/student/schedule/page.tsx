'use client';

import React from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, MapPin, User, Calendar } from 'lucide-react';

export default function StudentSchedulePage() {
  const schedule = [
    { day: 'Dushanba', time: '18:30 - 20:30', room: 'Lab-A (Auditoriya 301)', topic: 'Next.js App Router & Server Actions', teacher: 'Javohir Rahmatov' },
    { day: 'Chorshanba', time: '18:30 - 20:30', room: 'Lab-A (Auditoriya 301)', topic: 'PostgreSQL, Prisma ORM va Tranzaksiyalar', teacher: 'Javohir Rahmatov' },
    { day: 'Juma', time: '18:30 - 20:30', room: 'Lab-A (Auditoriya 301)', topic: 'Amaliy Portfolio Loyihasi & Code Review', teacher: 'Javohir Rahmatov' },
  ];

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Haftalik Dars Jadvali
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Guruhingiz bo&apos;yicha belgilangan dars kunlari va vaqtlari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schedule.map((item, idx) => (
          <Card key={idx} glow className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-base font-bold text-white">{item.day}</span>
              <Badge variant="primary" size="sm">{item.time}</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">{item.topic}</h4>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-status-warning" />
                <span>{item.room}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <User className="w-3.5 h-3.5 text-primary-cyan" />
                <span>Ustoz: {item.teacher}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </StudentLayout>
  );
}
