'use client';

import React from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Clock, Check, X, Calendar } from 'lucide-react';

export default function StudentAttendancePage() {
  const records = [
    { date: '2026-03-20', topic: 'React 19 Server Components amaliyoti', status: 'present' },
    { date: '2026-03-18', topic: 'TypeScript Genericlar va Advanced Types', status: 'present' },
    { date: '2026-03-15', topic: 'Next.js App Router Arxitekturasi', status: 'present' },
    { date: '2026-03-13', topic: 'Modern JavaScript ES6+ chuqur tahlil', status: 'late', note: '10 daqiqa kechikdi' },
    { date: '2026-03-11', topic: 'Git, GitHub va Branching strategiyalari', status: 'present' },
  ];

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mening Davomat Tarixim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Darslardagi qatnashishingiz va intizom ko&apos;rsatkichlari
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Umumiy Davomat</span>
          <div className="text-3xl font-extrabold text-status-success">96%</div>
          <p className="text-xs text-status-success flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Yuqori intizom
          </p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Qatnashilgan Darslar</span>
          <div className="text-3xl font-extrabold text-white">24 ta</div>
          <p className="text-xs text-text-muted">Jami 25 ta darsdan</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Kechikishlar</span>
          <div className="text-3xl font-extrabold text-status-warning">1 marta</div>
          <p className="text-xs text-text-muted">10 daqiqa</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Sana</th>
                <th className="py-3.5 px-4">Dars Mavzusi</th>
                <th className="py-3.5 px-4">Holat</th>
                <th className="py-3.5 px-4 text-right">Izoh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {records.map((r, idx) => (
                <tr key={idx} className="hover:bg-background-elevated/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-white">{r.date}</td>
                  <td className="py-3.5 px-4 font-medium text-text-main">{r.topic}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={r.status === 'present' ? 'success' : 'warning'} size="sm">
                      {r.status === 'present' ? 'Qatnashdi' : 'Kechikdi'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right text-text-muted text-xs">
                    {r.note || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </StudentLayout>
  );
}
