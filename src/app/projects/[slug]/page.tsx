import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Github, ArrowRight, User, BookOpen, Layers } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const otherProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{project.categoryLabel}</Badge>
              <span className="text-xs text-text-secondary">•</span>
              <span className="text-xs text-text-secondary">Kurs: <strong className="text-text-main">{project.courseTitle}</strong></span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-primary-purple/20 border border-primary-purple flex items-center justify-center text-primary-cyan">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Loyiha muallifi: {project.studentName}</div>
                <div className="text-xs text-text-secondary">MetaITSchool Bitiruvchisi</div>
              </div>
            </div>
          </div>

          {/* Cover Media */}
          <div className="rounded-3xl overflow-hidden border border-border shadow-2xl relative">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 p-5 rounded-2xl bg-background-elevated border border-border">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                <Button size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
                  Jonli Loyihani Ko&apos;rish (Demo)
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="md" leftIcon={<Github className="w-4 h-4" />}>
                  GitHub Manba Kodi
                </Button>
              </a>
            )}
          </div>

          {/* Description & Tech Stack */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Loyiha haqida to&apos;liq ma&apos;lumot</h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-base font-bold text-white">Ishlatilgan texnologiyalar:</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-xl bg-background-elevated border border-border text-xs font-mono text-primary-cyan"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="pt-10 border-t border-border space-y-6">
              <h3 className="text-xl font-bold text-white">Boshqa o&apos;quvchilar loyihalari</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherProjects.map((p) => (
                  <Card key={p.id} glow className="p-4 flex items-center gap-4">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white truncate hover:text-primary-cyan">
                        <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                      </h4>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{p.studentName}</p>
                      <Link href={`/projects/${p.slug}`} className="text-xs text-primary-cyan mt-1 inline-block">
                        Ko&apos;rish →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
