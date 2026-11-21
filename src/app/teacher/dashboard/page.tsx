'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function TeacherDashboardPage() {
  const [stats, setStats] = useState({
    activeGroups: 2,
    totalStudents: 28,
    pendingHomework: 3,
    avgAttendance: 95,
  });

  return (
    <TeacherLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ustoz Ishchi Maydoni
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Guruhlar davomati, dars jadvallari va talabalar topshiriqlarini tekshirish markazi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/teacher/attendance">
            <Button size="sm" variant="primary" leftIcon={<CheckSquare className="w-4 h-4" />}>
              Davomat Olish
            </Button>
          </Link>
          <Link href="/teacher/homework">
            <Button size="sm" variant="outline" leftIcon={<FileText className="w-4 h-4" />}>
              Vazifalarni Baholash ({stats.pendingHomework})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Mening Guruhlarim</span>
          <div className="text-3xl font-extrabold text-white">{stats.activeGroups} ta</div>
          <p className="text-xs text-primary-cyan">Full Stack FS-2026-01</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Jami Talabalarim</span>
          <div className="text-3xl font-extrabold text-white">{stats.totalStudents} nafar</div>
          <p className="text-xs text-status-success">Faol o&apos;quvchilar</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Tekshirilishi Kerak</span>
          <div className="text-3xl font-extrabold text-status-warning">{stats.pendingHomework} ta</div>
          <p className="text-xs text-status-warning">Uy vazifalari</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">O&apos;rtacha Davomat</span>
          <div className="text-3xl font-extrabold text-status-success">{stats.avgAttendance}%</div>
          <p className="text-xs text-status-success flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Yuqori intizom
          </p>
        </Card>
      </div>

      {/* Today Schedule & Quick Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-base font-bold text-white">Bugungi Darslarim</h3>
            <Link href="/teacher/schedule" className="text-xs text-primary-cyan hover:underline">
              Jadval →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-background-panel border border-border text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Full Stack FS-2026-01</span>
                <Badge variant="primary">18:30 - 20:30</Badge>
              </div>
              <p className="text-text-secondary">Next.js 14 Server Actions va CRUD amaliyotlari</p>
              <div className="flex items-center gap-2 text-text-muted text-[11px] pt-1 border-t border-border/50">
                <span>Auditoriya: Lab-A (301)</span>
                <span>•</span>
                <span>4 nafar talaba</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-base font-bold text-white">Tekshirish Uchun Uy Vazifalari</h3>
            <Link href="/teacher/homework" className="text-xs text-primary-cyan hover:underline">
              Barchasi →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-background-panel border border-border flex items-center justify-between">
              <div>
                <strong className="text-white block">Bobur Mirzayev</strong>
                <span className="text-text-secondary text-[11px]">TypeScript CLI Mini Tool</span>
              </div>
              <Badge variant="success">Baholandi: 98</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-background-panel border border-border flex items-center justify-between">
              <div>
                <strong className="text-white block">Zilola Karimova</strong>
                <span className="text-text-secondary text-[11px]">Next.js E-commerce Sahifasi</span>
              </div>
              <Badge variant="warning">Kutilmoqda</Badge>
            </div>
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}
