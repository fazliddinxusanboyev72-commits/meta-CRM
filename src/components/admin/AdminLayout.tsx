'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CheckSquare,
  UserPlus,
  Kanban,
  CreditCard,
  DollarSign,
  Clock,
  FileQuestion,
  Award,
  Globe,
  FileText,
  Briefcase,
  Star,
  Bell,
  BarChart3,
  Shield,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'admin') {
          router.push('/admin/login');
        } else {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });

    // Fetch unread notifications
    fetch('/api/admin/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setNotifications(data);
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navSections = [
    {
      title: 'Boshqaruv',
      items: [
        { label: 'Boshqaruv Paneli', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Analitika & Hisobotlar', href: '/admin/analytics', icon: BarChart3 },
        { label: 'Faoliyat Jurnali (Audit)', href: '/admin/activity', icon: History },
      ],
    },
    {
      title: 'Ta\'lim & Akademik',
      items: [
        { label: 'O\'quvchilar', href: '/admin/students', icon: GraduationCap },
        { label: 'O\'qituvchilar', href: '/admin/teachers', icon: Users },
        { label: 'Kurslar & Sillabus', href: '/admin/courses', icon: BookOpen },
        { label: 'Akademik Guruhlar', href: '/admin/groups', icon: Calendar },
        { label: 'Davomat Tizimi', href: '/admin/attendance', icon: CheckSquare },
        { label: 'Dars Jadvallari', href: '/admin/schedules', icon: Clock },
        { label: 'Imtihonlar & Testlar', href: '/admin/exams', icon: FileQuestion },
        { label: 'Sertifikatlar', href: '/admin/certificates', icon: Award },
      ],
    },
    {
      title: 'Savdo & Moliya',
      items: [
        { label: 'Qabul CRM (Lidlar)', href: '/admin/crm', icon: Kanban },
        { label: 'Arizalar Ro\'yxati', href: '/admin/applications', icon: UserPlus },
        { label: 'To\'lovlar & Kvitansiyalar', href: '/admin/payments', icon: CreditCard },
        { label: 'Moliya & Xarajatlar', href: '/admin/finance', icon: DollarSign },
      ],
    },
    {
      title: 'Kontent Boshqaruvi (CMS)',
      items: [
        { label: 'Veb-sayt CMS', href: '/admin/content', icon: Globe },
        { label: 'Blog & Yangiliklar', href: '/admin/blog', icon: FileText },
        { label: 'Portfolio Loyihalar', href: '/admin/projects', icon: Briefcase },
        { label: 'Fikrlar & Sharhlar', href: '/admin/reviews', icon: Star },
        { label: 'Xabarnomalar', href: '/admin/notifications', icon: Bell },
      ],
    },
    {
      title: 'Tizim',
      items: [
        { label: 'Admin Foydalanuvchilar', href: '/admin/users', icon: Shield },
        { label: 'Rollar & Ruxsatlar', href: '/admin/roles', icon: Shield },
        { label: 'Tizim Sozlamalari', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background flex flex-col antialiased">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-background-panel/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-text-secondary hover:text-white md:hidden bg-background-elevated"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-purple to-primary-cyan flex items-center justify-center text-white shadow-glow">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-sm sm:text-base hidden sm:inline-block">
              META<span className="text-primary-cyan">IT</span> ADMIN
            </span>
          </Link>

          <div className="hidden lg:flex items-center ml-6 pl-4 border-l border-border text-xs text-text-muted">
            <span>Boshqaruv markazi</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-text-secondary hover:text-white px-3 py-1.5 rounded-xl border border-border bg-background-elevated transition-colors"
          >
            <span>Saytni ko&apos;rish</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 rounded-xl bg-background-elevated border border-border text-text-secondary hover:text-white relative transition-colors"
              aria-label="Xabarnomalar"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-status-error text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-background-elevated border border-border shadow-2xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Xabarnomalar</h4>
                  <Link href="/admin/notifications" onClick={() => setNotifDropdownOpen(false)} className="text-[11px] text-primary-cyan hover:underline">
                    Barchasi
                  </Link>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-background-panel border border-border/70 text-xs space-y-1">
                      <div className="font-semibold text-white">{n.title}</div>
                      <p className="text-[11px] text-text-secondary">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Admin User Badge */}
          {currentUser && (
            <div className="flex items-center gap-2.5 pl-2 border-l border-border">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-full object-cover border border-primary-purple"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white leading-tight">{currentUser.fullName}</div>
                <div className="text-[10px] text-primary-cyan font-mono leading-tight">@{currentUser.username} (Admin)</div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-text-secondary hover:text-status-error hover:bg-status-error/10 transition-colors"
            title="Tizimdan chiqish"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body Area with Natural Scrolling */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar with independent scrollbar */}
        <aside
          className={`hidden md:flex flex-col border-r border-border bg-background-secondary/90 backdrop-blur-md transition-all duration-300 flex-shrink-0 ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Scrollable Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {navSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {!isCollapsed && (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-3 py-1">
                    {sec.title}
                  </div>
                )}
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-primary-purple text-white shadow-glow'
                          : 'text-text-secondary hover:text-white hover:bg-background-elevated'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Collapse Toggle Footer */}
          <div className="p-3 border-t border-border flex items-center justify-end">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-xl text-text-secondary hover:text-white hover:bg-background-elevated transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-72 bg-background-secondary border-r border-border h-full flex flex-col p-4 overflow-y-auto z-10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-bold text-white text-sm">Boshqaruv menyusi</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-text-secondary hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {navSections.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-2">{sec.title}</div>
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
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
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area (Natural vertical scroll) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-background min-h-screen">
          <div className="max-w-7xl mx-auto space-y-8 pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
