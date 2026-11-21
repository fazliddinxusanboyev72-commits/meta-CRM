'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { Badge } from '@/components/ui/Badge';
import { Settings, Shield, Server, Database, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Tizim Sozlamalari
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          MetaITSchool Maximum platformasining global parametrlari va integratsiyalari
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-status-success/15 border border-status-success/30 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Sozlamalar muvaffaqiyatli saqlandi.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Server className="w-5 h-5 text-primary-cyan" />
            <h3 className="text-base font-bold text-white">Platforma Rejimi va Muhiti</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-background-panel border border-border">
              <div>
                <strong className="text-white block">Tizim Versiyasi:</strong>
                <span className="text-text-muted">MetaITSchool Maximum Edition v2.0 (Next.js 14 App Router)</span>
              </div>
              <Badge variant="success">PRODUCTION READY</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-background-panel border border-border">
              <div>
                <strong className="text-white block">Ma&apos;lumotlar Bazasi:</strong>
                <span className="text-text-muted">PostgreSQL / Supabase Schemasi & Mahalliy Atomik Xotira</span>
              </div>
              <Badge variant="primary">ULANGAN & XAVFSIZ</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Shield className="w-5 h-5 text-status-warning" />
            <h3 className="text-base font-bold text-white">Xavfsizlik & Autentifikatsiya Parametrlari</h3>
          </div>

          <div className="space-y-3">
            <Input
              label="Admin Seans Muddat (Session Expiry - Kun)"
              defaultValue="7"
              type="number"
            />
            <Input
              label="Login Rate Limiting (Maksimal urinishlar soni / daqiqa)"
              defaultValue="5"
              type="number"
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="md" variant="primary">
            Sozlamalarni Saqlash
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
