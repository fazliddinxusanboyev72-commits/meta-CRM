'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/FormControls';
import { AcademicGroup, Course, Teacher } from '@/types';
import { Plus, Edit2, Trash2, Calendar, Users, Clock, MapPin } from 'lucide-react';

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<AcademicGroup[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    courseId: '',
    courseTitle: '',
    teacherId: '',
    teacherName: '',
    schedule: 'Dushanba, Chorshanba, Juma 18:30 - 20:30',
    room: 'Lab-A (Auditoriya 301)',
    capacity: 20,
    studentIds: [] as string[],
    startDate: '2026-03-01',
    endDate: '2026-09-01',
    status: 'active' as const,
  });

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/groups').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
      fetch('/api/admin/teachers').then((r) => r.json()),
    ])
      .then(([gData, cData, tData]) => {
        if (Array.isArray(gData)) setGroups(gData);
        if (Array.isArray(cData)) setCourses(cData);
        if (Array.isArray(tData)) setTeachers(tData);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      name: '',
      courseId: courses[0]?.id || '',
      courseTitle: courses[0]?.title || '',
      teacherId: teachers[0]?.id || '',
      teacherName: teachers[0]?.fullName || '',
      schedule: 'Dushanba, Chorshanba, Juma 18:30 - 20:30',
      room: 'Lab-A (Auditoriya 301)',
      capacity: 20,
      studentIds: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-09-01',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (g: AcademicGroup) => {
    setIsEditing(true);
    setFormData({
      id: g.id,
      name: g.name,
      courseId: g.courseId,
      courseTitle: g.courseTitle,
      teacherId: g.teacherId,
      teacherName: g.teacherName,
      schedule: g.schedule,
      room: g.room,
      capacity: g.capacity,
      studentIds: g.studentIds || [],
      startDate: g.startDate,
      endDate: g.endDate,
      status: g.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" guruhini o'chirishni xohlaysizmi?`)) return;

    try {
      const res = await fetch('/api/admin/groups', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setGroups((prev) => prev.filter((g) => g.id !== id));
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCourse = courses.find((c) => c.id === formData.courseId);
    const selectedTeacher = teachers.find((t) => t.id === formData.teacherId);

    const payload = {
      ...formData,
      courseTitle: selectedCourse ? selectedCourse.title : formData.courseTitle,
      teacherName: selectedTeacher ? selectedTeacher.fullName : formData.teacherName,
    };

    try {
      if (isEditing) {
        const res = await fetch('/api/admin/groups', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setGroups((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/groups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setGroups((prev) => [...prev, created]);
          setIsModalOpen(false);
        }
      }
    } catch {
      alert('Saqlashda xatolik yuz berdi');
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Akademik Guruhlar
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Guruhlar jadvallari, o&apos;qituvchilar va talabalar sig&apos;imini boshqarish
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi Guruh Ochish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => {
          const currentCount = group.studentIds?.length || group.studentsCount || 0;
          const percentage = Math.min(100, Math.round((currentCount / group.capacity) * 100));

          return (
            <Card key={group.id} glow className="p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={group.status === 'active' ? 'success' : 'secondary'}>
                    {group.status === 'active' ? 'Faol guruh' : 'Rejalashtirilgan'}
                  </Badge>
                  <span className="text-xs font-mono text-primary-cyan">{currentCount}/{group.capacity} o&apos;quvchi</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{group.name}</h3>
                  <p className="text-xs text-primary-cyan font-medium mt-0.5">{group.courseTitle}</p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-background-panel overflow-hidden border border-border">
                  <div
                    className="h-full bg-gradient-to-r from-primary-purple to-primary-cyan"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-border/60 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary-purple flex-shrink-0" />
                    <span>Ustoz: <strong className="text-white">{group.teacherName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary-cyan flex-shrink-0" />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-status-warning flex-shrink-0" />
                    <span>{group.room}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-[11px] text-text-muted">Boshlanish: {group.startDate}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(group)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-primary-cyan hover:bg-background-panel"
                    title="Tahrirlash"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(group.id, group.name)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-status-error hover:bg-background-panel"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Guruhni Tahrirlash" : "Yangi Guruh Ochish"}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Guruh Nomi *"
            required
            placeholder="Full Stack FS-2026-02"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Kurs *"
              options={courses.map((c) => ({ label: c.title, value: c.id }))}
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
            />
            <Select
              label="O'qituvchi *"
              options={teachers.map((t) => ({ label: t.fullName, value: t.id }))}
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Dars Jadvali *"
              placeholder="Dushanba, Chorshanba, Juma 18:30 - 20:30"
              required
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            />
            <Input
              label="Dars Xonasi (Auditoriya)"
              placeholder="Lab-A (Auditoriya 301)"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Sig'im (O'quvchilar soni)"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
            />
            <Input
              label="Boshlanish Sanasi"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Select
              label="Holat"
              options={[
                { label: 'Faol (active)', value: 'active' },
                { label: 'Rejalashtirilgan (upcoming)', value: 'upcoming' },
                { label: 'Tugatilgan (completed)', value: 'completed' },
              ]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Saqlash' : 'Ochish'}
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
