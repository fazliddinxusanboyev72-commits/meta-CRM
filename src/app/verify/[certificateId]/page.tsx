import React from 'react';
import Link from 'next/link';
import { getCertificateById } from '@/lib/db';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, Calendar, User, BookOpen, AlertCircle, Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Props {
  params: {
    certificateId: string;
  };
}

export const revalidate = 0;

export default async function CertificateVerificationPage({ params }: Props) {
  const cert = await getCertificateById(params.certificateId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
        </Link>

        {cert && cert.status === 'active' ? (
          <div className="space-y-8">
            {/* Status Alert */}
            <div className="p-4 sm:p-5 rounded-2xl bg-status-success/15 border border-status-success/40 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-status-success/20 text-status-success flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-status-success">
                  Rasmiy Sertifikat Muvaffaqiyatli Tasdiqlandi!
                </h3>
                <p className="text-xs text-text-secondary">
                  Ushbu sertifikat MetaITSchool Akademiyasi tomonidan ro&apos;yxatga olingan va to&apos;liq haqiqiydir.
                </p>
              </div>
            </div>

            {/* Holographic Certificate Display Card */}
            <div className="rounded-3xl border-2 border-primary/50 bg-gradient-to-br from-background-elevated via-background-panel to-background-secondary p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              {/* Decorative Corner Borders */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary-cyan/60 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary-cyan/60 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary-cyan/60 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary-cyan/60 rounded-br-xl pointer-events-none" />

              <div className="relative z-10 text-center space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-purple/30 text-primary-cyan flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-extrabold tracking-widest uppercase text-white font-mono">
                    META<span className="text-primary-cyan">IT</span>SCHOOL
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-widest text-primary-cyan font-semibold">
                    Tamomlaganlik To&apos;g&apos;risida Rasmiy Sertifikat
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pt-2">
                    {cert.studentName}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
                  Ushbu sertifikat egasi MetaITSchool Akademiyasining to&apos;liq professional amaliy o&apos;quv dasturini,
                  barcha oraliq hamda yakuniy imtihonlarni, shuningdek shaxsiy portfolio loyihasini muvaffaqiyatli
                  himoya qilganligini tasdiqlaydi:
                </p>

                <div className="p-4 rounded-2xl bg-background-panel border border-border inline-block max-w-lg mx-auto">
                  <div className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-primary-purple">
                    {cert.courseTitle}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="pt-8 border-t border-border/70 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs">
                  <div className="space-y-1">
                    <span className="text-text-muted block">Berilgan sana:</span>
                    <strong className="text-white font-mono">{cert.issueDate}</strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text-muted block">Sertifikat ID:</span>
                    <strong className="text-primary-cyan font-mono font-bold text-sm">
                      {cert.certificateId}
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text-muted block">Kurs rahbari:</span>
                    <strong className="text-white">{cert.teacherName}</strong>
                  </div>
                </div>

                {/* QR Code */}
                <div className="pt-4 flex flex-col items-center justify-center">
                  <img
                    src={cert.qrCodeUrl}
                    alt={cert.certificateId}
                    className="w-24 h-24 p-1.5 bg-white rounded-xl shadow-md"
                  />
                  <span className="text-[10px] text-text-muted mt-2">Raqamli QR verifikatsiya</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-background-elevated border border-status-error/40 text-center space-y-4">
            <AlertCircle className="w-14 h-14 text-status-error mx-auto" />
            <h2 className="text-2xl font-bold text-white">Sertifikat Topilmadi</h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
              Kiritilgan identifikator ({params.certificateId}) bo&apos;yicha rasmiy sertifikat topilmadi yoki u bekor qilingan.
              Iltimos, sertifikat kodini to&apos;g&apos;ri kiritganingizni tekshirib ko&apos;ring.
            </p>
            <div className="pt-2">
              <Link href="/">
                <Button variant="secondary" size="sm">
                  Bosh sahifaga qaytish
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
