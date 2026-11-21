'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/FormControls';
import { Course, Teacher } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit2, Trash2, BookOpen, Star, Clock, CheckCircle2 } from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title: '',
    subtitle: '',
    category: 'programming' as const,
    level: "O'rta" as const,
    duration: '6 oy',
    price: 1800000,
    rating: 4.9,
    reviewsCount: 50,
    studentsCount: 150,
    teacherId: '',
    teacherName: '',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: '',
    overview: '',
    learningOutcomes: [] as string[],
    requirements: [] as string[],
    modulesCount: 6,
    lessonsCount: 48,
    status: 'published' as const,
  });

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/courses').then((r) => r.json()),
      fetch('/api/admin/teachers').then((r) => r.json()),
    ])
      .then(([cData, tData]) => {
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
      slug: '',
      title: '',
      subtitle: '',
      category: 'programming',
      level: "O'rta",
      duration: '6 oy',
      price: 1800000,
      rating: 5.0,
      reviewsCount: 10,
      studentsCount: 0,
      teacherId: teachers[0]?.id || '',
      teacherName: teachers[0]?.fullName || '',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      description: '',
      overview: '',
      learningOutcomes: ['Zamonaviy texnologiyalarni o\'rganish', 'Portfolio loyihalarini yaratish'],
      requirements: ['Kompyuterdan asosiy foydalanish ko\'nikmasi'],
      modulesCount: 6,
      lessonsCount: 48,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setIsEditing(true);
    setFormData({
      id: c.id,
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      category: c.category,
      level: c.level,
      duration: c.duration,
      price: c.price,
      rating: c.rating,
      reviewsCount: c.reviewsCount,
      studentsCount: c.studentsCount,
      teacherId: c.teacherId,
      teacherName: c.teacherName || '',
      coverImage: c.coverImage,
      description: c.description,
      overview: c.overview,
      learningOutcomes: c.learningOutcomes || [],
      requirements: c.requirements || [],
      modulesCount: c.modulesCount,
      lessonsCount: c.lessonsCount,
      status: c.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" kursini o'chirishni xohlaysizmi?`)) return;

    try {
      const res = await fetch('/api/admin/courses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedTeacher = teachers.find((t) => t.id === formData.teacherId);
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      teacherName: selectedTeacher ? selectedTeacher.fullName : '',
      teacherAvatar: selectedTeacher ? selectedTeacher.avatar : '',
    };

    try {
      if (isEditing) {
        const res = await fetch('/api/admin/courses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setCourses((prev) => [created, ...prev]);
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
            Kurslar va O&apos;quv Dasturlari
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Akademiyadagi barcha yo&apos;nalishlar, narxlar va dars rejalari
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi Kurs Yaratish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} glow className="flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full bg-background-panel">
              <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge variant="primary">{course.category.toUpperCase()}</Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant={course.status === 'published' ? 'success' : 'secondary'}>
                  {course.status === 'published' ? 'Nashr qilingan' : 'Qoralama'}
                </Badge>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white line-clamp-1">{course.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{course.subtitle}</p>

                <div className="flex items-center justify-between text-xs text-text-muted pt-2">
                  <span>Mentor: <strong className="text-text-main">{course.teacherName}</strong></span>
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-text-muted">Kurs narxi:</div>
                  <div className="text-sm font-bold text-primary-cyan">{formatCurrency(course.price)}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-primary-cyan hover:bg-background-panel"
                    title="Tahrirlash"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id, course.title)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-status-error hover:bg-background-panel"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Kurs Ma'lumotlarini Tahrirlash" : "Yangi Kurs Yaratish"}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Kurs Nomi *"
            required
            placeholder="Full Stack JavaScript & Next.js Pro"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Input
            label="Qisqa Ta'rif (Subtitle) *"
            required
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Kategoriya"
              options={[
                { label: 'Dasturlash (programming)', value: 'programming' },
                { label: 'Dizayn (design)', value: 'design' },
                { label: 'Texnologiya & AI (technology)', value: 'technology' },
              ]}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            />
            <Select
              label="Daraja"
              options={[
                { label: "Boshlang'ich", value: "Boshlang'ich" },
                { label: "O'rta", value: "O'rta" },
                { label: 'Mukammal', value: 'Mukammal' },
              ]}
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
            />
            <Input
              label="Davomiyligi"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Oylik Narx (so'm) *"
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <Select
              label="Mas'ul Ustoz"
              options={teachers.map((t) => ({ label: `${t.fullName} (${t.specialization})`, value: t.id }))}
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
            />
            <Select
              label="Holat"
              options={[
                { label: 'Nashr qilingan (published)', value: 'published' },
                { label: 'Qoralama (draft)', value: 'draft' },
              ]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            />
          </div>

          <Input
            label="Cover Rasm URL"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          />

          <Textarea
            label="Kurs Tavsifi (Overview)"
            required
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Saqlash' : 'Yaratish'}
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
