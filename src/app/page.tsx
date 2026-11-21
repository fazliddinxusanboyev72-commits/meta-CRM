import React from 'react';
import Link from 'next/link';
import {
  getCourses,
  getTeachers,
  getProjects,
  getBlogPosts,
  getTestimonials,
  getCMSSettings,
} from '@/lib/db';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import {
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Zap,
  Users,
  Trophy,
  Star,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Laptop,
  Layers,
  Shield,
  Briefcase,
  Terminal,
} from 'lucide-react';

export const revalidate = 0; // Always serve fresh dynamic content

export default async function HomePage() {
  const [courses, teachers, projects, blogPosts, testimonials, cms] = await Promise.all([
    getCourses(),
    getTeachers(),
    getProjects(),
    getBlogPosts(),
    getTestimonials(),
    getCMSSettings(),
  ]);

  const featuredCourses = courses.filter((c) => c.status === 'published').slice(0, 6);
  const featuredProjects = projects.slice(0, 3);
  const recentArticles = blogPosts.filter((b) => b.status === 'published').slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary-purple selection:text-white">
      <Navbar />

      <main className="flex-1 w-full pt-20">
        {/* ================= 01. CINEMATIC HERO SECTION ================= */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
          {/* Layered Cyber Lights & Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-primary-purple/25 via-primary-blue/20 to-primary-cyan/15 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-purple/15 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-cyan/15 blur-[120px] pointer-events-none rounded-full" />

          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {cms.announcement.enabled && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background-elevated/80 border border-border/80 text-xs text-text-secondary backdrop-blur-md hover:border-primary/50 transition-colors">
                  <span className="flex h-2 w-2 rounded-full bg-primary-cyan animate-pulse" />
                  <span>{cms.announcement.text}</span>
                  <Link href={cms.announcement.linkUrl} className="text-primary-cyan hover:underline font-semibold ml-1">
                    {cms.announcement.linkText}
                  </Link>
                </div>
              )}

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                {cms.hero.headline}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan">
                  {cms.hero.highlightedText}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {cms.hero.supportingText}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto shadow-glow" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    {cms.hero.ctaPrimary}
                  </Button>
                </Link>
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto" leftIcon={<Code2 className="w-5 h-5 text-primary-cyan" />}>
                    {cms.hero.ctaSecondary}
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-border/50 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success" />
                  <span>80% Real amaliyot</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success" />
                  <span>Xalqaro mentorlar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success" />
                  <span>Karyera markazi ko&apos;magi</span>
                </div>
              </div>
            </div>

            {/* Right Visual: 3D-feel Futuristic Code Editor & Terminal */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Floating Glow Card */}
                <div className="rounded-2xl border border-border/80 bg-background-panel/90 backdrop-blur-2xl shadow-2xl p-5 overflow-hidden transition-all duration-500 hover:border-primary-purple/50">
                  {/* Editor Window Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-error/80" />
                      <div className="w-3 h-3 rounded-full bg-status-warning/80" />
                      <div className="w-3 h-3 rounded-full bg-status-success/80" />
                      <span className="ml-2 text-xs font-mono text-text-muted flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-primary-cyan" />
                        MetaAcademy.tsx
                      </span>
                    </div>
                    <Badge variant="primary" size="sm">
                      Next.js 14 Pro
                    </Badge>
                  </div>

                  {/* Code snippet lines */}
                  <div className="space-y-2 text-xs font-mono leading-relaxed overflow-x-auto text-text-secondary">
                    <p className="text-primary-purple font-semibold">import {'{'} NextGeneration, Future {'}'} from &apos;@metaitschool/core&apos;;</p>
                    <p className="text-text-muted">// IT sohasidagi muvaffaqiyat formulasini ishga tushirish</p>
                    <p>
                      <span className="text-primary-cyan">const</span> student = <span className="text-status-warning">new</span> Student(&apos;Kelajak Muhandisi&apos;);
                    </p>
                    <p className="pl-4">
                      student.study(&apos;Full Stack & AI&apos;);
                    </p>
                    <p className="pl-4">
                      student.buildPortfolio([&apos;Fintech&apos;, &apos;AI Agent&apos;, &apos;SaaS&apos;]);
                    </p>
                    <p className="text-status-success pl-4 font-semibold">
                      await student.getHired(&apos;Global Tech Company&apos;);
                    </p>
                    <p className="text-primary-blue font-semibold">
                      export default student.createFuture();
                    </p>
                  </div>

                  {/* Live compilation status banner inside card */}
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
                      <span className="text-status-success font-medium">Build: Success (100% test coverage)</span>
                    </div>
                    <span className="text-text-muted">45ms</span>
                  </div>
                </div>

                {/* Floating Mini Widget 1: Employment Rate */}
                <div className="absolute -bottom-6 -left-6 bg-background-elevated/95 border border-primary/40 rounded-2xl p-4 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3 animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-status-success/20 text-status-success flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">94%</div>
                    <div className="text-[11px] text-text-secondary">Ishga joylashish darajasi</div>
                  </div>
                </div>

                {/* Floating Mini Widget 2: Live Mentors */}
                <div className="absolute -top-6 -right-6 bg-background-elevated/95 border border-primary-cyan/40 rounded-2xl p-3.5 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-cyan/20 text-primary-cyan flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Xalqaro Mentorlar</div>
                    <div className="text-[11px] text-text-secondary">7+ yil amaliy tajriba</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 02. ANIMATED STATISTICS ================= */}
        <section className="py-12 border-y border-border/70 bg-background-secondary/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-primary-cyan">
                  1,450+
                </div>
                <div className="text-sm font-medium text-text-secondary">Muvaffaqiyatli Bitiruvchilar</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-primary-blue">
                  94%
                </div>
                <div className="text-sm font-medium text-text-secondary">Ishga Joylashish Ko&apos;rsatkichi</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                  8+
                </div>
                <div className="text-sm font-medium text-text-secondary">Zamonaviy Kurs Dasturlari</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-status-success">
                  45+
                </div>
                <div className="text-sm font-medium text-text-secondary">Hamkor IT Kompaniyalar</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 03. FEATURED COURSES ================= */}
        <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <Badge variant="primary" className="mb-3">
                Professional Yo&apos;nalishlar
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Bozor talabidagi eng dolzarb IT kurslar
              </h2>
              <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-xl">
                Har bir kurs xalqaro IT kompaniyalarining talablari asosida tuzilgan bo&apos;lib, 80% amaliyotdan iborat.
              </p>
            </div>
            <Link href="/courses">
              <Button variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Barcha kurslarni ko&apos;rish
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} glow className="flex flex-col h-full group overflow-hidden">
                {/* Course Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-background-panel">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-elevated via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{course.category.toUpperCase()}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-semibold text-white border border-border">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <span>Daraja: <strong className="text-text-main">{course.level}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-status-warning">
                        <Star className="w-3.5 h-3.5 fill-status-warning" />
                        {course.rating} ({course.reviewsCount})
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-primary-cyan transition-colors leading-snug">
                      <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                    </h3>

                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-text-secondary">Kurs narxi:</div>
                      <div className="text-base font-extrabold text-primary-cyan">
                        {formatCurrency(course.price)} / oy
                      </div>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Batafsil
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= 04. LEARNING METHODOLOGY ================= */}
        <section className="py-20 bg-background-secondary/50 border-y border-border/70 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <Badge variant="primary">O&apos;qitish Metodikasi</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Nima uchun bizning o&apos;quvchilarimiz tez natijaga erishadi?
              </h2>
              <p className="text-text-secondary text-sm">
                Biz quruq nazariyani chetga surib, dasturlashni haqiqiy mahsulotlar yaratish orqali o&apos;rgatamiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-background-elevated/70 border border-border/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-purple/20 text-primary-purple flex items-center justify-center font-bold text-lg">
                  01
                </div>
                <h3 className="text-base font-bold text-white">80% Jonli Amaliyot</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Har bir nazariy dars darhol amaliy kod yozish va topshiriqlar orqali mustahkamlanadi.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background-elevated/70 border border-border/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-blue/20 text-primary-blue flex items-center justify-center font-bold text-lg">
                  02
                </div>
                <h3 className="text-base font-bold text-white">Real Loyihalar Portfoliosi</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Bitiruvchilar o&apos;z kurslari davomida 5 dan ortiq to&apos;liq, tijoriy talabga javob beradigan loyiha yaratadilar.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background-elevated/70 border border-border/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-cyan/20 text-primary-cyan flex items-center justify-center font-bold text-lg">
                  03
                </div>
                <h3 className="text-base font-bold text-white">Shaxsiy Code Review</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Senior dasturchilar har bir yozgan kodingizni qatorma-qator tekshirib, xalqaro clean code standartlarini o&apos;rgatadi.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background-elevated/70 border border-border/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-status-success/20 text-status-success flex items-center justify-center font-bold text-lg">
                  04
                </div>
                <h3 className="text-base font-bold text-white">Karyera & Rezyume Ko&apos;magi</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Texnik intervyulardan o&apos;tish, LinkedIn profilini yuritish va hamkor kompaniyalarga tavsiya etish.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 05. TECHNOLOGY ECOSYSTEM ================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Eng zamonaviy texnologiyalar ekotizimi
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm">
              Biz faqat 2026-yilgi global bozorda eng talabgir va zamonaviy vositalarni o&apos;rgatamiz.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              'React 19',
              'Next.js 14 App Router',
              'TypeScript',
              'Python 3.12',
              'PyTorch AI',
              'LangChain & LLMs',
              'Flutter 3',
              'Node.js & Express',
              'PostgreSQL & Supabase',
              'Docker & Kubernetes',
              'Tailwind CSS',
              'Figma & Design Systems',
              'Git & GitHub Actions',
              'AWS Cloud',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-background-elevated border border-border text-xs sm:text-sm font-mono text-text-main hover:border-primary-cyan hover:text-primary-cyan transition-colors shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ================= 06. FEATURED STUDENT PROJECTS ================= */}
        <section className="py-20 bg-background-secondary/40 border-y border-border/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <Badge variant="primary" className="mb-3">
                  Bitiruvchilar Ishlari
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  O&apos;quvchilarimiz tomonidan yaratilgan haqiqiy loyihalar
                </h2>
                <p className="text-text-secondary text-sm mt-2 max-w-xl">
                  Har bir loyiha noldan boshlab arxitekturasi qurilgan va jonli serverga joylangan.
                </p>
              </div>
              <Link href="/projects">
                <Button variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Barcha loyihalar
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Card key={project.id} glow className="flex flex-col h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden bg-background-panel">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary">{project.categoryLabel}</Badge>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs text-primary-cyan font-medium">
                        Muallif: {project.studentName}
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-background-panel text-[10px] text-text-secondary border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-border/50">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-cyan hover:underline flex items-center gap-1 font-medium"
                          >
                            Jonli demo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <Link href={`/projects/${project.slug}`} className="text-text-secondary hover:text-white">
                          Batafsil ma&apos;lumot →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 07. PROFESSIONAL TEACHERS ================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Katta Tajribali Mentorlar</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Sizga sohaning eng kuchli amaliyotchilari dars beradi
            </h2>
            <p className="text-text-secondary text-sm">
              Ustozlarimiz yirik IT kompaniyalarda ishlab kelayotgan Senior muhandislar va yetakchi arxitektorlardir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.slice(0, 6).map((teacher) => (
              <Card key={teacher.id} glow className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary-purple/40 shadow-glow">
                  <img
                    src={teacher.avatar}
                    alt={teacher.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{teacher.fullName}</h3>
                  <div className="text-xs text-primary-cyan font-medium">{teacher.specialization}</div>
                  <div className="text-[11px] text-text-secondary">Tajriba: {teacher.experience} • {teacher.studentsCount}+ o&apos;quvchi</div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {teacher.bio}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-status-warning/15 text-status-warning font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-status-warning" />
                    {teacher.rating}
                  </span>
                  <Link href={`/teachers/${teacher.id}`} className="text-xs text-text-secondary hover:text-white underline">
                    Profilni ko&apos;rish
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= 08. TESTIMONIALS ================= */}
        <section className="py-20 bg-background-secondary/60 border-y border-border/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
              <Badge variant="primary">Haqiqiy Fikrlar</Badge>
              <h2 className="text-3xl font-extrabold text-white">Bitiruvchilarimiz nima deydi?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-background-elevated/70 border border-border/80 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-status-warning">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-status-warning" />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary italic leading-relaxed">
                      &ldquo;{item.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                    <img
                      src={item.avatar}
                      alt={item.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{item.studentName}</div>
                      <div className="text-xs text-primary-cyan">{item.role} {item.company ? `(${item.company})` : ''}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 09. RECENT BLOG POSTS ================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <Badge variant="primary" className="mb-3">
                Texnologik Maqolalar
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                IT olamidagi so&apos;nggi yangiliklar va tahlillar
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Barcha maqolalar
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((post) => (
              <Card key={post.id} glow className="flex flex-col h-full overflow-hidden">
                <div className="h-44 w-full overflow-hidden bg-background-panel">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white hover:text-primary-cyan transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/50 text-xs text-text-secondary flex items-center justify-between">
                    <span>{post.authorName}</span>
                    <span>{post.publishedAt}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= 10. ENROLLMENT CTA ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-3xl border border-primary/50 bg-gradient-to-r from-background-elevated via-background-panel to-background-elevated p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-purple/20 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-cyan/20 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <Badge variant="primary">Keling, birgalikda boshlaymiz</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Kelajakdagi orzuingiz sari birinchi qadamni qo&apos;ying
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Hoziroq ariza qoldiring va bizning professional ta&apos;lim maslahatchilarimiz sizga to&apos;g&apos;ri yo&apos;nalish tanlashda bepul yordam berishadi.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/apply">
                  <Button size="lg" className="w-full sm:w-auto shadow-glow" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Bepul Konsultatsiyaga Yozilish
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Savollaringiz bormi?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
