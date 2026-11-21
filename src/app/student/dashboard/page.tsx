'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen,
  Video,
  FileText,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => setSessionUser(d.user));

    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setCourses(d.slice(0, 2));
      });
  }, []);

  return (
    <StudentLayout>
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-primary/40 bg-gradient-to-r from-background-elevated via-background-panel to-background-elevated p-6 sm:p-8 relative overflow-hidden shadow-glow">
        <div className="relative z-10 space-y-3">
          <Badge variant="primary">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            MetaITSchool LMS Pro
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Xush kelibsiz, {sessionUser?.fullName || 'Talaba'}!
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Bugungi darslarni davom ettiring va amaliy topshiriqlarni topshiring. Sizning ta&apos;limdagi progress ko&apos;rsatkichingiz:
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/student/lessons">
              <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Darsni davom ettirish
              </Button>
            </Link>
            <Link href="/student/homework">
              <Button size="md" variant="secondary">
                Uy vazifalarini ko&apos;rish
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Faol Kurslar</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">1 ta</div>
          <p className="text-xs text-primary-cyan">Full Stack JavaScript Pro</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">O&apos;rtacha Baho</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-status-success">92 ball</div>
          <p className="text-xs text-status-success">A&apos;lo ko&apos;rsatkich</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Davomat Darajasi</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-primary-cyan">96%</div>
          <p className="text-xs text-text-muted">Darslarni qoldirmaslik</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Sertifikatlar</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-status-warning">1 ta</div>
          <p className="text-xs text-text-secondary">QR-tasdiqlangan</p>
        </Card>
      </div>

      {/* Ongoing Course Progress Card */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Mening Joriy Kursim</h3>
        {courses.length > 0 && (
          <Card glow className="p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Badge variant="primary" className="mb-2">DAVOM ETMOQDA</Badge>
                <h4 className="text-xl font-bold text-white">{courses[0].title}</h4>
                <p className="text-xs text-text-secondary mt-1">{courses[0].subtitle}</p>
              </div>
              <Link href="/student/lessons">
                <Button size="md" variant="primary">
                  Dars xonasiga kirish
                </Button>
              </Link>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Kurs progressi:</span>
                <strong className="text-white">65% tamomlandi (31 / 48 dars)</strong>
              </div>
              <div className="w-full h-2.5 rounded-full bg-background-panel overflow-hidden border border-border">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-purple to-primary-cyan w-[65%]" />
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Upcoming Lessons & Recent Homework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h4 className="text-base font-bold text-white">Keyingi Darslar</h4>
            <Link href="/student/schedule" className="text-xs text-primary-cyan hover:underline">
              Jadval →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] text-primary-cyan font-bold">
                <span>Bugun, 18:30</span>
                <span>Lab-A (301)</span>
              </div>
              <div className="font-bold text-white text-sm">Next.js 14 Server Actions & Mutation</div>
              <p className="text-text-secondary text-xs">Javohir Rahmatov bilan jonli amaliyot</p>
            </div>

            <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] text-text-muted">
                <span>Chorshanba, 18:30</span>
                <span>Lab-A (301)</span>
              </div>
              <div className="font-bold text-white text-sm">PostgreSQL va Prisma ORM Bog&apos;lanish</div>
              <p className="text-text-secondary text-xs">Ma&apos;lumotlar bazasi bilan ishlash</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h4 className="text-base font-bold text-white">So&apos;nggi Vazifalar</h4>
            <Link href="/student/homework" className="text-xs text-primary-cyan hover:underline">
              Barchasi →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">TypeScript CLI Tool</span>
                <Badge variant="success" size="sm">Baholandi: 98/100</Badge>
              </div>
              <p className="text-text-secondary text-xs">Ustoz fikri: &ldquo;A&apos;lo kod strukturasi va toza yechim!&rdquo;</p>
            </div>

            <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Next.js E-commerce Sahifasi</span>
                <Badge variant="warning" size="sm">Muddati: 28-mart</Badge>
              </div>
              <p className="text-text-secondary text-xs">Server components va streaming bo&apos;yicha topshiriq</p>
            </div>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
}
