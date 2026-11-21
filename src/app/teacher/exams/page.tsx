'use client';

import React, { useState, useEffect } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Exam } from '@/types';
import { FileQuestion, Clock, Plus, Award } from 'lucide-react';

export default function TeacherExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    fetch('/api/admin/exams')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setExams(data);
      });
  }, []);

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Imtihonlar va Sinov Testlari
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Guruhingiz talabalari uchun oraliq va yakuniy test sinovlari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} glow className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="primary">{exam.courseTitle}</Badge>
              <span className="text-xs text-text-secondary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {exam.durationMinutes} daqiqa
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{exam.title}</h3>
              <p className="text-xs text-text-secondary mt-1 line-clamp-2">{exam.description}</p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-text-muted">Savollar: <strong className="text-white">{exam.questions?.length || 5} ta</strong></span>
              <span className="text-status-success font-semibold">O&apos;tish balli: {exam.passingScore}%</span>
            </div>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
