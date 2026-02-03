'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Save, Eye, FileText } from 'lucide-react';
import TiptapEditor from './TiptapEditor';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface BlogEditorProps {
  user: User;
}

export default function BlogEditor({ user }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (publishNow = false) => {
    setMessage(null);

    // Validation
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }
    if (!slug.trim()) {
      setMessage({ type: 'error', text: 'Slug is required' });
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      setMessage({ type: 'error', text: 'Content is required' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          content,
          excerpt: excerpt.trim() || null,
          featured_image: featuredImage.trim() || null,
          status: publishNow ? 'published' : status,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: `Blog post ${publishNow ? 'published' : 'saved'} successfully!`,
        });
        
        // Reset form
        setTitle('');
        setSlug('');
        setExcerpt('');
        setFeaturedImage('');
        setContent('');
        setStatus('draft');

        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save blog post' });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="full" className="py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Heading level={1} className="text-3xl sm:text-4xl">
            Blog Editor
          </Heading>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                showPreview
                  ? 'bg-secondary text-bg-primary'
                  : 'bg-surface/50 text-text-secondary hover:bg-surface'
              }`}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
          </div>
        </div>
        <p className="text-text-secondary">
          Logged in as: <strong>{user.name}</strong> ({user.role})
        </p>
      </div>

      {/* Message */}
      {message && (
        <Card
          className={`mb-6 p-4 border-2 ${
            message.type === 'success'
              ? 'border-green-500/50 bg-green-500/10'
              : 'border-red-500/50 bg-red-500/10'
          }`}
        >
          <p
            className={`text-center font-semibold ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </p>
        </Card>
      )}

      {/* Layout: Editor + Preview */}
      <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* Editor Section */}
        <div className="space-y-6">
          {/* Meta Fields */}
          <Card padding="lg">
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Post Details
            </h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog post title"
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Slug <span className="text-red-500">*</span>
                  <span className="ml-2 text-xs font-normal text-text-tertiary">
                    (URL-friendly version)
                  </span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="blog-post-slug"
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-mono text-sm"
                />
                {slug && (
                  <p className="mt-1 text-xs text-text-tertiary">
                    URL: /blog/{slug}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Excerpt
                  <span className="ml-2 text-xs font-normal text-text-tertiary">
                    (Short summary)
                  </span>
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your blog post"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Content Editor */}
          <Card padding="lg">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Content <span className="text-red-500">*</span>
            </h3>
            <TiptapEditor content={content} onChange={setContent} />
          </Card>

          {/* Action Buttons */}
          <Card padding="lg" className="bg-surface/30">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
                variant="outline"
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Publish Now
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="space-y-6">
            <Card padding="lg" className="sticky top-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary" />
                Live Preview
              </h3>

              {/* Preview Content */}
              <div className="space-y-4">
                {/* Featured Image Preview */}
                {featuredImage && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={featuredImage}
                      alt={title || 'Featured image'}
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Title Preview */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                    {title || 'Untitled Post'}
                  </h1>
                  {excerpt && (
                    <p className="text-text-secondary italic">{excerpt}</p>
                  )}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-text-tertiary border-b border-secondary/10 pb-4">
                  <span>By {user.name}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    status === 'published' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {status.toUpperCase()}
                  </span>
                </div>

                {/* Content Preview */}
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: content || '<p class="text-text-tertiary italic">Your content will appear here...</p>' }}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </Container>
  );
}
