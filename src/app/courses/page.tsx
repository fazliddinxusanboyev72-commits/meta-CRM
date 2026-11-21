'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Course } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Search, Star, Clock, User, ArrowRight, Filter, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
          setFilteredCourses(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let result = [...courses];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.subtitle.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Level
    if (selectedLevel !== 'all') {
      result = result.filter((c) => c.level === selectedLevel);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Popular
      result.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy, courses]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="primary">Katalog 2026</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Zamonaviy IT Kurslar Katalogi
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            O&apos;zingizga mos yo&apos;nalishni tanlang va professional ustozlar qo&apos;l ostida xalqaro standartdagi
            bilim va ko&apos;nikmalarga ega bo&apos;ling.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-background-elevated/70 border border-border rounded-2xl p-4 sm:p-6 mb-10 backdrop-blur-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Kurs nomi, texnologiya yoki mavzu bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background-panel border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
              />
            </div>

            {/* Level Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-background-panel border border-border rounded-xl px-3.5 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary-purple cursor-pointer"
              >
                <option value="all">Barcha darajalar</option>
                <option value="Boshlang'ich">Boshlang&apos;ich</option>
                <option value="O'rta">O&apos;rta</option>
                <option value="Mukammal">Mukammal</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-background-panel border border-border rounded-xl px-3.5 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary-purple cursor-pointer"
              >
                <option value="popular">Eng ommabop</option>
                <option value="rating">Reyting bo&apos;yicha</option>
                <option value="price-asc">Narxi (Arzondan qimmatga)</option>
                <option value="price-desc">Narxi (Qimmatdan arzonga)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-border/50 text-xs sm:text-sm">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-xl font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-purple text-white shadow-glow'
                  : 'bg-background-panel border border-border text-text-secondary hover:text-white'
              }`}
            >
              Barcha yo&apos;nalishlar
            </button>
            <button
              onClick={() => setSelectedCategory('programming')}
              className={`px-4 py-1.5 rounded-xl font-medium transition-colors ${
                selectedCategory === 'programming'
                  ? 'bg-primary-purple text-white shadow-glow'
                  : 'bg-background-panel border border-border text-text-secondary hover:text-white'
              }`}
            >
              💻 Dasturlash (Full Stack, Mobile)
            </button>
            <button
              onClick={() => setSelectedCategory('technology')}
              className={`px-4 py-1.5 rounded-xl font-medium transition-colors ${
                selectedCategory === 'technology'
                  ? 'bg-primary-purple text-white shadow-glow'
                  : 'bg-background-panel border border-border text-text-secondary hover:text-white'
              }`}
            >
              🤖 Sun&apos;iy Intellekt & DevOps
            </button>
            <button
              onClick={() => setSelectedCategory('design')}
              className={`px-4 py-1.5 rounded-xl font-medium transition-colors ${
                selectedCategory === 'design'
                  ? 'bg-primary-purple text-white shadow-glow'
                  : 'bg-background-panel border border-border text-text-secondary hover:text-white'
              }`}
            >
              🎨 UI/UX & Product Design
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-background-elevated/40 border border-border animate-pulse" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <BookOpen className="w-12 h-12 text-text-muted mx-auto" />
            <h3 className="text-xl font-bold text-white">Mos keluvchi kurs topilmadi</h3>
            <p className="text-sm text-text-secondary">
              Qidiruv so&apos;zini o&apos;zgartirib ko&apos;ring yoki filtrlarni tozalang.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
            >
              Filtrlarni tozalash
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} glow className="flex flex-col h-full group overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-background-panel">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{course.category.toUpperCase()}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-semibold text-white border border-border">
                      {course.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>Daraja: <strong className="text-text-main">{course.level}</strong></span>
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

                  <div className="space-y-3 pt-2">
                    {course.teacherName && (
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <User className="w-3.5 h-3.5 text-primary-cyan" />
                        <span>Mentor: <strong className="text-white">{course.teacherName}</strong></span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-text-secondary">Oylik to&apos;lov:</div>
                        <div className="text-base font-extrabold text-primary-cyan">
                          {formatCurrency(course.price)}
                        </div>
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Tanlash
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
