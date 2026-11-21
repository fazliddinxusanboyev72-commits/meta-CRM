'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AcademicGroup } from '@/types';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';

export default function AdminSchedulesPage() {
  const [groups, setGroups] = useState<AcademicGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/groups')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setGroups(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Akademik Dars Jadvallari
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Barcha guruhlarning dars kunlari, vaqtlari, xonalari va mas&apos;ul ustozlar ro&apos;yxati
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Card key={group.id} glow className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-xs font-bold text-primary-cyan">{group.name}</span>
              <Badge variant="primary" size="sm">{group.status}</Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{group.courseTitle}</h3>
              <p className="text-xs text-text-secondary mt-1">Mentor: <strong className="text-white">{group.teacherName}</strong></p>
            </div>

            <div className="space-y-2 text-xs text-text-secondary pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-cyan flex-shrink-0" />
                <span className="text-white font-medium">{group.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-status-warning flex-shrink-0" />
                <span>Auditoriya: <strong className="text-white">{group.room}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-purple flex-shrink-0" />
                <span>O&apos;quvchilar soni: <strong className="text-white">{group.studentsCount || group.studentIds?.length || 0} / {group.capacity}</strong></span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
