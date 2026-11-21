'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Course } from '@/types';
import { BookOpen, Video, ArrowRight, Star, Clock } from 'lucide-react';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCourses(data.slice(0, 3));
      });
  }, []);

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mening Kurslarim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Siz ro&apos;yxatdan o&apos;tgan va o&apos;rganayotgan barcha ta&apos;lim yo&apos;nalishlari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <Card key={c.id} glow className="flex flex-col justify-between overflow-hidden">
            <div className="h-44 w-full overflow-hidden bg-background-panel relative">
              <img src={c.coverImage} alt={c.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge variant="primary">{c.category.toUpperCase()}</Badge>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white line-clamp-1">{c.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{c.subtitle}</p>

                <div className="flex items-center justify-between text-xs text-text-muted pt-2">
                  <span>Ustoz: <strong className="text-white">{c.teacherName}</strong></span>
                  <span>{c.duration}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <Badge variant="success" size="sm">O&apos;rganilmoqda</Badge>
                <Link href="/student/lessons">
                  <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Darslarga o&apos;tish
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </StudentLayout>
  );
}
