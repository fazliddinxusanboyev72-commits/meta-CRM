'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Course } from '@/types';
import { BookOpen, Users, Clock, Video } from 'lucide-react';

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data.filter((c) => c.teacherId === 'teacher-1' || c.category === 'programming'));
        }
      });
  }, []);

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Biriktirilgan Kurslarim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Siz rahbarlik qilayotgan o&apos;quv dasturlari va sillabuslar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} glow className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="primary">{course.category.toUpperCase()}</Badge>
              <span className="text-xs text-text-secondary">{course.duration}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{course.title}</h3>
              <p className="text-xs text-text-secondary mt-1">{course.subtitle}</p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-text-muted">Darslar soni: <strong className="text-white">{course.lessonsCount} ta</strong></span>
              <span className="text-primary-cyan font-bold">{course.studentsCount} ta o&apos;quvchi</span>
            </div>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
