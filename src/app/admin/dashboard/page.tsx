'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  UserPlus,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Layers,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>({
    students: [],
    teachers: [],
    courses: [],
    groups: [],
    applications: [],
    finance: { totalRevenue: 0, totalExpenses: 0, netProfit: 0, pendingPayments: 0 },
    activity: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/students').then((r) => r.json()),
      fetch('/api/admin/teachers').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
      fetch('/api/admin/groups').then((r) => r.json()),
      fetch('/api/admin/crm').then((r) => r.json()),
      fetch('/api/admin/finance').then((r) => r.json()),
      fetch('/api/admin/activity').then((r) => r.json()),
    ])
      .then(([students, teachers, courses, groups, applications, financeData, activity]) => {
        setData({
          students: Array.isArray(students) ? students : [],
          teachers: Array.isArray(teachers) ? teachers : [],
          courses: Array.isArray(courses) ? courses : [],
          groups: Array.isArray(groups) ? groups : [],
          applications: Array.isArray(applications) ? applications : [],
          finance: financeData?.summary || { totalRevenue: 0, totalExpenses: 0, netProfit: 0, pendingPayments: 0 },
          activity: Array.isArray(activity) ? activity : [],
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const totalStudents = data.students.length;
  const activeStudents = data.students.filter((s: any) => s.status === 'active').length;
  const newApplications = data.applications.filter((a: any) => a.status === 'NEW').length;
  const avgAttendance = data.students.length
    ? Math.round(data.students.reduce((acc: number, s: any) => acc + (s.attendanceRate || 90), 0) / data.students.length)
    : 94;

  return (
    <AdminLayout>
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Akademiya Boshqaruv Markazi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Barcha ta&apos;lim, moliyaviy va operatsion jarayonlarning real vaqtdagi ko&apos;rsatkichlari
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/crm">
            <Button size="sm" variant="outline" leftIcon={<UserPlus className="w-4 h-4" />}>
              Qabul CRM ({newApplications})
            </Button>
          </Link>
          <Link href="/admin/students">
            <Button size="sm" variant="primary" leftIcon={<GraduationCap className="w-4 h-4" />}>
              O&apos;quvchi Qo&apos;shish
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase tracking-wider">Jami O&apos;quvchilar</span>
            <div className="p-2 rounded-xl bg-primary-purple/15 text-primary-cyan">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {isLoading ? '...' : totalStudents}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-status-success">
            <span className="font-semibold">{activeStudents} ta faol</span>
            <span className="text-text-muted">• barcha guruhlarda</span>
          </div>
        </Card>

        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase tracking-wider">Yangi Arizalar (Lidlar)</span>
            <div className="p-2 rounded-xl bg-status-warning/15 text-status-warning">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {isLoading ? '...' : data.applications.length}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-status-warning font-semibold">
            <span>{newApplications} ta yangi kutayotgan</span>
          </div>
        </Card>

        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase tracking-wider">Oylik Tushum</span>
            <div className="p-2 rounded-xl bg-status-success/15 text-status-success">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-status-success">
            {isLoading ? '...' : formatCurrency(data.finance.totalRevenue)}
          </div>
          <div className="text-xs text-text-muted">
            Kutilayotgan: <span className="text-text-secondary font-semibold">{formatCurrency(data.finance.pendingPayments)}</span>
          </div>
        </Card>

        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase tracking-wider">O&apos;rtacha Davomat</span>
            <div className="p-2 rounded-xl bg-primary-blue/15 text-primary-blue">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {isLoading ? '...' : `${avgAttendance}%`}
          </div>
          <div className="flex items-center gap-1 text-xs text-status-success">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Yuqori intizom ko&apos;rsatkichi</span>
          </div>
        </Card>
      </div>

      {/* Analytical Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Course Popularity & Group Status */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <div>
                <h3 className="text-base font-bold text-white">Kurslar Ommabopligi va O&apos;quvchilar Hajmi</h3>
                <p className="text-xs text-text-secondary mt-0.5">Har bir yo&apos;nalish bo&apos;yicha real talabalar taqsimoti</p>
              </div>
              <Link href="/admin/courses" className="text-xs text-primary-cyan hover:underline">
                Barcha kurslar →
              </Link>
            </div>

            <div className="space-y-4">
              {data.courses.slice(0, 5).map((course: any) => {
                const percentage = Math.min(100, Math.round(((course.studentsCount || 50) / 450) * 100));

                return (
                  <div key={course.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white truncate max-w-[280px]">
                        {course.title}
                      </span>
                      <span className="text-text-secondary font-mono">
                        {course.studentsCount} ta o&apos;quvchi ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-panel overflow-hidden border border-border/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Academic Groups Roster */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <div>
                <h3 className="text-base font-bold text-white">Faol Akademik Guruhlar</h3>
                <p className="text-xs text-text-secondary mt-0.5">Dars jadvallari va guruh to&apos;lalik darajasi</p>
              </div>
              <Link href="/admin/groups" className="text-xs text-primary-cyan hover:underline">
                Barcha guruhlar →
              </Link>
            </div>

            <div className="divide-y divide-border/50">
              {data.groups.map((group: any) => (
                <div key={group.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{group.name}</h4>
                    <p className="text-text-muted mt-0.5">{group.schedule} • {group.room}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="primary" size="sm">
                      {group.studentsCount || group.studentIds?.length || 0} / {group.capacity} o&apos;quvchi
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Side: Recent Activity Audit & Quick CRM Inflow */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick CRM Applications */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-base font-bold text-white">So&apos;nggi Arizalar</h3>
              <Link href="/admin/crm" className="text-xs text-primary-cyan hover:underline">
                Kanban taxtasi →
              </Link>
            </div>

            <div className="space-y-3">
              {data.applications.slice(0, 4).map((app: any) => (
                <div key={app.id} className="p-3 rounded-xl bg-background-panel border border-border text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{app.fullName}</div>
                    <div className="text-[11px] text-text-muted">{app.courseName}</div>
                  </div>
                  <Badge
                    variant={
                      app.status === 'APPROVED'
                        ? 'success'
                        : app.status === 'NEW'
                        ? 'warning'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Audit Logs */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-cyan" />
                Xavfsizlik & Faoliyat Jurnali
              </h3>
              <Link href="/admin/activity" className="text-xs text-primary-cyan hover:underline">
                Barchasi →
              </Link>
            </div>

            <div className="space-y-3">
              {data.activity.slice(0, 5).map((log: any) => (
                <div key={log.id} className="text-xs space-y-1 pb-2 border-b border-border/40 last:border-none">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-primary-cyan">@{log.username}</span>
                    <span className="text-[10px] text-text-muted">{log.timestamp?.split('T')[0]}</span>
                  </div>
                  <p className="text-text-secondary text-[11px] leading-relaxed">{log.details}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
