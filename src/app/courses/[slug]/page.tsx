import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourseBySlug, getTeacherById, getCourses } from '@/lib/db';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  BarChart,
  User,
  Star,
  PlayCircle,
  Download,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export default async function CourseDetailPage({ params }: Props) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const teacher = course.teacherId ? await getTeacherById(course.teacherId) : null;
  const allCourses = await getCourses();
  const relatedCourses = allCourses.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 w-full pt-28 pb-20">
        {/* Course Hero Banner */}
        <div className="border-b border-border bg-background-secondary/60 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/15 blur-[120px] pointer-events-none rounded-full" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="primary">{course.category.toUpperCase()}</Badge>
                <span className="text-xs text-text-secondary">•</span>
                <span className="text-xs text-text-secondary">Daraja: <strong className="text-text-main">{course.level}</strong></span>
                <span className="text-xs text-text-secondary">•</span>
                <span className="flex items-center gap-1 text-xs text-status-warning">
                  <Star className="w-3.5 h-3.5 fill-status-warning" />
                  {course.rating} ({course.reviewsCount} ta baho)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
                {course.subtitle}
              </p>

              {teacher && (
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={teacher.avatar}
                    alt={teacher.fullName}
                    className="w-11 h-11 rounded-full object-cover border border-primary-purple/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{teacher.fullName}</div>
                    <div className="text-xs text-primary-cyan">{teacher.specialization}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sticky Pricing Card on Mobile/Desktop */}
            <div className="lg:col-span-4">
              <Card glow className="p-6 sm:p-8 space-y-6 bg-background-elevated/90 backdrop-blur-xl">
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Kurs to&apos;lovi</div>
                  <div className="text-3xl font-extrabold text-primary-cyan mt-1">
                    {formatCurrency(course.price)}
                    <span className="text-xs text-text-secondary font-normal ml-1.5">/ oy</span>
                  </div>
                  {course.originalPrice && (
                    <div className="text-xs text-text-muted line-through mt-0.5">
                      {formatCurrency(course.originalPrice)}
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-border/60 text-xs text-text-secondary">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-blue" />
                      Davomiyligi:
                    </span>
                    <strong className="text-text-main">{course.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-status-success" />
                      Darslar soni:
                    </span>
                    <strong className="text-text-main">{course.lessonsCount} ta amaliy dars</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary-cyan" />
                      Sertifikat:
                    </span>
                    <strong className="text-status-success">Verifikatsiyali QR Sertifikat</strong>
                  </div>
                </div>

                <Link href="/apply" className="block w-full">
                  <Button size="lg" className="w-full shadow-glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Kursga yozilish
                  </Button>
                </Link>

                <p className="text-[11px] text-text-muted text-center">
                  Joylar soni chegaralangan (har bir guruhda 16-20 nafar o&apos;quvchi).
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Body Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Kurs haqida umumiy ma&apos;lumot</h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {course.overview || course.description}
              </p>
            </section>

            {/* Learning Outcomes */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Kurs davomida nimalarni o&apos;rganasiz?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomes?.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-background-elevated/60 border border-border flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-status-success flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-text-main leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum Modules & Lessons */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">To&apos;liq O&apos;quv Dasturi (Sillabus)</h2>
                  <p className="text-xs text-text-secondary mt-1">
                    {course.modules?.length || course.modulesCount} ta modul • {course.lessonsCount} ta amaliy dars
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module, mIdx) => (
                    <div
                      key={module.id}
                      className="rounded-2xl border border-border bg-background-elevated/70 overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 bg-background-panel border-b border-border/70 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white">{module.title}</h3>
                          {module.description && (
                            <p className="text-xs text-text-secondary mt-0.5">{module.description}</p>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-primary-cyan px-2.5 py-1 rounded-full bg-primary-purple/10 border border-primary-purple/20">
                          {module.lessons.length} ta dars
                        </span>
                      </div>

                      <div className="divide-y divide-border/40">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 flex items-center justify-between text-xs sm:text-sm hover:bg-background-elevated transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-primary-cyan flex-shrink-0" />
                              <span className="text-text-main font-medium">{lesson.title}</span>
                              {lesson.isFreePreview && (
                                <Badge variant="success" size="sm">
                                  Bepul dars
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-text-muted">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl border border-border bg-background-elevated text-xs text-text-secondary">
                    Ushbu kurs uchun batafsil darslar ro&apos;yxati va sillabus har bir modul bo&apos;yicha dars boshlanishida talabalar shaxsiy kabinetida ochiladi.
                  </div>
                )}
              </div>
            </section>

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Kurs talablari</h2>
                <ul className="space-y-2.5">
                  {course.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-cyan mt-2 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Teacher Bio & Related Courses */}
          <div className="lg:col-span-4 space-y-8">
            {teacher && (
              <Card className="p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Kurs Ustozi</h3>
                <div className="flex items-center gap-3.5">
                  <img
                    src={teacher.avatar}
                    alt={teacher.fullName}
                    className="w-16 h-16 rounded-full object-cover border border-primary-purple"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{teacher.fullName}</h4>
                    <p className="text-xs text-primary-cyan">{teacher.specialization}</p>
                    <p className="text-[11px] text-text-secondary">Tajriba: {teacher.experience}</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{teacher.bio}</p>
              </Card>
            )}

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">O&apos;xshash Kurslar</h3>
                <div className="space-y-4">
                  {relatedCourses.map((rel) => (
                    <Link key={rel.id} href={`/courses/${rel.slug}`} className="block group">
                      <div className="p-4 rounded-xl border border-border bg-background-elevated hover:border-primary/50 transition-colors flex items-center gap-3">
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate group-hover:text-primary-cyan">
                            {rel.title}
                          </h4>
                          <div className="text-[11px] text-text-secondary">{rel.duration}</div>
                          <div className="text-xs font-bold text-primary-cyan mt-0.5">
                            {formatCurrency(rel.price)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
