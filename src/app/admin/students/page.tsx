'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/FormControls';
import { Student } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  UserCheck,
  UserX,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  AlertCircle,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    phone: '',
    status: 'active' as const,
    balance: 0,
    groupId: '',
    groupName: '',
    attendanceRate: 100,
    averageGrade: 90,
    notes: '',
  });

  const fetchStudents = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/students').then((r) => r.json()),
      fetch('/api/admin/groups').then((r) => r.json()),
    ])
      .then(([sData, gData]) => {
        if (Array.isArray(sData)) setStudents(sData);
        if (Array.isArray(gData)) setGroups(gData);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      fullName: '',
      email: '',
      phone: '',
      status: 'active',
      balance: 0,
      groupId: groups[0]?.id || '',
      groupName: groups[0]?.name || '',
      attendanceRate: 100,
      averageGrade: 90,
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setIsEditing(true);
    setSelectedStudent(student);
    setFormData({
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      status: student.status,
      balance: student.balance,
      groupId: student.groupId || '',
      groupName: student.groupName || '',
      attendanceRate: student.attendanceRate,
      averageGrade: student.averageGrade,
      notes: student.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name} ismli o'quvchini ro'yxatdan o'chirishni xohlaysizmi?`)) return;

    try {
      const res = await fetch('/api/admin/students', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedGroup = groups.find((g) => g.id === formData.groupId);
    const payload = {
      ...formData,
      groupName: selectedGroup ? selectedGroup.name : '',
      enrolledCourseIds: selectedGroup ? [selectedGroup.courseId] : ['full-stack-javascript'],
    };

    try {
      if (isEditing) {
        const res = await fetch('/api/admin/students', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setStudents((prev) => [created, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch {
      alert('Saqlashda xatolik yuz berdi');
    }
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            O&apos;quvchilarni Boshqarish
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Akademiyadagi barcha talabalar profillari, to&apos;lov balansi va davomat ko&apos;rsatkichlari
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi O&apos;quvchi Qo&apos;shish
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Ism, Student ID, Email yoki telefon orqali qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background-panel border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-background-panel border border-border rounded-xl px-3.5 py-2 text-sm text-text-main focus:outline-none focus:border-primary-purple cursor-pointer"
            >
              <option value="all">Barcha holatlar</option>
              <option value="active">Faol o&apos;quvchilar</option>
              <option value="inactive">Muzlatilgan / Faol emas</option>
              <option value="graduated">Bitirganlar</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Students Data Table with Horizontal Scroll */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Talaba ID / Ism</th>
                <th className="py-3.5 px-4">Aloqa</th>
                <th className="py-3.5 px-4">Guruh</th>
                <th className="py-3.5 px-4">Holat</th>
                <th className="py-3.5 px-4">Davomat</th>
                <th className="py-3.5 px-4">Balans</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-text-secondary">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-text-secondary">
                    O&apos;quvchilar topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-background-elevated/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                          alt={student.fullName}
                          className="w-9 h-9 rounded-full object-cover border border-border"
                        />
                        <div>
                          <div className="font-bold text-white">{student.fullName}</div>
                          <div className="text-[11px] font-mono text-primary-cyan">{student.studentId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-text-secondary">
                      <div>{student.phone}</div>
                      <div className="text-[11px] text-text-muted">{student.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-white">{student.groupName || 'Biriktirilmagan'}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          student.status === 'active'
                            ? 'success'
                            : student.status === 'graduated'
                            ? 'primary'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        {student.status === 'active'
                          ? 'Faol'
                          : student.status === 'graduated'
                          ? 'Bitirgan'
                          : 'Muzlatilgan'}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold ${
                          student.attendanceRate >= 90
                            ? 'text-status-success'
                            : student.attendanceRate >= 80
                            ? 'text-status-warning'
                            : 'text-status-error'
                        }`}
                      >
                        {student.attendanceRate}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold">
                      {student.balance > 0 ? (
                        <span className="text-status-error">-{formatCurrency(student.balance)}</span>
                      ) : (
                        <span className="text-status-success">0 so&apos;m</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setViewModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-background-panel"
                          title="Ko'rish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-primary-cyan hover:bg-background-panel"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id, student.fullName)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-status-error hover:bg-background-panel"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create / Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "O'quvchi Ma'lumotlarini Tahrirlash" : "Yangi O'quvchi Qo'shish"}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="To'liq Ism *"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              label="Telefon Raqam *"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Manzil *"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Select
              label="Akademik Guruh"
              options={groups.map((g) => ({ label: `${g.name} (${g.schedule})`, value: g.id }))}
              value={formData.groupId}
              onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Holat"
              options={[
                { label: 'Faol', value: 'active' },
                { label: 'Muzlatilgan', value: 'inactive' },
                { label: 'Bitirgan', value: 'graduated' },
              ]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            />
            <Input
              label="Qarzdorlik Balansi (so'm)"
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
            />
            <Input
              label="Davomat (%)"
              type="number"
              min="0"
              max="100"
              value={formData.attendanceRate}
              onChange={(e) => setFormData({ ...formData, attendanceRate: Number(e.target.value) })}
            />
          </div>

          <Textarea
            label="Ichki Ma'muriy Qaydlar"
            placeholder="O'quvchi haqida qo'shimcha ma'lumotlar..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Saqlash' : "Qo'shish"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Student Profile Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title="Talaba Shaxsiy Profili"
          maxWidth="md"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-background-panel border border-border">
              <img
                src={selectedStudent.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={selectedStudent.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-purple"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedStudent.fullName}</h3>
                <div className="text-xs font-mono text-primary-cyan">{selectedStudent.studentId}</div>
                <div className="text-xs text-text-secondary mt-1">{selectedStudent.groupName}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Telefon:</span>
                <strong className="text-white">{selectedStudent.phone}</strong>
              </div>
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Email:</span>
                <strong className="text-white truncate block">{selectedStudent.email}</strong>
              </div>
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Davomat darajasi:</span>
                <strong className="text-status-success">{selectedStudent.attendanceRate}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">To&apos;lov balansi:</span>
                <strong className="text-white">{formatCurrency(selectedStudent.balance)}</strong>
              </div>
            </div>

            {selectedStudent.notes && (
              <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs space-y-1">
                <span className="font-semibold text-text-secondary">Qaydlar:</span>
                <p className="text-text-main leading-relaxed">{selectedStudent.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
