'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { SkeletonImage, SkeletonText } from '@/components/ui/Loading';
import { Calendar, User, ArrowLeft, AlertCircle, ChevronLeft } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  created_at: string;
  author_name: string;
}

interface BlogDetailProps {
  slug: string;
}

export default function BlogDetail({ slug }: BlogDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();

        if (data.success) {
          setPost(data.data);
        } else {
          setError(data.message || 'Failed to load blog post');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <Container size="lg" className="relative z-10">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-text-secondary hover:text-secondary transition-colors mb-6 sm:mb-8 group px-3 sm:px-0"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Kembali ke Blog</span>
        </Link>

        {/* Loading State with Skeleton */}
        {loading && (
          <article className="space-y-8">
            {/* Hero Image Skeleton */}
            <SkeletonImage className="h-64 sm:h-96" aspectRatio="aspect-auto" />
            
            {/* Header Skeleton */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <div className="h-12 sm:h-16 bg-surface/50 rounded-lg animate-pulse w-full" />
                <div className="h-12 sm:h-16 bg-surface/50 rounded-lg animate-pulse w-3/4" />
              </div>
              
              {/* Meta */}
              <div className="flex gap-6 border-b border-secondary/10 pb-6">
                <div className="h-6 bg-surface/50 rounded animate-pulse w-32" />
                <div className="h-6 bg-surface/50 rounded animate-pulse w-32" />
              </div>
              
              {/* Excerpt */}
              <SkeletonText lines={2} />
            </div>
            
            {/* Content Skeleton */}
            <Card padding="lg" className="bg-surface/30">
              <div className="space-y-6">
                <SkeletonText lines={4} />
                <div className="h-48 bg-surface/50 rounded-lg animate-pulse" />
                <SkeletonText lines={6} />
                <SkeletonText lines={4} />
              </div>
            </Card>
          </article>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="p-8 text-center border-2 border-red-500/20 bg-red-500/5">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-400 mb-2">Post Not Found</h3>
            <p className="text-text-secondary mb-6">{error}</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-bg-primary font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Card>
        )}

        {/* Post Content */}
        {!loading && !error && post && (
          <article className="px-3 sm:px-4 md:px-0">
            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-[28rem] xl:h-[32rem] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-10 md:mb-14 shadow-2xl">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />
              </div>
            )}

            {/* Article Header */}
            <div className="mb-6 sm:mb-10 md:mb-14 max-w-4xl mx-auto">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-text-primary mb-5 sm:mb-6 md:mb-8 leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base md:text-lg text-text-tertiary border-b-2 border-secondary/20 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm md:text-base">{formatDate(post.published_at || post.created_at)}</span>
                </div>
                {post.author_name && (
                  <>
                    <span className="text-text-tertiary/50 text-lg sm:text-xl md:text-2xl">•</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary flex-shrink-0" />
                      <span className="font-medium text-xs sm:text-sm md:text-base">Oleh {post.author_name}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mt-5 sm:mt-6 md:mt-8 leading-relaxed italic font-light">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto">
              <Card padding="md" className="bg-surface/40 backdrop-blur-sm border-2 border-secondary/20 shadow-xl sm:p-6 md:p-8 lg:p-10">
                <div
                  className="prose prose-invert prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-secondary prose-a:font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Card>
            </div>

            {/* Footer CTA */}
            <div className="mt-10 sm:mt-14 md:mt-16 lg:mt-20 text-center">
              <Card padding="md" className="bg-gradient-to-br from-secondary/15 to-accent/15 border-2 border-secondary/30 shadow-xl backdrop-blur-sm sm:p-6 md:p-8 lg:p-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
                  Ingin Baca Artikel Lainnya?
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                  Jelajahi cerita dan insight menarik lainnya tentang nightlife Jakarta
                </p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-secondary text-bg-primary font-bold text-base sm:text-lg rounded-lg sm:rounded-xl hover:bg-secondary/90 transition-all hover:-translate-y-1 hover:shadow-glow-lg active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  Lihat Semua Artikel
                </Link>
              </Card>
            </div>
          </article>
        )}
      </Container>
    </div>
  );
}
