'use client';

import React from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, MapPin, Users } from 'lucide-react';

export default function TeacherSchedulePage() {
  const schedule = [
    { day: 'Dushanba', time: '18:30 - 20:30', room: 'Lab-A (Auditoriya 301)', group: 'Full Stack FS-2026-01' },
    { day: 'Chorshanba', time: '18:30 - 20:30', room: 'Lab-A (Auditoriya 301)', group: 'Full Stack FS-2026-01' },
    { day: 'Juma', time: '18:30 - 20:30', room: 'Lab-A (Auditoriya 301)', group: 'Full Stack FS-2026-01' },
  ];

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ustoz Dars Jadvali
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Siz o&apos;tadigan mashg&apos;ulotlarning haftalik tartibi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schedule.map((s, idx) => (
          <Card key={idx} glow className="p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-bold text-white text-base">{s.day}</span>
              <Badge variant="primary" size="sm">{s.time}</Badge>
            </div>
            <h4 className="text-sm font-bold text-white">{s.group}</h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <MapPin className="w-3.5 h-3.5 text-status-warning" />
              <span>{s.room}</span>
            </div>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
