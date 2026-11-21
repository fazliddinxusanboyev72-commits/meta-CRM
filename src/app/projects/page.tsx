'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProjectItem } from '@/types';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const filtered = selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="primary">Talabalar Portfoliolar Galereyasi</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bitiruvchilarimiz Yaratgan Haqiqiy Loyihalar
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Har bir o&apos;quvchi kurs yakunida o&apos;z portfoliosi uchun mustaqil, to&apos;liq funksional tijoriy darajadagi
            veb-sayt, mobil ilova yoki AI modelini yaratadi.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10 text-xs sm:text-sm">
          {['all', 'web', 'ai', 'mobile', 'design'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-purple text-white shadow-glow'
                  : 'bg-background-elevated border border-border text-text-secondary hover:text-white'
              }`}
            >
              {cat === 'all'
                ? 'Barcha loyihalar'
                : cat === 'web'
                ? '🌐 Veb Ilovalar'
                : cat === 'ai'
                ? '🤖 Sun\'iy Intellekt'
                : cat === 'mobile'
                ? '📱 Mobil Ilovalar'
                : '🎨 UI/UX Dizayn'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => (
            <Card key={proj.id} glow className="flex flex-col h-full overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden bg-background-panel">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{proj.categoryLabel}</Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-primary-cyan font-semibold">
                    Muallif: {proj.studentName}
                  </div>
                  <h3 className="text-lg font-bold text-white hover:text-primary-cyan transition-colors leading-snug">
                    <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-background-panel text-[10px] text-text-secondary border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-cyan hover:underline flex items-center gap-1 font-semibold"
                      >
                        Jonli Demo <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link href={`/projects/${proj.slug}`}>
                      <Button size="sm" variant="outline">
                        Tafsilotlar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
