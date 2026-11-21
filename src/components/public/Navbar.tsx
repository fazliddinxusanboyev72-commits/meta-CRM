'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Code2, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Bosh sahifa', href: '/' },
    { label: 'Kurslar', href: '/courses' },
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Ustozlar', href: '/teachers' },
    { label: 'Loyihalar', href: '/projects' },
    { label: 'Natijalar', href: '/achievements' },
    { label: 'Blog', href: '/blog' },
    { label: 'Bog\'lanish', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/80 shadow-panel'
          : 'bg-transparent border-b border-border/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Animated Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-purple via-primary-blue to-primary-cyan flex items-center justify-center p-0.5 shadow-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-background-main rounded-[14px] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-cyan group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              META<span className="text-primary-cyan">IT</span>SCHOOL
            </span>
            <span className="text-[10px] tracking-widest uppercase text-text-secondary font-medium block">
              Digital Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-white bg-background-elevated/80 border border-primary/30 shadow-sm'
                    : 'text-text-secondary hover:text-white hover:bg-background-elevated/40'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary-cyan" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" leftIcon={<User className="w-4 h-4" />}>
              Kirish
            </Button>
          </Link>
          <Link href="/apply">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Ariza topshirish
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/auth/login" className="p-2 text-text-secondary hover:text-white">
            <User className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-text-secondary hover:text-white bg-background-elevated/80 border border-border"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background-secondary/95 backdrop-blur-2xl border-b border-border px-5 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-purple/20 text-primary-cyan border border-primary-purple/40'
                      : 'text-text-secondary hover:text-white hover:bg-background-elevated'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-2.5">
            <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Ariza topshirish
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full" size="sm">
                  Talaba / O&apos;qituvchi
                </Button>
              </Link>
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full" size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
