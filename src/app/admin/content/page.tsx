'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/FormControls';
import { CMSSettings } from '@/types';
import { Save, CheckCircle2, Globe, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function AdminContentCMSPage() {
  const [cms, setCms] = useState<CMSSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        if (data) setCms(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cms) return;

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cms),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  if (isLoading || !cms) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-text-secondary">Yuklanmoqda...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Veb-sayt Kontent Boshqaruvi (CMS)
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Bosh sahifa matnlari, e&apos;lonlar paneli, aloqa ma&apos;lumotlari va statistikani real vaqtda yangilang
            </p>
          </div>

          <Button type="submit" size="md" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            {isSaved ? 'O\'zgarishlar Saqlandi!' : 'O\'zgarishlarni Saqlash'}
          </Button>
        </div>

        {isSaved && (
          <div className="p-4 rounded-xl bg-status-success/15 border border-status-success/30 text-xs text-status-success flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Kontent bazada muvaffaqiyatli yangilandi va jonli veb-saytda aks etmoqda!</span>
          </div>
        )}

        {/* Hero Section Editor */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Sparkles className="w-5 h-5 text-primary-cyan" />
            <h3 className="text-base font-bold text-white">Bosh Sahifa Qahramon (Hero) Qismi</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Kichik Badge Matni"
              value={cms.hero.badge}
              onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, badge: e.target.value } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Asosiy Sarlavha (1-qism)"
                value={cms.hero.headline}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, headline: e.target.value } })}
              />
              <Input
                label="Ajratilgan Sarlavha (Gradiyent qism)"
                value={cms.hero.highlightedText}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, highlightedText: e.target.value } })}
              />
            </div>

            <Textarea
              label="Qo'llab-quvvatlovchi Matn (Subtitle)"
              value={cms.hero.supportingText}
              onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, supportingText: e.target.value } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="1-Tugma Matni (Primary CTA)"
                value={cms.hero.ctaPrimary}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, ctaPrimary: e.target.value } })}
              />
              <Input
                label="2-Tugma Matni (Secondary CTA)"
                value={cms.hero.ctaSecondary}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, ctaSecondary: e.target.value } })}
              />
            </div>
          </div>
        </Card>

        {/* Announcement Banner */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-base font-bold text-white">Yuqori E&apos;lonlar Paneli (Announcement)</h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-text-secondary">
              <input
                type="checkbox"
                checked={cms.announcement.enabled}
                onChange={(e) =>
                  setCms({
                    ...cms,
                    announcement: { ...cms.announcement, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 accent-primary-purple rounded"
              />
              <span>Faol ko&apos;rsatish</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="E'lon Matni"
                value={cms.announcement.text}
                onChange={(e) =>
                  setCms({
                    ...cms,
                    announcement: { ...cms.announcement, text: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Input
                label="Havola Matni"
                value={cms.announcement.linkText}
                onChange={(e) =>
                  setCms({
                    ...cms,
                    announcement: { ...cms.announcement, linkText: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Phone className="w-5 h-5 text-status-success" />
            <h3 className="text-base font-bold text-white">Akademiya Aloqa Ma&apos;lumotlari</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telefon Raqam"
              value={cms.contact.phone}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, phone: e.target.value } })}
            />
            <Input
              label="Email"
              value={cms.contact.email}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, email: e.target.value } })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Manzil"
              value={cms.contact.address}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, address: e.target.value } })}
            />
            <Input
              label="Ish Vaqti"
              value={cms.contact.workingHours}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, workingHours: e.target.value } })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Telegram Kanali"
              value={cms.contact.telegram}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, telegram: e.target.value } })}
            />
            <Input
              label="Instagram Profili"
              value={cms.contact.instagram}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, instagram: e.target.value } })}
            />
            <Input
              label="YouTube Kanali"
              value={cms.contact.youtube}
              onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, youtube: e.target.value } })}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" variant="primary" className="shadow-glow" leftIcon={<Save className="w-4 h-4" />}>
            O&apos;zgarishlarni Saqlash
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
