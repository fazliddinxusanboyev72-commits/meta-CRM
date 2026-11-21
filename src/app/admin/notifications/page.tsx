'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/FormControls';
import { NotificationItem } from '@/types';
import { Bell, Plus, CheckCircle2, AlertTriangle, Info, Send } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetRole: 'all' as const,
    type: 'info' as const,
    link: '/courses',
  });

  const fetchNotifs = () => {
    setIsLoading(true);
    fetch('/api/admin/notifications')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setNotifications(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchNotifs();
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleMarkRead = async (id: string) => {
    await fetch('/api/admin/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Xabarnomalar Markazi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Barcha talabalar, o&apos;qituvchilar va tizim ma&apos;murlari uchun tizimli e&apos;lonlar tarqatish
          </p>
        </div>

        <Button size="md" variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi E&apos;lon Yuborish
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            glow
            className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              !notif.isRead ? 'border-primary-purple/40 bg-background-elevated' : 'bg-background-elevated/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notif.type === 'success'
                    ? 'bg-status-success/20 text-status-success'
                    : notif.type === 'warning'
                    ? 'bg-status-warning/20 text-status-warning'
                    : 'bg-primary-cyan/20 text-primary-cyan'
                }`}
              >
                {notif.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : notif.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <Info className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                  <Badge variant="secondary" size="sm">
                    {notif.targetRole.toUpperCase()}
                  </Badge>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-status-error animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{notif.message}</p>
                <div className="text-[10px] text-text-muted font-mono">{notif.createdAt?.split('T')[0]}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-center">
              {!notif.isRead && (
                <Button size="sm" variant="outline" onClick={() => handleMarkRead(notif.id)}>
                  O&apos;qildi deb belgilash
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi Tizimli E'lon Yuborish"
        maxWidth="md"
      >
        <form onSubmit={handleSend} className="space-y-4">
          <Input
            label="E'lon Sarlavhasi *"
            required
            placeholder="Yangi dars rejasi yoki ta'til e'loni"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Auditoriya (Kimlarga)"
              options={[
                { label: 'Barchaga (all)', value: 'all' },
                { label: 'Faqat Talabalarga (student)', value: 'student' },
                { label: 'Faqat Ustozlarga (teacher)', value: 'teacher' },
                { label: 'Adminlarga (admin)', value: 'admin' },
              ]}
              value={formData.targetRole}
              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value as any })}
            />
            <Select
              label="Turi (Type)"
              options={[
                { label: "Ma'lumot (info)", value: 'info' },
                { label: 'Muvaffaqiyat (success)', value: 'success' },
                { label: 'Ogohlantirish (warning)', value: 'warning' },
              ]}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            />
          </div>

          <Textarea
            label="Xabarnoma Matni *"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary" rightIcon={<Send className="w-4 h-4" />}>
              Yuborish
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
