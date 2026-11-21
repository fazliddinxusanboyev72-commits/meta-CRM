'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/FormControls';
import { BlogPost } from '@/types';
import { Plus, Edit2, Trash2, Calendar, Clock, BookOpen } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    category: 'Texnologiya',
    authorName: 'Javohir Rahmatov',
    authorRole: 'Senior Full Stack Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tags: ['AI', 'Next.js'],
    readTime: '5 daqiqa',
    status: 'published' as const,
  });

  const fetchPosts = () => {
    setIsLoading(true);
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'Texnologiya',
      authorName: 'Javohir Rahmatov',
      authorRole: 'Senior Full Stack Engineer',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      tags: ['Dasturlash', 'IT'],
      readTime: '4 daqiqa',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchPosts();
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
            Blog va Maqolalar Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Texnik maqolalar, yangiliklar va dasturlash bo&apos;yicha qo&apos;llanmalar nashri
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi Maqola Yozish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} glow className="flex flex-col justify-between overflow-hidden">
            <div className="h-40 w-full overflow-hidden bg-background-panel relative">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge variant="primary">{post.category}</Badge>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-text-muted">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white line-clamp-2">{post.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{post.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-muted">{post.authorName}</span>
                <Badge variant="success" size="sm">Nashr qilingan</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi Maqola Yozish"
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Maqola Sarlavhasi *"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Kategoriya *"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Input
              label="O'qish Vaqti"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            />
          </div>

          <Input
            label="Muqova Rasm URL"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          />

          <Textarea
            label="Qisqa Anotatsiya (Excerpt) *"
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />

          <Textarea
            label="To'liq Maqola Matni (Markdown qo'llab-quvvatlanadi) *"
            required
            className="min-h-[160px]"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              Nashr qilish
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
