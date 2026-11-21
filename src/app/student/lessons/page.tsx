'use client';

import React, { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Lesson, Course } from '@/types';
import {
  PlayCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  FileText,
  Video,
} from 'lucide-react';

export default function StudentLessonsViewerPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['les-1']);
  const [studentNote, setStudentNote] = useState('');
  const [isSavedNote, setIsSavedNote] = useState(false);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const c = data[0];
          setCourse(c);
          if (c.modules && c.modules.length > 0 && c.modules[0].lessons.length > 0) {
            setActiveLesson(c.modules[0].lessons[0]);
          }
        }
      });
  }, []);

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleSaveNote = () => {
    setIsSavedNote(true);
    setTimeout(() => setIsSavedNote(false), 2000);
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary">LMS Interaktiv Darslik</Badge>
              <span className="text-xs text-text-secondary">• {course?.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {activeLesson?.title || 'Dars yuklanmoqda...'}
            </h1>
          </div>

          {activeLesson && (
            <Button
              size="sm"
              variant={completedLessonIds.includes(activeLesson.id) ? 'success' : 'outline'}
              onClick={() => handleToggleComplete(activeLesson.id)}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              {completedLessonIds.includes(activeLesson.id) ? "O'zlashtirildi" : "Tugatildi deb belgilash"}
            </Button>
          )}
        </div>

        {/* Lesson Main Grid: Video Player + Curriculum Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video & Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Video Player Frame */}
            <div className="rounded-2xl overflow-hidden border border-border bg-black aspect-video relative shadow-2xl">
              {activeLesson?.videoUrl ? (
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-secondary space-y-3">
                  <Video className="w-12 h-12 text-primary-cyan animate-pulse" />
                  <p className="text-xs">Dars videoyozuvi yuklanmoqda...</p>
                </div>
              )}
            </div>

            {/* Navigation Buttons: Previous / Next */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-background-elevated border border-border">
              <Button size="sm" variant="ghost" leftIcon={<ChevronLeft className="w-4 h-4" />}>
                Oldingi Dars
              </Button>
              <span className="text-xs text-text-muted">Davomiyligi: {activeLesson?.duration || '45 daqiqa'}</span>
              <Button size="sm" variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Keyingi Dars
              </Button>
            </div>

            {/* Lesson Reading Material (Markdown style) */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <BookOpen className="w-5 h-5 text-primary-cyan" />
                <h3 className="text-base font-bold text-white">Dars Konspekti va Nazariy Ma&apos;lumotlar</h3>
              </div>

              <div className="prose prose-invert max-w-none text-text-secondary text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Ushbu darsda zamonaviy veb standartlari, componentlar arxitekturasi va server tomonida ishlash
                  mexanizmlari batafsil yoritilgan. Quyidagi kod namunasini o&apos;z amaliyotingizda sinab ko&apos;ring:
                </p>

                <div className="p-4 rounded-xl bg-background-panel border border-border font-mono text-xs text-primary-cyan overflow-x-auto">
                  {`// Next.js 14 Server Action namunasi
export async function createStudentAction(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.student.create({ data: { name } });
  revalidatePath('/student/dashboard');
}`}
                </div>
              </div>

              {/* Downloadable Resources */}
              {activeLesson?.resources && activeLesson.resources.length > 0 && (
                <div className="pt-4 border-t border-border space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Yuklab Olinadigan Materiallar:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLesson.resources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-panel border border-border text-xs text-text-main hover:border-primary-cyan transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-primary-cyan" />
                        <span>{res.name} ({res.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Interactive Personal Notes Area */}
            <Card className="p-6 space-y-3">
              <h3 className="text-sm font-bold text-white">Dars Bo&apos;yicha Shaxsiy Qaydlaringiz</h3>
              <textarea
                placeholder="Darsdagi muhim fikrlar, eslatmalar yoki qoidalarni shu yerga yozib boring..."
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                className="w-full bg-background-panel border border-border rounded-xl p-3 text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple min-h-[90px]"
              />
              <div className="flex justify-between items-center pt-1">
                {isSavedNote && <span className="text-xs text-status-success font-semibold">Qayd saqlandi!</span>}
                <Button size="sm" variant="secondary" onClick={handleSaveNote} className="ml-auto">
                  Qaydni saqlash
                </Button>
              </div>
            </Card>
          </div>

          {/* Curriculum Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">Kurs Dasturi (Sillabus)</h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  {course?.modules?.length || 2} ta modul • {completedLessonIds.length} ta dars o&apos;zlashtirildi
                </p>
              </div>

              <div className="space-y-4">
                {course?.modules?.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="text-xs font-bold text-primary-cyan uppercase tracking-wider">
                      {module.title}
                    </div>

                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between gap-3 ${
                              isActive
                                ? 'bg-primary-purple text-white shadow-glow'
                                : 'bg-background-panel border border-border/70 text-text-secondary hover:text-white hover:bg-background-elevated'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-primary-cyan flex-shrink-0" />
                              )}
                              <span className="truncate font-medium">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] text-text-muted flex-shrink-0">{lesson.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
