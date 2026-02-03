'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { SkeletonCard } from '@/components/ui/Loading';
import { Calendar, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  created_at: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/blog');
        const data = await response.json();

        if (data.success) {
          setPosts(data.data || []);
        } else {
          setError(data.message || 'Failed to load blog posts');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 px-4 sm:px-6">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
              <span className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wider">
                Our Blog
              </span>
            </div>
          </div>
          
          <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 md:mb-8 font-extrabold tracking-tight text-center leading-[1.1]">
            Stories & Insights
          </Heading>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed text-center px-2">
            Latest updates, event highlights, and nightlife insights from Jakarta Party Scene
          </p>
        </div>

        {/* Loading State with Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 md:px-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} className="h-full" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="p-8 text-center border-2 border-red-500/20 bg-red-500/5">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-400 mb-2">Oops! Something went wrong</h3>
            <p className="text-text-secondary">{error}</p>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No Posts Yet</h3>
            <p className="text-text-secondary">Check back soon for our latest stories and updates!</p>
          </Card>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 md:px-0">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card 
                    className="h-full group hover:shadow-glow-lg transition-all duration-500 overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 hover:scale-[1.02] active:scale-[0.98] bg-surface/30 backdrop-blur-sm"
                    hoverable
                    padding="none"
                  >
                    {/* Featured Image */}
                    {post.featured_image ? (
                      <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden bg-surface/50">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
                      </div>
                    ) : (
                      <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-secondary/40" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 sm:p-6 md:p-7 space-y-3 sm:space-y-4">
                      {/* Meta */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-tertiary">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                        <span className="font-medium">{formatDate(post.published_at || post.created_at)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary group-hover:text-secondary transition-colors leading-snug line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed line-clamp-3 min-h-[4rem] sm:min-h-[4.5rem] font-normal">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-secondary font-bold text-sm sm:text-base group-hover:gap-3 sm:group-hover:gap-4 transition-all pt-1 sm:pt-2">
                        <span className="text-sm sm:text-base">Baca Selengkapnya</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Stats */}
        {!loading && !error && posts.length > 0 && (
          <div className="mt-12 sm:mt-16 md:mt-20 text-center px-4">
            <Card className="inline-block px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-secondary/10 to-accent/10 border-2 border-secondary/30">
              <p className="text-text-secondary text-base sm:text-lg">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary block mb-1">{posts.length}</span>
                {posts.length === 1 ? 'Artikel' : 'Artikel'} Tersedia
              </p>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
