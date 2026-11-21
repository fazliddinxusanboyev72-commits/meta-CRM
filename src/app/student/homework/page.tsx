'use client';

import React, { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/FormControls';
import { Homework, HomeworkSubmission } from '@/types';
import { FileText, Send, CheckCircle2, Clock, Upload, ArrowRight } from 'lucide-react';

export default function StudentHomeworkPage() {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([
    {
      id: 'hw-1',
      courseId: 'full-stack-javascript',
      lessonId: 'les-1',
      lessonTitle: 'Zamonaviy Veb Standartlari & Dasturlash Muhiti',
      groupId: 'group-fs-01',
      title: 'TypeScript interfeyslari bilan Mini CLI vosita yaratish',
      description: 'TypeScript da buyruqlar satri orqali o\'quvchilar ro\'yxatini konsolga chiroyli chiqaruvchi va turlarni to\'g\'ri qo\'llagan dastur yozing.',
      dueDate: '2026-03-25T23:59:00.000Z',
      maxScore: 100,
      submissionsCount: 3,
    },
    {
      id: 'hw-2',
      courseId: 'full-stack-javascript',
      lessonId: 'les-3',
      lessonTitle: 'Server Components vs Client Components',
      groupId: 'group-fs-01',
      title: 'Next.js 14 App Router da Dinamik E-commerce Mahsulotlar sahifasi',
      description: 'Server componentda API dan ma\'lumotlarni fetch qilish, streaming va client componentda savatchaga qo\'shish tugmachasini amalga oshirish.',
      dueDate: '2026-03-28T23:59:00.000Z',
      maxScore: 100,
      submissionsCount: 2,
    },
  ]);

  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([
    {
      id: 'sub-1',
      homeworkId: 'hw-1',
      studentId: 'student-1',
      studentName: 'Bobur Mirzayev',
      content: 'Topshiriqni to\'liq bajardim. GitHub repozitoriy havolasi ilova qilindi.',
      fileUrl: 'https://github.com/example/student-cli-tool',
      submittedAt: '2026-03-21T18:30:00.000Z',
      status: 'graded',
      score: 98,
      feedback: 'A\'lo darajada! Kod toza va barcha interfeyslar aniq tavsiflangan. Genericlardan foydalanish juda to\'g\'ri yo\'lga qo\'yilgan.',
      gradedAt: '2026-03-22T10:15:00.000Z',
    },
  ]);

  const [selectedHw, setSelectedHw] = useState<Homework | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionContent, setSubmissionContent] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHw) return;

    const newSub: HomeworkSubmission = {
      id: `sub-${Date.now()}`,
      homeworkId: selectedHw.id,
      studentId: 'student-1',
      studentName: 'Bobur Mirzayev',
      content: submissionContent,
      fileUrl: githubUrl,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      maxScore: selectedHw.maxScore,
    };

    setSubmissions((prev) => [newSub, ...prev]);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitModalOpen(false);
      setSubmissionContent('');
      setGithubUrl('');
    }, 1500);
  };

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Uy Vazifalari va Amaliy Topshiriqlar
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Ustozlar bergan topshiriqlarni yuklash va baholash natijalarini ko&apos;rish
        </p>
      </div>

      <div className="space-y-6">
        {homeworkList.map((hw) => {
          const submission = submissions.find((s) => s.homeworkId === hw.id);

          return (
            <Card key={hw.id} glow className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-white">{hw.title}</h3>
                  <div className="text-xs text-primary-cyan mt-0.5">Dars: {hw.lessonTitle}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" size="sm">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Muddati: {hw.dueDate.split('T')[0]}
                  </Badge>
                  <span className="text-xs font-bold text-text-muted">Maks. {hw.maxScore} ball</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {hw.description}
              </p>

              {/* Submission State Details */}
              {submission ? (
                <div className="p-4 rounded-xl bg-background-panel border border-border/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">Siz topshirgan sana: {submission.submittedAt.split('T')[0]}</span>
                    <Badge variant={submission.status === 'graded' ? 'success' : 'warning'}>
                      {submission.status === 'graded' ? `Baholandi: ${submission.score} / ${submission.maxScore}` : 'Tekshirilmoqda'}
                    </Badge>
                  </div>

                  {submission.feedback && (
                    <div className="p-3 rounded-lg bg-background-elevated border border-border text-xs text-text-main mt-2">
                      <strong className="text-status-success block mb-0.5">Ustoz Fikri:</strong>
                      {submission.feedback}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-end pt-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      setSelectedHw(hw);
                      setIsSubmitModalOpen(true);
                    }}
                    rightIcon={<Upload className="w-4 h-4" />}
                  >
                    Vazifani topshirish
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedHw && (
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          title={`Vazifani Topshirish: ${selectedHw.title}`}
          maxWidth="md"
        >
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-status-success mx-auto" />
              <h4 className="text-base font-bold text-white">Vazifangiz qabul qilindi!</h4>
              <p className="text-xs text-text-secondary">Ustoz yaqin orada kodingizni tekshirib ball qo&apos;yadi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitHomework} className="space-y-4">
              <Input
                label="GitHub Repozitoriy yoki Loyiha Havolasi *"
                required
                placeholder="https://github.com/username/project-repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />

              <Textarea
                label="Topshiriq bo'yicha izohingiz *"
                required
                placeholder="Vazifani bajarishda nimalar amalga oshirildi, qanday texnologiyalardan foydalandingiz..."
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
              />

              <div className="pt-3 border-t border-border flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsSubmitModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" rightIcon={<Send className="w-4 h-4" />}>
                  Yuborish
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </StudentLayout>
  );
}
