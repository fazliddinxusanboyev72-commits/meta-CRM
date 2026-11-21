import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getTeachers, getCourses } from '@/lib/db';
import { Star, Users, ArrowRight, Github, Linkedin, Send } from 'lucide-react';

export const revalidate = 0;

export default async function TeachersPage() {
  const [teachers, courses] = await Promise.all([getTeachers(), getCourses()]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="primary">Professional Jamoa</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bizning Professional Ustozlarimiz
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Xalqaro va mahalliy yetakchi IT kompaniyalarida 5 yildan 10 yilgacha muvaffaqiyatli faoliyat yuritgan
            Senior dasturchilar va dizaynerlar sizga ustozlik qiladi.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => {
            const assignedCourses = courses.filter((c) => teacher.courseIds.includes(c.id));

            return (
              <Card key={teacher.id} glow className="p-6 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={teacher.avatar}
                      alt={teacher.fullName}
                      className="w-20 h-20 rounded-2xl object-cover border border-primary-purple/40 shadow-glow flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white hover:text-primary-cyan transition-colors">
                        <Link href={`/teachers/${teacher.id}`}>{teacher.fullName}</Link>
                      </h3>
                      <div className="text-xs text-primary-cyan font-medium mt-0.5">{teacher.specialization}</div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-text-secondary">
                        <span className="flex items-center gap-1 text-status-warning font-semibold">
                          <Star className="w-3.5 h-3.5 fill-status-warning" />
                          {teacher.rating}
                        </span>
                        <span>•</span>
                        <span>{teacher.studentsCount}+ o&apos;quvchi</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>

                  {/* Assigned Courses */}
                  {assignedCourses.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">O&apos;qitadigan kurslari:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {assignedCourses.map((c) => (
                          <Link key={c.id} href={`/courses/${c.slug}`}>
                            <span className="text-[11px] px-2.5 py-1 rounded-lg bg-background-panel border border-border text-text-main hover:border-primary-cyan transition-colors inline-block">
                              {c.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-secondary">
                    {teacher.social.github && (
                      <a href={teacher.social.github} target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {teacher.social.linkedin && (
                      <a href={teacher.social.linkedin} target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {teacher.social.telegram && (
                      <a href={teacher.social.telegram} target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition-colors">
                        <Send className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <Link href={`/teachers/${teacher.id}`}>
                    <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Batafsil
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
