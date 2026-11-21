'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Lock, User, KeyRound, AlertTriangle } from 'lucide-react';

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<any[]>([]);

  useEffect(() => {
    // Only the 3 authorized admin accounts exist
    setAdmins([
      {
        username: 'fazliddin',
        fullName: 'Fazliddin Xudoyberdiyev',
        email: 'fazliddin@metaitschool.uz',
        role: 'Super Administrator',
        status: 'Aktiv (Imtiyozli)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      {
        username: 'yaxyobek',
        fullName: 'Yaxyobek Olimov',
        email: 'yaxyobek@metaitschool.uz',
        role: 'Super Administrator',
        status: 'Aktiv (Imtiyozli)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      },
      {
        username: 'jasurbek',
        fullName: 'Jasurbek Nurmatov',
        email: 'jasurbek@metaitschool.uz',
        role: 'Super Administrator',
        status: 'Aktiv (Imtiyozli)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      },
    ]);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Vakolatli Administratorlar
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Tizim xavfsizligi qoidalariga binoan, faqatgina quyidagi 3 nafar teng huquqli administrator tizimga kirish huquqiga ega
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-primary-purple/10 border border-primary-purple/30 text-xs text-text-secondary flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary-cyan flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Qat&apos;iy Xavfsizlik Protokoli:</strong>
          <p className="mt-0.5 leading-relaxed">
            Tizimda boshqa administrator hisoblarini qo&apos;shish yoki ommaviy admin ro&apos;yxatdan o&apos;tish dasturiy darajada taqiqlangan.
            Barcha admin operatsiyalari audit jurnalida to&apos;liq qayd etiladi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {admins.map((adm) => (
          <Card key={adm.username} glow className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={adm.avatar}
                alt={adm.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-purple shadow-glow"
              />
              <div>
                <h3 className="text-base font-bold text-white">{adm.fullName}</h3>
                <div className="font-mono text-xs text-primary-cyan font-bold">@{adm.username}</div>
                <Badge variant="success" size="sm" className="mt-1">
                  {adm.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-border text-xs text-text-secondary">
              <div className="flex justify-between">
                <span className="text-text-muted">Email:</span>
                <strong className="text-white">{adm.email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Huquq darajasi:</span>
                <strong className="text-primary-cyan">{adm.role}</strong>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
