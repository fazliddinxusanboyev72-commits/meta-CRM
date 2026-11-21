'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/FormControls';
import { ProjectItem } from '@/types';
import { Plus, Edit2, Trash2, ExternalLink, Github, Briefcase } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: 'web' as const,
    categoryLabel: 'Veb Ilova',
    studentName: '',
    courseTitle: 'Full Stack JavaScript & Next.js Pro',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    description: '',
    technologies: 'React, Next.js, TypeScript, Tailwind CSS',
  });

  const fetchProjects = () => {
    setIsLoading(true);
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      technologies: formData.technologies.split(',').map((t) => t.trim()),
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProjects();
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
            Bitiruvchilar Portfolio Loyihalari
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Sayt galereyasida namoyish etiluvchi real talabalar ishlari
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Yangi Loyiha Qo&apos;shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} glow className="flex flex-col justify-between overflow-hidden">
            <div className="h-40 w-full overflow-hidden bg-background-panel relative">
              <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary">{proj.categoryLabel}</Badge>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-primary-cyan font-semibold">Muallif: {proj.studentName}</div>
                <h3 className="text-base font-bold text-white line-clamp-1">{proj.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{proj.description}</p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-muted truncate max-w-[180px]">{proj.courseTitle}</span>
                {proj.demoUrl && (
                  <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="text-primary-cyan hover:underline flex items-center gap-1">
                    Demo <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi Portfolio Loyiha Qo'shish"
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Loyiha Nomi *"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Muallif Talaba Ismi *"
              required
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            />
            <Select
              label="Kategoriya"
              options={[
                { label: 'Veb Ilova (web)', value: 'web' },
                { label: 'Mobil Ilova (mobile)', value: 'mobile' },
                { label: 'Sun\'iy Intellekt (ai)', value: 'ai' },
                { label: 'UI/UX Dizayn (design)', value: 'design' },
              ]}
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as any,
                  categoryLabel: e.target.value.toUpperCase(),
                })
              }
            />
          </div>

          <Input
            label="Cover Rasm URL"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          />

          <Input
            label="Jonli Demo URL (agar mavjud bo'lsa)"
            value={formData.demoUrl}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
          />

          <Input
            label="Ishlatilgan Texnologiyalar (vergul bilan)"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          />

          <Textarea
            label="Loyiha Tavsifi *"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              Qo&apos;shish
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
