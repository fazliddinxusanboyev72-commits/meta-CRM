import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTeacherById, getCourses } from '@/lib/db';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { Star, Users, ArrowRight, Github, Linkedin, Send, BookOpen, CheckCircle2 } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export default async function TeacherDetailPage({ params }: Props) {
  const teacher = await getTeacherById(params.slug);

  if (!teacher) {
    notFound();
  }

  const allCourses = await getCourses();
  const assignedCourses = allCourses.filter((c) => teacher.courseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Profile Card */}
          <div className="lg:col-span-4">
            <Card glow className="p-8 text-center space-y-5">
              <div className="relative w-32 h-32 mx-auto rounded-3xl overflow-hidden border-2 border-primary-purple/50 shadow-glow">
                <img
                  src={teacher.avatar}
                  alt={teacher.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">{teacher.fullName}</h1>
                <p className="text-xs text-primary-cyan font-medium mt-1">{teacher.specialization}</p>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-text-secondary">
                  <span className="flex items-center gap-1 text-status-warning font-semibold">
                    <Star className="w-4 h-4 fill-status-warning" />
                    {teacher.rating}
                  </span>
                  <span>•</span>
                  <span>{teacher.experience} tajriba</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-center gap-3">
                {teacher.social.github && (
                  <a
                    href={teacher.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-background-panel border border-border hover:text-white hover:border-primary-cyan transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {teacher.social.linkedin && (
                  <a
                    href={teacher.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-background-panel border border-border hover:text-white hover:border-primary-cyan transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {teacher.social.telegram && (
                  <a
                    href={teacher.social.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-background-panel border border-border hover:text-white hover:border-primary-cyan transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                )}
              </div>

              <Link href="/apply" className="block pt-2">
                <Button size="md" className="w-full">
                  Ushbu ustoz guruhiga yozilish
                </Button>
              </Link>
            </Card>
          </div>

          {/* Right Column Bio & Courses */}
          <div className="lg:col-span-8 space-y-10">
            <section className="space-y-4">
              <Badge variant="primary">Biografiya va Tajriba</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Mentor haqida</h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {teacher.bio}
              </p>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold text-white">Ustoz boshchiligidagi kurslar</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {assignedCourses.map((c) => (
                  <Card key={c.id} glow className="p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs text-primary-cyan font-semibold">{c.duration}</div>
                      <h4 className="text-base font-bold text-white hover:text-primary-cyan transition-colors">
                        <Link href={`/courses/${c.slug}`}>{c.title}</Link>
                      </h4>
                      <p className="text-xs text-text-secondary line-clamp-2">{c.subtitle}</p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-sm font-bold text-primary-cyan">{formatCurrency(c.price)} / oy</span>
                      <Link href={`/courses/${c.slug}`}>
                        <Button size="sm" variant="outline">
                          Ko&apos;rish
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
