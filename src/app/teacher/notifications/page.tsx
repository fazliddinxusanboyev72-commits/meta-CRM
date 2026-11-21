'use client';

import React, { useState, useEffect } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NotificationItem } from '@/types';
import { Bell, Info } from 'lucide-react';

export default function TeacherNotificationsPage() {
  const [notifs, setNotifs] = useState<NotificationItem[]>([]);

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotifs(data.filter((n) => n.targetRole === 'all' || n.targetRole === 'teacher'));
        }
      });
  }, []);

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          O&apos;qituvchi Xabarnomalari
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Akademiya ma&apos;muriyatidan pedagogik jamoa uchun e&apos;lonlar
        </p>
      </div>

      <div className="space-y-4">
        {notifs.map((n) => (
          <Card key={n.id} glow className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-cyan/20 text-primary-cyan flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">{n.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{n.message}</p>
              <span className="text-[10px] text-text-muted font-mono">{n.createdAt?.split('T')[0]}</span>
            </div>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
