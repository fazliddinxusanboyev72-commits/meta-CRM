'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GroupAttendance, AttendanceStatus, AcademicGroup, Student } from '@/types';
import { Calendar, Check, X, Clock, HelpCircle, Save, CheckCircle2 } from 'lucide-react';

export default function AdminAttendancePage() {
  const [groups, setGroups] = useState<AcademicGroup[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState('');
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/groups').then((r) => r.json()),
      fetch('/api/admin/students').then((r) => r.json()),
      fetch('/api/admin/attendance').then((r) => r.json()),
    ]).then(([gData, sData, aData]) => {
      if (Array.isArray(gData) && gData.length > 0) {
        setGroups(gData);
        setSelectedGroupId(gData[0].id);
      }
      if (Array.isArray(sData)) setStudents(sData);
      setIsLoading(false);
    });
  }, []);

  const groupStudents = students.filter((s) => s.groupId === selectedGroupId);

  // Initialize records when group changes
  useEffect(() => {
    const initialRecords: Record<string, AttendanceStatus> = {};
    groupStudents.forEach((s) => {
      initialRecords[s.id] = 'present';
    });
    setRecords(initialRecords);
  }, [selectedGroupId, students]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) => ({ ...prev, [studentId]: status }));
    setIsSaved(false);
  };

  const handleSaveAttendance = async () => {
    const group = groups.find((g) => g.id === selectedGroupId);
    if (!group) return;

    const payload = {
      groupId: selectedGroupId,
      groupName: group.name,
      date: selectedDate,
      topic: topic || 'Rejali amaliy dars',
      records: groupStudents.map((s) => ({
        studentId: s.id,
        studentName: s.fullName,
        status: records[s.id] || 'present',
      })),
    };

    try {
      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const presentCount = Object.values(records).filter((s) => s === 'present').length;
  const absentCount = Object.values(records).filter((s) => s === 'absent').length;
  const lateCount = Object.values(records).filter((s) => s === 'late').length;
  const totalCount = groupStudents.length;
  const attendanceRate = totalCount ? Math.round(((presentCount + lateCount * 0.8) / totalCount) * 100) : 100;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Davomat Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Guruhlar bo&apos;yicha kunlik dars davomati va o&apos;quvchilar intizomi
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={handleSaveAttendance}
          leftIcon={<Save className="w-4 h-4" />}
        >
          {isSaved ? 'Davomat Saqlandi!' : 'Davomatni Saqlash'}
        </Button>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-status-success/15 border border-status-success/30 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Davomat muvaffaqiyatli saqlandi va tizim auditiga qayd etildi.</span>
        </div>
      )}

      {/* Group & Date Selector */}
      <Card className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold uppercase text-text-secondary mb-1.5">
              Akademik Guruh
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full bg-background-panel border border-border rounded-xl px-3.5 py-2 text-sm text-text-main focus:outline-none focus:border-primary-purple cursor-pointer"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.schedule})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-text-secondary mb-1.5">
              Dars Sanasi
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-background-panel border border-border rounded-xl px-3.5 py-2 text-sm text-text-main focus:outline-none focus:border-primary-purple cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-text-secondary mb-1.5">
              Dars Mavzusi
            </label>
            <input
              type="text"
              placeholder="Masalan: TypeScript Genericlar"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-background-panel border border-border rounded-xl px-3.5 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
            />
          </div>
        </div>
      </Card>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-background-elevated border border-border text-center space-y-1">
          <span className="text-xs text-text-muted block">Jami O&apos;quvchilar</span>
          <strong className="text-xl font-bold text-white">{totalCount}</strong>
        </div>
        <div className="p-4 rounded-xl bg-background-elevated border border-border text-center space-y-1">
          <span className="text-xs text-status-success block">Qatnashdi (Kelgan)</span>
          <strong className="text-xl font-bold text-status-success">{presentCount}</strong>
        </div>
        <div className="p-4 rounded-xl bg-background-elevated border border-border text-center space-y-1">
          <span className="text-xs text-status-error block">Kelmagan (Sababsiz)</span>
          <strong className="text-xl font-bold text-status-error">{absentCount}</strong>
        </div>
        <div className="p-4 rounded-xl bg-background-elevated border border-border text-center space-y-1">
          <span className="text-xs text-primary-cyan block">Davomat Foizi</span>
          <strong className="text-xl font-bold text-primary-cyan">{attendanceRate}%</strong>
        </div>
      </div>

      {/* Attendance Matrix Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Talaba ID / Ism</th>
                <th className="py-3.5 px-4 text-center">Kelgan</th>
                <th className="py-3.5 px-4 text-center">Kechikkan</th>
                <th className="py-3.5 px-4 text-center">Sababli</th>
                <th className="py-3.5 px-4 text-center">Kelmagan</th>
                <th className="py-3.5 px-4 text-right">Umumiy Davomat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {groupStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    Ushbu guruhda o&apos;quvchilar topilmadi.
                  </td>
                </tr>
              ) : (
                groupStudents.map((student) => {
                  const currentStatus = records[student.id] || 'present';

                  return (
                    <tr key={student.id} className="hover:bg-background-elevated/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{student.fullName}</div>
                        <div className="text-[11px] font-mono text-primary-cyan">{student.studentId}</div>
                      </td>

                      {/* Present */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                            currentStatus === 'present'
                              ? 'bg-status-success text-white shadow-glow'
                              : 'bg-background-panel border border-border text-text-muted hover:text-white'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Late */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                            currentStatus === 'late'
                              ? 'bg-status-warning text-white shadow-glow'
                              : 'bg-background-panel border border-border text-text-muted hover:text-white'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Excused */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleStatusChange(student.id, 'excused')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                            currentStatus === 'excused'
                              ? 'bg-primary-blue text-white shadow-glow'
                              : 'bg-background-panel border border-border text-text-muted hover:text-white'
                          }`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Absent */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                            currentStatus === 'absent'
                              ? 'bg-status-error text-white shadow-glow'
                              : 'bg-background-panel border border-border text-text-muted hover:text-white'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="font-semibold text-text-main">{student.attendanceRate}%</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
