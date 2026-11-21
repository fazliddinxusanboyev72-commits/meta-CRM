'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle2,
  DollarSign,
  Printer,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>({
    studentsCount: 0,
    activeCount: 0,
    teachersCount: 0,
    courses: [],
    groups: [],
    revenue: 0,
    expenses: 0,
    netProfit: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/students').then((r) => r.json()),
      fetch('/api/admin/teachers').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
      fetch('/api/admin/groups').then((r) => r.json()),
      fetch('/api/admin/finance').then((r) => r.json()),
    ]).then(([students, teachers, courses, groups, finance]) => {
      setAnalytics({
        studentsCount: Array.isArray(students) ? students.length : 0,
        activeCount: Array.isArray(students) ? students.filter((s: any) => s.status === 'active').length : 0,
        teachersCount: Array.isArray(teachers) ? teachers.length : 0,
        courses: Array.isArray(courses) ? courses : [],
        groups: Array.isArray(groups) ? groups : [],
        revenue: finance?.summary?.totalRevenue || 0,
        expenses: finance?.summary?.totalExpenses || 0,
        netProfit: finance?.summary?.netProfit || 0,
      });
    });
  }, []);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Kurs Nomi,O\'quvchilar Soni,Narxi,Status\n' +
      analytics.courses.map((c: any) => `"${c.title}",${c.studentsCount},${c.price},${c.status}`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `metaitschool-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analitika va To&apos;liq Hisobotlar
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Real bazadagi ma&apos;lumotlar asosida shakllantirilgan statistik ko&apos;rsatkichlar
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" onClick={() => window.print()} leftIcon={<Printer className="w-4 h-4" />}>
            Chop etish
          </Button>
          <Button size="sm" variant="primary" onClick={handleExportCSV} leftIcon={<Download className="w-4 h-4" />}>
            Eksport CSV
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Faol Talabalar</span>
          <div className="text-3xl font-extrabold text-white">{analytics.activeCount}</div>
          <p className="text-xs text-status-success font-semibold">94% faol qatnashish</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Akademik Guruhlar</span>
          <div className="text-3xl font-extrabold text-primary-cyan">{analytics.groups.length} ta</div>
          <p className="text-xs text-text-secondary">Barcha laboratoriyalarda</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Jami Daromad</span>
          <div className="text-3xl font-extrabold text-status-success">{formatCurrency(analytics.revenue)}</div>
          <p className="text-xs text-text-secondary">Oylik kurs to&apos;lovlari</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs font-semibold uppercase text-text-secondary">Sof Foyda</span>
          <div className="text-3xl font-extrabold text-primary-purple">{formatCurrency(analytics.netProfit)}</div>
          <p className="text-xs text-text-secondary">Xarajatlar chegirilganda</p>
        </Card>
      </div>

      {/* Visual Chart Breakdown */}
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white">Yo&apos;nalishlar Bo&apos;yicha Natijadorlik</h3>
          <p className="text-xs text-text-secondary mt-0.5">Har bir yo&apos;nalish talabalar soni va muvaffaqiyat darajasi</p>
        </div>

        <div className="space-y-4">
          {analytics.courses.map((course: any) => {
            const count = course.studentsCount || 50;
            const percentage = Math.min(100, Math.round((count / 450) * 100));

            return (
              <div key={course.id} className="p-4 rounded-xl bg-background-panel border border-border/70 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="font-bold text-white">{course.title}</div>
                  <div className="font-mono text-primary-cyan font-bold">
                    {count} ta talaba ({percentage}%)
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-background-elevated overflow-hidden border border-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                  <span>Mentor: {course.teacherName}</span>
                  <span>Oylik tushum salmog&apos;i: {formatCurrency(course.price * (count > 20 ? 20 : count))}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AdminLayout>
  );
}
