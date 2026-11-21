'use client';

import React from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';

export default function StudentGradesPage() {
  const grades = [
    { title: 'TypeScript CLI Mini Tool', type: 'Uy vazifasi', score: 98, max: 100, date: '2026-03-21', status: 'A\'lo' },
    { title: 'React Server Components Oraliq Test', type: 'Imtihon', score: 94, max: 100, date: '2026-03-15', status: 'A\'lo' },
    { title: 'CSS Flexbox & Responsive Dizayn', type: 'Uy vazifasi', score: 90, max: 100, date: '2026-03-05', status: 'Yaxshi' },
  ];

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Akademik Baholarim va Natijalar
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Barcha topshiriqlar, amaliy ishlar va imtihon natijalari
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">O&apos;rtacha Ball</span>
          <div className="text-3xl font-extrabold text-status-success">94.0 / 100</div>
          <p className="text-xs text-text-muted">Guruhdagi top 5% ichida</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Topshirilgan Ishlar</span>
          <div className="text-3xl font-extrabold text-primary-cyan">12 ta</div>
          <p className="text-xs text-text-muted">Barchasi o&apos;z vaqtida</p>
        </Card>

        <Card glow className="p-5 space-y-2">
          <span className="text-xs text-text-secondary uppercase font-semibold">Akademik Daraja</span>
          <div className="text-3xl font-extrabold text-white">A (A&apos;lo)</div>
          <p className="text-xs text-primary-purple">Sertifikatga tavsiya etilgan</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Topshiriq / Imtihon</th>
                <th className="py-3.5 px-4">Turi</th>
                <th className="py-3.5 px-4">Baho (Score)</th>
                <th className="py-3.5 px-4">Sana</th>
                <th className="py-3.5 px-4 text-right">Baholash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {grades.map((g, idx) => (
                <tr key={idx} className="hover:bg-background-elevated/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{g.title}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{g.type}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-status-success">{g.score} / {g.max}</td>
                  <td className="py-3.5 px-4 text-text-muted font-mono">{g.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge variant="success" size="sm">{g.status}</Badge>
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
