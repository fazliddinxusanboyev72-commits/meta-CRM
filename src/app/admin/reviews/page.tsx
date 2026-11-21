'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/FormControls';
import { TestimonialItem } from '@/types';
import { Star, Plus, CheckCircle2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<TestimonialItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    studentName: '',
    role: 'Frontend Dasturchi',
    company: 'Uzum Technologies',
    courseTitle: 'Full Stack JavaScript & Next.js Pro',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: '',
  });

  const fetchReviews = () => {
    setIsLoading(true);
    fetch('/api/admin/reviews')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchReviews();
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
            Bitiruvchilar Fikrlari va Sharhlar
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Bosh sahifada namoyish etiluvchi talaba sharhlari va baholashlar
          </p>
        </div>

        <Button size="md" variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi Fikr Qo&apos;shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((item) => (
          <Card key={item.id} glow className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-status-warning">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-status-warning" />
                ))}
              </div>
              <p className="text-xs text-text-secondary italic leading-relaxed">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.studentName}
                className="w-10 h-10 rounded-full object-cover border border-primary-purple"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{item.studentName}</h4>
                <p className="text-[11px] text-primary-cyan">{item.role} {item.company ? `(${item.company})` : ''}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi Fikr Qo'shish"
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Talaba Ismi *"
            required
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Lavozimi"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <Input
              label="Kompaniyasi"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <Input
            label="O'qigan Kursi"
            value={formData.courseTitle}
            onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
          />

          <Textarea
            label="Sharh Matni *"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
