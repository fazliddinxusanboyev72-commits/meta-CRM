import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getBlogPosts } from '@/lib/db';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';

export const revalidate = 0;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const publishedPosts = posts.filter((p) => p.status === 'published');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary">Blog & Maqolalar</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            IT Maqolalari, Maslahatlar va Yangiliklar
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Texnologiyalar olamidagi eng so&apos;nggi trendlar, dasturlash bo&apos;yicha qo&apos;llanmalar va ekspert fikrlari.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
            <Card key={post.id} glow className="flex flex-col h-full overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden bg-background-panel">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="primary">{post.category}</Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white hover:text-primary-cyan transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs text-text-main font-medium">{post.authorName}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-xs text-primary-cyan hover:underline font-semibold flex items-center gap-1">
                    O&apos;qish <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
