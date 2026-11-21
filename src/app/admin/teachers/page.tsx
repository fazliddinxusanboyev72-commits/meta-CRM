'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/FormControls';
import { Teacher, Course } from '@/types';
import { Plus, Edit2, Trash2, Star, Users, Phone, Mail, Award, BookOpen } from 'lucide-react';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    phone: '',
    avatar: '',
    bio: '',
    specialization: '',
    experience: '5 yil',
    rating: 5.0,
    studentsCount: 100,
    courseIds: [] as string[],
    social: { github: '', linkedin: '', telegram: '' },
  });

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/teachers').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
    ])
      .then(([tData, cData]) => {
        if (Array.isArray(tData)) setTeachers(tData);
        if (Array.isArray(cData)) setCourses(cData);
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
      fullName: '',
      email: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: '',
      specialization: '',
      experience: '5 yil',
      rating: 5.0,
      studentsCount: 0,
      courseIds: courses.length > 0 ? [courses[0].id] : [],
      social: { github: '', linkedin: '', telegram: '' },
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setIsEditing(true);
    setFormData({
      id: t.id,
      fullName: t.fullName,
      email: t.email,
      phone: t.phone,
      avatar: t.avatar,
      bio: t.bio,
      specialization: t.specialization,
      experience: t.experience,
      rating: t.rating,
      studentsCount: t.studentsCount,
      courseIds: t.courseIds || [],
      social: t.social || { github: '', linkedin: '', telegram: '' },
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name} ustozni o'chirishni xohlaysizmi?`)) return;

    try {
      const res = await fetch('/api/admin/teachers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setTeachers((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const res = await fetch('/api/admin/teachers', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setTeachers((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setTeachers((prev) => [...prev, created]);
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
            O&apos;qituvchilar Tarkibi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Akademiyadagi barcha mentorlar, ularning mutaxassisligi va biriktirilgan kurslari
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi Ustoz Qo&apos;shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => {
          const assignedCourses = courses.filter((c) => teacher.courseIds?.includes(c.id));

          return (
            <Card key={teacher.id} glow className="p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={teacher.avatar}
                    alt={teacher.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border border-primary-purple/40 shadow-glow"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{teacher.fullName}</h3>
                    <div className="text-xs text-primary-cyan">{teacher.specialization}</div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-text-secondary">
                      <span className="flex items-center gap-1 text-status-warning font-semibold">
                        <Star className="w-3.5 h-3.5 fill-status-warning" />
                        {teacher.rating}
                      </span>
                      <span>•</span>
                      <span>{teacher.experience}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                  {teacher.bio}
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                    Biriktirilgan kurslar:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {assignedCourses.map((c) => (
                      <span
                        key={c.id}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-background-panel border border-border text-text-main"
                      >
                        {c.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="text-xs text-text-muted">{teacher.phone}</div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(teacher)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-primary-cyan hover:bg-background-panel"
                    title="Tahrirlash"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id, teacher.fullName)}
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
        title={isEditing ? "O'qituvchi Ma'lumotlarini Tahrirlash" : "Yangi O'qituvchi Qo'shish"}
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
              label="Email *"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telefon *"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="Mutaxassislik (Specialization) *"
              placeholder="Senior Full Stack / UI UX Lead"
              required
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Tajriba (Masalan: 6 yil)"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
            <Input
              label="Reyting (1-5)"
              type="number"
              step="0.01"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            />
            <Input
              label="Avatar Rasm URL"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
          </div>

          <Textarea
            label="Biografiya va Professional Tajriba"
            required
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
    </AdminLayout>
  );
}
