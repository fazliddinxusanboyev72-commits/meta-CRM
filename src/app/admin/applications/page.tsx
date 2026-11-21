'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CRMApplication } from '@/types';
import { Search, Phone, Calendar, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<CRMApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/crm')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setApps(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = apps.filter(
    (a) =>
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      a.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kursga Arizalar Ro&apos;yxati
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Veb-saytdan kelib tushgan barcha arizalarning jadval ko&apos;rinishi
          </p>
        </div>

        <Link href="/admin/crm">
          <Button size="md" variant="primary">
            Kanban taxtasiga o&apos;tish →
          </Button>
        </Link>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Arizachi ismi, telefon yoki kurs bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background-panel border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Arizachi</th>
                <th className="py-3.5 px-4">Telefon</th>
                <th className="py-3.5 px-4">Tanlangan Kurs</th>
                <th className="py-3.5 px-4">Qulay Vaqt</th>
                <th className="py-3.5 px-4">Holat</th>
                <th className="py-3.5 px-4">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    Arizalar topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-background-elevated/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{app.fullName}</div>
                      <div className="text-[11px] text-text-muted">{app.age} yosh</div>
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary font-mono">{app.phone}</td>
                    <td className="py-3.5 px-4 text-primary-cyan font-medium">{app.courseName}</td>
                    <td className="py-3.5 px-4 text-text-secondary">{app.preferredSchedule}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          app.status === 'ENROLLED'
                            ? 'success'
                            : app.status === 'APPROVED'
                            ? 'primary'
                            : app.status === 'NEW'
                            ? 'warning'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-text-muted text-[11px] font-mono">
                      {app.createdAt?.split('T')[0]}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
