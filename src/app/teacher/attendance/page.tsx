'use client';

import React, { useState, useEffect } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Student, AttendanceStatus } from '@/types';
import { Check, X, Clock, HelpCircle, Save, CheckCircle2 } from 'lucide-react';

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetch('/api/admin/students')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const list = data.slice(0, 4);
          setStudents(list);
          const initRec: Record<string, AttendanceStatus> = {};
          list.forEach((s) => (initRec[s.id] = 'present'));
          setRecords(initRec);
        }
      });
  }, []);

  const handleStatus = (id: string, st: AttendanceStatus) => {
    setRecords((prev) => ({ ...prev, [id]: st }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <TeacherLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guruh Davomatini Belgilash
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Full Stack FS-2026-01 guruhi bo&apos;yicha kunlik dars qatnashishi
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
          {isSaved ? 'Davomat Saqlandi!' : 'Davomatni Saqlash'}
        </Button>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-status-success/15 border border-status-success/30 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Davomat muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      <Card className="p-4 sm:p-5 flex items-center justify-between">
        <div>
          <span className="text-xs text-text-secondary block">Guruh:</span>
          <strong className="text-white text-base">Full Stack FS-2026-01 (18:30)</strong>
        </div>

        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-background-panel border border-border rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] font-semibold">
            <tr>
              <th className="py-3.5 px-4">Talaba ID / Ism</th>
              <th className="py-3.5 px-4 text-center">Kelgan</th>
              <th className="py-3.5 px-4 text-center">Kechikkan</th>
              <th className="py-3.5 px-4 text-center">Sababli</th>
              <th className="py-3.5 px-4 text-center">Kelmagan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {students.map((student) => {
              const cur = records[student.id] || 'present';

              return (
                <tr key={student.id} className="hover:bg-background-elevated/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{student.fullName}</div>
                    <div className="text-[11px] font-mono text-primary-cyan">{student.studentId}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleStatus(student.id, 'present')}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                        cur === 'present'
                          ? 'bg-status-success text-white'
                          : 'bg-background-panel border border-border text-text-muted hover:text-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleStatus(student.id, 'late')}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                        cur === 'late'
                          ? 'bg-status-warning text-white'
                          : 'bg-background-panel border border-border text-text-muted hover:text-white'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleStatus(student.id, 'excused')}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                        cur === 'excused'
                          ? 'bg-primary-blue text-white'
                          : 'bg-background-panel border border-border text-text-muted hover:text-white'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleStatus(student.id, 'absent')}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                        cur === 'absent'
                          ? 'bg-status-error text-white'
                          : 'bg-background-panel border border-border text-text-muted hover:text-white'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </TeacherLayout>
  );
}
