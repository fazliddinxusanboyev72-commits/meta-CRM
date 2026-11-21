'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Video,
  FileText,
  FileQuestion,
  CheckSquare,
  Calendar,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  School,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/auth/login');
        } else {
          setCurrentTeacher(data.user);
        }
      })
      .catch(() => router.push('/auth/login'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
  };

  const menu = [
    { label: 'Bosh Sahifa', href: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Biriktirilgan Kurslar', href: '/teacher/courses', icon: BookOpen },
    { label: 'Mening Guruhlarim', href: '/teacher/groups', icon: Users },
    { label: 'O\'quvchilarim', href: '/teacher/students', icon: GraduationCap },
    { label: 'Dars Rejalari', href: '/teacher/lessons', icon: Video },
    { label: 'Vazifalarni Baholash', href: '/teacher/homework', icon: FileText },
    { label: 'Imtihonlar', href: '/teacher/exams', icon: FileQuestion },
    { label: 'Davomat Olish', href: '/teacher/attendance', icon: CheckSquare },
    { label: 'Dars Jadvalim', href: '/teacher/schedule', icon: Calendar },
    { label: 'Xabarnomalar', href: '/teacher/notifications', icon: Bell },
    { label: 'Mening Profilim', href: '/teacher/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-background-panel/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-text-secondary hover:text-white md:hidden bg-background-elevated"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/teacher/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-cyan to-primary-blue flex items-center justify-center text-white shadow-glow">
              <School className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">
              USTOZ<span className="text-primary-cyan">PORTAL</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-white"
          >
            Bosh sayt <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {currentTeacher && (
            <div className="flex items-center gap-2.5 pl-2 border-l border-border">
              <img
                src={currentTeacher.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={currentTeacher.fullName}
                className="w-8 h-8 rounded-full object-cover border border-primary-cyan"
              />
              <span className="text-xs font-bold text-white hidden sm:inline-block">
                {currentTeacher.fullName}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-text-secondary hover:text-status-error hover:bg-status-error/10 transition-colors"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-border bg-background-secondary/90 backdrop-blur-md flex-shrink-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-primary-purple text-white shadow-glow'
                      : 'text-text-secondary hover:text-white hover:bg-background-elevated'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-72 bg-background-secondary border-r border-border h-full flex flex-col p-4 overflow-y-auto z-10 space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-border mb-2">
                <span className="font-bold text-white text-sm">O&apos;qituvchi menyusi</span>
                <button onClick={() => setMobileOpen(false)} className="p-1 text-text-secondary hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {menu.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-primary-purple text-white shadow-glow'
                        : 'text-text-secondary hover:text-white hover:bg-background-elevated'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-background min-h-screen">
          <div className="max-w-6xl mx-auto space-y-8 pb-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
