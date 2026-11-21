'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AcademicGroup } from '@/types';
import { Users, Clock, MapPin, CheckSquare } from 'lucide-react';

export default function TeacherGroupsPage() {
  const [groups, setGroups] = useState<AcademicGroup[]>([]);

  useEffect(() => {
    fetch('/api/admin/groups')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setGroups(data);
      });
  }, []);

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mening Guruhlarim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Sizga biriktirilgan akademik guruhlar, jadvallar va xonalar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Card key={group.id} glow className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-sm font-bold text-primary-cyan">{group.name}</span>
              <Badge variant="success" size="sm">{group.status}</Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{group.courseTitle}</h3>
              <p className="text-xs text-text-secondary mt-0.5">{group.schedule}</p>
            </div>

            <div className="space-y-2 text-xs text-text-secondary pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-status-warning" />
                <span>Auditoriya: <strong className="text-white">{group.room}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-primary-purple" />
                <span>O&apos;quvchilar: <strong className="text-white">{group.studentsCount || group.studentIds?.length || 0} / {group.capacity}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Link href="/teacher/attendance">
                <Button size="sm" variant="primary" leftIcon={<CheckSquare className="w-4 h-4" />}>
                  Guruh davomati
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
