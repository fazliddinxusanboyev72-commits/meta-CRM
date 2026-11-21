'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/FormControls';
import { Certificate, Student, Course } from '@/types';
import { Award, Plus, CheckCircle2, ExternalLink, QrCode, Search } from 'lucide-react';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [issueForm, setIssueForm] = useState({
    studentId: '',
    courseId: '',
  });

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/certificates').then((r) => r.json()),
      fetch('/api/admin/students').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
    ])
      .then(([certs, sData, cData]) => {
        if (Array.isArray(certs)) setCertificates(certs);
        if (Array.isArray(sData)) {
          setStudents(sData);
          if (sData.length > 0) setIssueForm((prev) => ({ ...prev, studentId: sData[0].id }));
        }
        if (Array.isArray(cData)) {
          setCourses(cData);
          if (cData.length > 0) setIssueForm((prev) => ({ ...prev, courseId: cData[0].id }));
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === issueForm.studentId);
    const course = courses.find((c) => c.id === issueForm.courseId);

    if (!student || !course) return;

    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          studentName: student.fullName,
          courseId: course.id,
          courseTitle: course.title,
          teacherName: course.teacherName || 'Javohir Rahmatov',
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setCertificates((prev) => [created, ...prev]);
        setIsModalOpen(false);
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const filtered = certificates.filter(
    (c) =>
      c.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sertifikatlar Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Bitiruvchilar uchun rasmiy QR-kodli sertifikatlarni generatsiya qilish va haqiqiyligini tekshirish
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Yangi Sertifikat Berish
        </Button>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Sertifikat kodi (META-2026-...), talaba ismi yoki kurs bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background-panel border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Sertifikat ID</th>
                <th className="py-3.5 px-4">Talaba</th>
                <th className="py-3.5 px-4">Kurs Nomi</th>
                <th className="py-3.5 px-4">Mas&apos;ul Ustoz</th>
                <th className="py-3.5 px-4">Berilgan Sana</th>
                <th className="py-3.5 px-4">Holat</th>
                <th className="py-3.5 px-4 text-right">Verifikatsiya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-text-secondary">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-text-secondary">
                    Sertifikatlar topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-background-elevated/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-cyan">
                      {cert.certificateId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{cert.studentName}</td>
                    <td className="py-3.5 px-4 text-text-secondary">{cert.courseTitle}</td>
                    <td className="py-3.5 px-4 text-text-muted">{cert.teacherName}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-text-muted">{cert.issueDate}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Faol
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={cert.verificationUrl}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs text-primary-cyan hover:underline font-semibold"
                      >
                        Tekshirish <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Issue Certificate Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi Sertifikat Generatsiya Qilish"
        maxWidth="md"
      >
        <form onSubmit={handleIssueCertificate} className="space-y-4">
          <Select
            label="Talaba *"
            options={students.map((s) => ({ label: `${s.fullName} (${s.studentId})`, value: s.id }))}
            value={issueForm.studentId}
            onChange={(e) => setIssueForm({ ...issueForm, studentId: e.target.value })}
          />

          <Select
            label="Tamomlagan Kursi *"
            options={courses.map((c) => ({ label: c.title, value: c.id }))}
            value={issueForm.courseId}
            onChange={(e) => setIssueForm({ ...issueForm, courseId: e.target.value })}
          />

          <p className="text-xs text-text-muted">
            Tizim avtomatik ravishda unikal raqamli identifikator (masalan: <code>META-2026-XXXX</code>) va QR-kod yaratadi.
          </p>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              Generatsiya Qilish
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
