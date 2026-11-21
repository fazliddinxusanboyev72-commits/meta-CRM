'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/FormControls';
import { Exam, Course } from '@/types';
import { Plus, Clock, FileQuestion, CheckCircle2, Award } from 'lucide-react';

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    durationMinutes: 45,
    passingScore: 70,
    status: 'published' as const,
    questions: [
      {
        id: 'q1',
        text: "TypeScript da 'unknown' va 'any' o'rtasidagi asosiy farq nima?",
        type: 'mcq' as const,
        options: [
          "'unknown' xavfsiz tur bo'lib, unga murojaat qilishdan oldin tur tekshiruvi talab etiladi",
          "'any' turi faqat raqamlar uchun ishlatiladi",
          "Hech qanday farq yo'q",
          "'unknown' faqat serverda ishlaydi",
        ],
        correctAnswer: "'unknown' xavfsiz tur bo'lib, unga murojaat qilishdan oldin tur tekshiruvi talab etiladi",
        points: 20,
      },
      {
        id: 'q2',
        text: 'Next.js 14 da Server Components mijoz brauzeriga JavaScript hajmini oshirmaydimi?',
        type: 'tf' as const,
        options: ['To\'g\'ri (True)', 'Noto\'g\'ri (False)'],
        correctAnswer: 'To\'g\'ri (True)',
        points: 20,
      },
    ],
  });

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/exams').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
    ])
      .then(([eData, cData]) => {
        if (Array.isArray(eData)) setExams(eData);
        if (Array.isArray(cData)) {
          setCourses(cData);
          if (cData.length > 0) setFormData((prev) => ({ ...prev, courseId: cData[0].id }));
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find((c) => c.id === formData.courseId);

    const payload = {
      ...formData,
      courseTitle: course ? course.title : 'Dasturlash Kursi',
    };

    try {
      const res = await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        setExams((prev) => [created, ...prev]);
        setIsModalOpen(false);
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Imtihonlar va Sinov Tizimi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Oraliq va yakuniy test sinovlari, savollar bazasi va avtomatik baholash
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Yangi Imtihon Yaratish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} glow className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={exam.status === 'published' ? 'success' : 'secondary'}>
                  {exam.status === 'published' ? 'Faol sinov' : 'Qoralama'}
                </Badge>
                <span className="text-xs text-text-secondary flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {exam.durationMinutes} daqiqa
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{exam.title}</h3>
                <p className="text-xs text-primary-cyan mt-0.5">{exam.courseTitle}</p>
              </div>

              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {exam.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-border/60">
                <span className="text-text-muted">Savollar soni:</span>
                <strong className="text-white">{exam.questions?.length || 0} ta</strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">O&apos;tish balli:</span>
                <strong className="text-status-success">{exam.passingScore}%</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-text-muted">Avtomatik tekshiruv</span>
              <Button size="sm" variant="outline">
                Savollarni ko&apos;rish
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi Imtihon Testi Yaratish"
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Imtihon Nomi *"
            required
            placeholder="Frontend & TypeScript Yakuniy Sinov"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Select
            label="Tegishli Kurs *"
            options={courses.map((c) => ({ label: c.title, value: c.id }))}
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Davomiyligi (Daqiqa)"
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
            />
            <Input
              label="O'tish Balli (%)"
              type="number"
              min="1"
              max="100"
              value={formData.passingScore}
              onChange={(e) => setFormData({ ...formData, passingScore: Number(e.target.value) })}
            />
          </div>

          <Textarea
            label="Imtihon Tavsifi va Qoidalari"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              Yaratish
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
