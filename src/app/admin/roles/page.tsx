'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function AdminRolesPage() {
  const roles = [
    {
      name: 'Administrator',
      desc: 'Tizimning barcha modullarini boshqarish, talabalar, darslar, to\'lovlar, CMS va sozlamalarni o\'zgartirish to\'liq huquqi.',
      users: ['fazliddin', 'yaxyobek', 'jasurbek'],
      permissions: [
        'Talabalar CRUD',
        'O\'qituvchilar CRUD',
        'Kurslar & Sillabus boshqaruvi',
        'Davomat nazorati va tuzatishlar',
        'Moliya & Kvitansiyalar berish',
        'Sertifikatlar generatsiyasi',
        'Veb-sayt CMS tahrirlash',
      ],
    },
    {
      name: 'O\'qituvchi (Teacher)',
      desc: 'Faqatgina o\'ziga biriktirilgan guruhlar, dars materiallari, uy vazifalarini tekshirish va davomat olish huquqi.',
      users: ['Javohir Rahmatov', 'Madina Qodirova', 'Anvar Toshmatov va boshqalar'],
      permissions: [
        'Biriktirilgan guruhlar dars jadvallarini ko\'rish',
        'Kunlik davomat belgilash',
        'Uy vazifalarini baholash va fikr qoldirish',
        'Dars videoyozuvlari va konspektlarini yuklash',
      ],
    },
    {
      name: 'Talaba (Student)',
      desc: 'Shaxsiy o\'quv kabineti: darslarni ko\'rish, topshiriq topshirish, imtihon topshirish va sertifikatni yuklab olish.',
      users: ['Barcha ro\'yxatdan o\'tgan talabalar'],
      permissions: [
        'O\'z kursi darslarini tomosha qilish',
        'Uy vazifalarini yuborish',
        'Sinov testlaridan o\'tish',
        'Shaxsiy to\'lov va davomat tarixini ko\'rish',
        'Sertifikatini yuklab olish',
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Rollar va Ruxsatlar Tizimi (RBAC)
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Platformada ma&apos;lumotlar xavfsizligini ta&apos;minlovchi ro&apos;lga asoslangan ruxsatlar matritsasi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((r) => (
          <Card key={r.name} glow className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="text-base font-bold text-white">{r.name}</h3>
                <Badge variant="primary" size="sm">Faol rol</Badge>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">{r.desc}</p>

              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                  Ruxsat etilgan amallar:
                </div>
                <ul className="space-y-1.5">
                  {r.permissions.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs text-text-main">
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-success flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-[11px] text-text-muted">
              Foydalanuvchilar: <strong className="text-primary-cyan">{r.users.join(', ')}</strong>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
