import type { Metadata } from 'next';
import './globals.css';
import { AIAssistantWidget } from '@/components/ui/AIAssistantWidget';

export const metadata: Metadata = {
  title: 'MetaITSchool — Keyingi Avlod IT Akademiyasi | Kelajakni kutma. Uni yarat.',
  description:
    "MetaITSchool — O'zbekistonning eng zamonaviy raqamli IT akademiyasi. Full Stack JavaScript, Python AI, Mobile Flutter va UI/UX yo'nalishlarida xalqaro darajadagi ta'lim tizimi.",
  keywords: [
    'MetaITSchool',
    'IT maktab',
    'Dasturlash kurslari',
    'Frontend',
    'React',
    'Next.js',
    'Python',
    'Sun\'iy intellekt',
    'Toshkent IT akademiya',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-text-main antialiased selection:bg-primary-purple selection:text-white flex flex-col">
        {children}
        <AIAssistantWidget />
      </body>
    </html>
  );
}
