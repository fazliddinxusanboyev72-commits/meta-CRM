import React from 'react';
import Link from 'next/link';
import { Code2, ArrowUpRight, ShieldCheck, Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary/90 text-text-secondary relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary-purple/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-purple to-primary-cyan flex items-center justify-center text-white">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                META<span className="text-primary-cyan">IT</span>SCHOOL
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              &ldquo;Kelajakni kutma. Uni yarat.&rdquo; MetaITSchool — O&apos;zbekistonda xalqaro standartlar asosida
              eng zamonaviy IT mutaxassislarini tayyorlovchi innovatsion raqamli akademiya.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me/metaitschool_official"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-background-elevated border border-border flex items-center justify-center hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                aria-label="Telegram"
              >
                TG
              </a>
              <a
                href="https://instagram.com/metaitschool"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-background-elevated border border-border flex items-center justify-center hover:border-primary-purple hover:text-primary-purple transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://youtube.com/@metaitschool"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-background-elevated border border-border flex items-center justify-center hover:border-status-error hover:text-status-error transition-colors"
                aria-label="YouTube"
              >
                YT
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-main mb-4">Akademiya</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-cyan transition-colors">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary-cyan transition-colors">
                  Barcha kurslar
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-primary-cyan transition-colors">
                  Professional ustozlar
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary-cyan transition-colors">
                  Bitiruvchilar loyihalari
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-primary-cyan transition-colors">
                  O&apos;quvchilar yutuqlari
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-primary-cyan transition-colors">
                  Haqiqiy fikrlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-main mb-4">Yo&apos;nalishlar</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses/full-stack-javascript" className="hover:text-primary-cyan transition-colors">
                  Full Stack Next.js Pro
                </Link>
              </li>
              <li>
                <Link href="/courses/python-ai-data" className="hover:text-primary-cyan transition-colors">
                  Python & Sun&apos;iy Intellekt
                </Link>
              </li>
              <li>
                <Link href="/courses/ui-ux-design-pro" className="hover:text-primary-cyan transition-colors">
                  Professional UI/UX Dizayn
                </Link>
              </li>
              <li>
                <Link href="/courses/mobile-flutter" className="hover:text-primary-cyan transition-colors">
                  Flutter Mobil Dasturlash
                </Link>
              </li>
              <li>
                <Link href="/courses/cyber-security" className="hover:text-primary-cyan transition-colors">
                  Kiberxavfsizlik
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary-cyan transition-colors">
                  Ta&apos;lim narxlari & Grandlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-main mb-4">Aloqa & Portallar</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-cyan flex-shrink-0" />
                <span>+998 (71) 200-50-50</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-purple flex-shrink-0" />
                <span>info@metaitschool.uz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                <span className="text-xs">Toshkent sh., Amir Temur shoh ko&apos;chasi, IT Park</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-status-warning flex-shrink-0" />
                <span className="text-xs">Dush-Shan: 09:00 - 21:00</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary-cyan transition-colors border border-border/80 px-2.5 py-1.5 rounded-lg bg-background-elevated/40"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin tizimiga kirish</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} MetaITSchool Maximum. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">
              Ko&apos;p beriladigan savollar
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Yordam markazi
            </Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">
              Talabalar portali
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
