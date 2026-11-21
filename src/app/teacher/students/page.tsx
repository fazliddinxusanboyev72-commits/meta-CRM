'use client';

import React, { useState, useEffect } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Student } from '@/types';
import { Search, GraduationCap, Phone, Mail } from 'lucide-react';

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/admin/students')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setStudents(data);
      });
  }, []);

  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm)
  );

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mening O&apos;quvchilarim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Sizning guruhlaringizda ta&apos;lim olayotgan talabalar ro&apos;yxati
        </p>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Talaba ismi, ID yoki telefon bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background-panel border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Talaba ID / Ism</th>
                <th className="py-3.5 px-4">Aloqa</th>
                <th className="py-3.5 px-4">Guruh</th>
                <th className="py-3.5 px-4">Davomat</th>
                <th className="py-3.5 px-4">O&apos;rtacha Baho</th>
                <th className="py-3.5 px-4 text-right">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-background-elevated/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{student.fullName}</div>
                    <div className="text-[11px] font-mono text-primary-cyan">{student.studentId}</div>
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">
                    <div>{student.phone}</div>
                    <div className="text-[11px] text-text-muted">{student.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-white font-medium">{student.groupName || 'FS-2026-01'}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-status-success">{student.attendanceRate}%</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-primary-cyan">{student.averageGrade} ball</td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge variant="success" size="sm">Faol</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </TeacherLayout>
  );
}
