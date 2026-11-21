'use client';

import React, { useState } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/FormControls';
import { FileText, CheckCircle2, ExternalLink, Award } from 'lucide-react';

export default function TeacherHomeworkPage() {
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-1',
      studentName: 'Bobur Mirzayev',
      title: 'TypeScript CLI Mini Tool',
      fileUrl: 'https://github.com/example/student-cli-tool',
      submittedAt: '2026-03-21',
      status: 'graded',
      score: 98,
      feedback: 'A\'lo darajada! Kod toza va barcha interfeyslar aniq tavsiflangan.',
    },
    {
      id: 'sub-2',
      studentName: 'Zilola Karimova',
      title: 'TypeScript CLI Mini Tool',
      fileUrl: 'https://github.com/example/ts-student-project',
      submittedAt: '2026-03-21',
      status: 'submitted',
      score: 0,
      feedback: '',
    },
    {
      id: 'sub-3',
      studentName: 'Sardorbek Ergashev',
      title: 'Next.js 14 App Router da Dinamik E-commerce Sahifasi',
      fileUrl: 'https://github.com/example/nextjs-ecommerce',
      submittedAt: '2026-03-22',
      status: 'submitted',
      score: 0,
      feedback: '',
    },
  ]);

  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [scoreInput, setScoreInput] = useState(90);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenGrade = (sub: any) => {
    setSelectedSub(sub);
    setScoreInput(sub.score || 90);
    setFeedbackInput(sub.feedback || '');
    setIsModalOpen(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSub.id
          ? { ...s, score: scoreInput, feedback: feedbackInput, status: 'graded' }
          : s
      )
    );
    setIsModalOpen(false);
  };

  return (
    <TeacherLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Uy Vazifalarini Tekshirish va Baholash
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Talabalarning topshirgan amaliy kodlari, GitHub repozitoriylari va xatoliklar ustida ishlash
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <Card key={sub.id} glow className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-white">{sub.studentName}</h3>
                <p className="text-xs text-primary-cyan mt-0.5">{sub.title}</p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={sub.status === 'graded' ? 'success' : 'warning'}>
                  {sub.status === 'graded' ? `Baholandi: ${sub.score} ball` : 'Tekshirilishi kerak'}
                </Badge>
                <span className="text-xs text-text-muted font-mono">{sub.submittedAt}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <a
                href={sub.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-cyan hover:underline inline-flex items-center gap-1 font-semibold"
              >
                GitHub Repozitoriyni ko&apos;rish <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Button size="sm" variant="primary" onClick={() => handleOpenGrade(sub)}>
                {sub.status === 'graded' ? 'Qayta baholash' : 'Baholash va Fikr bildirish'}
              </Button>
            </div>

            {sub.feedback && (
              <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs">
                <strong className="text-status-success block mb-0.5">Siz qoldirgan sharh:</strong>
                <p className="text-text-secondary leading-relaxed">{sub.feedback}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Grade Modal */}
      {selectedSub && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Vazifani Baholash: ${selectedSub.studentName}`}
          maxWidth="md"
        >
          <form onSubmit={handleSaveGrade} className="space-y-4">
            <Input
              label="Baho (0 - 100 ball) *"
              type="number"
              min="0"
              max="100"
              required
              value={scoreInput}
              onChange={(e) => setScoreInput(Number(e.target.value))}
            />

            <Textarea
              label="Talabaga Texnik Fikr va Maslahat (Code Review) *"
              required
              placeholder="Kod qanchalik toza yozilgan, qanday xatoliklar mavjud va nimalarni yaxshilash kerak..."
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
            />

            <div className="pt-3 border-t border-border flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button type="submit" variant="primary">
                Bahoni Saqlash
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </TeacherLayout>
  );
}
