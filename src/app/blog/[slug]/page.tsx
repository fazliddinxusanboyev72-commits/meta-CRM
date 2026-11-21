import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="max-w-3xl mx-auto space-y-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Barcha maqolalarga qaytish
          </Link>

          {/* Article Header */}
          <div className="space-y-4">
            <Badge variant="primary">{post.category}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-4 border-y border-border text-xs text-text-secondary">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-primary-purple"
                />
                <div>
                  <div className="text-sm font-bold text-white">{post.authorName}</div>
                  <div className="text-xs text-primary-cyan">{post.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden border border-border shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto max-h-[460px] object-cover"
            />
          </div>

          {/* Content Body */}
          <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-5 text-sm sm:text-base">
            <p className="text-base sm:text-lg text-text-main font-medium leading-relaxed">
              {post.excerpt}
            </p>

            <div className="whitespace-pre-line leading-relaxed pt-2">
              {post.content}
            </div>
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-border flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-text-secondary" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-background-elevated border border-border text-xs text-primary-cyan"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-border space-y-6">
              <h3 className="text-xl font-bold text-white">Mavzuga doir boshqa maqolalar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Card key={rel.id} glow className="p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs text-primary-cyan font-semibold">{rel.category}</span>
                      <h4 className="text-sm font-bold text-white hover:text-primary-cyan transition-colors">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                    </div>
                    <Link href={`/blog/${rel.slug}`} className="text-xs text-primary-cyan hover:underline inline-block">
                      O&apos;qish →
                    </Link>
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
