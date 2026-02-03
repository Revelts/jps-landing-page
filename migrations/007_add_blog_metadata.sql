-- Migration: Add category and tags to blog_posts
-- Description: Add metadata columns for better SEO and organization
-- Created: 2026-02-03

-- Add category column (for article:section in OpenGraph)
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Add tags array column (for article:tag in OpenGraph)
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Add comments
COMMENT ON COLUMN blog_posts.category IS 'Blog post category for SEO and organization (e.g., Nightlife, Events, Tips)';
COMMENT ON COLUMN blog_posts.tags IS 'Array of tags for SEO and filtering (e.g., {Jakarta, SCBD, Clubbing})';

-- Example data for testing (optional - can be removed)
-- UPDATE blog_posts 
-- SET 
--   category = 'Nightlife',
--   tags = ARRAY['Jakarta', 'Party', 'Nightlife']
-- WHERE category IS NULL;