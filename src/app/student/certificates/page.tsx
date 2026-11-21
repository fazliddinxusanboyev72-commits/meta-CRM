'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Certificate } from '@/types';
import { Award, ExternalLink, Printer, CheckCircle2 } from 'lucide-react';

export default function StudentCertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    fetch('/api/admin/certificates')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCerts(data.slice(0, 1));
      });
  }, []);

  return (
    <StudentLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mening Sertifikatlarim
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          MetaITSchool tomonidan berilgan rasmiy tasdiqlangan QR-kodli sertifikatlar
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="rounded-3xl border-2 border-primary/50 bg-gradient-to-br from-background-elevated via-background-panel to-background-secondary p-8 sm:p-12 relative overflow-hidden shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-purple/20 text-primary-cyan flex items-center justify-center">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">METAITSCHOOL ACADEMY</h3>
                  <div className="text-xs font-mono text-primary-cyan font-bold">{cert.certificateId}</div>
                </div>
              </div>

              <Badge variant="success" size="md">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                RASMIY TASDIQLANGAN
              </Badge>
            </div>

            <div className="space-y-2 text-center py-4">
              <span className="text-xs uppercase tracking-widest text-text-secondary">Ushbu sertifikat topshiriladi:</span>
              <h2 className="text-3xl font-extrabold text-white">{cert.studentName}</h2>
              <div className="text-sm text-primary-cyan font-bold pt-1">{cert.courseTitle}</div>
            </div>

            <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={cert.qrCodeUrl}
                  alt={cert.certificateId}
                  className="w-20 h-20 p-1 bg-white rounded-xl shadow-md"
                />
                <div>
                  <div className="text-text-muted">Berilgan sana: {cert.issueDate}</div>
                  <div className="text-text-muted">Mas&apos;ul: {cert.teacherName}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Link href={cert.verificationUrl} target="_blank">
                  <Button size="sm" variant="outline" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Tekshirish sahifasi
                  </Button>
                </Link>
                <Button size="sm" variant="primary" onClick={() => window.print()} leftIcon={<Printer className="w-3.5 h-3.5" />}>
                  Chop etish (PDF)
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
}
