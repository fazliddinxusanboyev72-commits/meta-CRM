'use client';

import React, { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Exam } from '@/types';
import { Clock, FileQuestion, CheckCircle2, AlertCircle, ArrowRight, Trophy } from 'lucide-react';

export default function StudentExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; maxScore: number; passed: boolean } | null>(null);
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    fetch('/api/admin/exams')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setExams(data);
      });
  }, []);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setAnswers({});
    setIsFinished(false);
    setScoreResult(null);
    setTimeLeft(exam.durationMinutes * 60);
  };

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitExam = () => {
    if (!activeExam) return;

    let totalScore = 0;
    let maxScore = 0;

    activeExam.questions.forEach((q) => {
      maxScore += q.points;
      if (answers[q.id] === q.correctAnswer) {
        totalScore += q.points;
      }
    });

    const passed = totalScore >= (maxScore * activeExam.passingScore) / 100;

    setScoreResult({ score: totalScore, maxScore, passed });
    setIsFinished(true);
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Oraliq va Yakuniy Imtihonlar
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            Bilimingizni sinovdan o&apos;tkazing va rasmiy baholash natijalariga ega bo&apos;ling
          </p>
        </div>

        {/* If taking an exam */}
        {activeExam ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Exam Header */}
            <div className="p-5 rounded-2xl bg-background-elevated border border-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{activeExam.title}</h3>
                <p className="text-xs text-text-secondary">{activeExam.courseTitle}</p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background-panel border border-border text-primary-cyan font-mono text-sm font-bold">
                <Clock className="w-4 h-4" />
                <span>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Results Display */}
            {isFinished && scoreResult ? (
              <Card glow className="p-8 text-center space-y-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    scoreResult.passed
                      ? 'bg-status-success/20 text-status-success'
                      : 'bg-status-error/20 text-status-error'
                  }`}
                >
                  {scoreResult.passed ? <Trophy className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {scoreResult.passed ? 'Tabriklaymiz, Imtihondan O\'tdingiz!' : 'Afsuski, O\'tish Balli Yetarli Emas'}
                </h3>

                <div className="text-3xl font-extrabold font-mono text-primary-cyan">
                  {scoreResult.score} / {scoreResult.maxScore} ball
                </div>

                <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
                  {scoreResult.passed
                    ? 'Siz o\'quv modulini a\'lo darajada o\'zlashtirdingiz. Natija shaxsiy reytingingizga qo\'shildi.'
                    : 'Mavzularni yana bir bor takrorlab, keyingi urinishda qayta topshirishingiz mumkin.'}
                </p>

                <div className="pt-2">
                  <Button variant="secondary" onClick={() => setActiveExam(null)}>
                    Imtihonlar ro&apos;yxatiga qaytish
                  </Button>
                </div>
              </Card>
            ) : (
              /* Questions List */
              <div className="space-y-6">
                {activeExam.questions.map((q, idx) => (
                  <Card key={q.id} className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {idx + 1}. {q.text}
                      </h4>
                      <Badge variant="secondary" size="sm">{q.points} ball</Badge>
                    </div>

                    <div className="space-y-2 pt-2">
                      {q.options?.map((opt, oIdx) => {
                        const isSelected = answers[q.id] === opt;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, opt)}
                            className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-3 ${
                              isSelected
                                ? 'bg-primary-purple text-white shadow-glow'
                                : 'bg-background-panel border border-border text-text-secondary hover:text-white hover:bg-background-elevated'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-[11px] font-bold">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                ))}

                <div className="flex justify-end pt-4">
                  <Button size="lg" variant="primary" className="shadow-glow" onClick={handleSubmitExam}>
                    Imtihonni Yakunlash va Baholash
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Available Exams List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <Card key={exam.id} glow className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary">{exam.courseTitle}</Badge>
                    <span className="text-xs text-text-secondary flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.durationMinutes} daqiqa
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{exam.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {exam.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-border/60">
                    <span className="text-text-muted">Savollar: {exam.questions?.length || 5} ta</span>
                    <span className="text-status-success font-semibold">O&apos;tish: {exam.passingScore}%</span>
                  </div>
                </div>

                <Button
                  size="md"
                  variant="primary"
                  className="w-full"
                  onClick={() => handleStartExam(exam)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Imtihonni Boshlash
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
