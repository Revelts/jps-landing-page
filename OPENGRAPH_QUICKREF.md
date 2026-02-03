# OpenGraph Quick Reference

## 🚀 Quick Start

Semua halaman sudah otomatis mendapat OpenGraph tags via `app/layout.tsx`.

Untuk custom metadata, gunakan salah satu helper function:

### 1. General Page (Events, Community, etc)

```typescript
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Your Page Title',
  description: 'Your page description',
  keywords: 'keyword1, keyword2, keyword3',
  canonical: '/your-page-path',
});
```

### 2. Blog List

```typescript
import { generateBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Blog - Jakarta Party Scene',
  description: 'Blog description',
  tags: ['tag1', 'tag2'],
});
```

### 3. Blog Detail (Dynamic)

```typescript
import { generateBlogMetadata, generateArticleSchema } from '@/lib/metadata';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPost(params.slug);

  return generateBlogMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.featured_image, // Optional
    slug: params.slug,
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    author: post.author,
    tags: post.tags,
    category: post.category,
  });
}
```

---

## 📸 Default Image

**Primary:** `https://jakartapartysquad.com/assets/images/header.jpg`

- Size: 1200 x 630 px
- Format: JPEG
- Optimized untuk semua platform

**Logo:** `https://jakartapartysquad.com/assets/images/logo_2_512.png`

- Size: 512 x 512 px
- Format: PNG
- Sebagai fallback image

---

## ✅ What's Included

Setiap page otomatis mendapat:

### Facebook & WhatsApp

- ✅ `og:title`
- ✅ `og:description`
- ✅ `og:image` (1200x630)
- ✅ `og:image:width` & `og:image:height`
- ✅ `og:url`
- ✅ `og:type`
- ✅ `og:site_name`
- ✅ `og:locale` (id_ID)

### Twitter/X

- ✅ `twitter:card` (summary_large_image)
- ✅ `twitter:title`
- ✅ `twitter:description`
- ✅ `twitter:image`
- ✅ `twitter:creator` (@jakartapartysquad)
- ✅ `twitter:site`

### Blog Posts (Additional)

- ✅ `article:published_time`
- ✅ `article:modified_time`
- ✅ `article:author`
- ✅ `article:section`
- ✅ `article:tag`
- ✅ Article Schema (JSON-LD)

---

## 🧪 Testing

### Facebook/WhatsApp

1. Go to: https://developers.facebook.com/tools/debug/
2. Enter URL
3. Click "Scrape Again" if updating
4. Preview akan sama untuk WhatsApp

### Twitter

1. Go to: https://cards-dev.twitter.com/validator
2. Enter URL
3. Preview Card

### All Platforms

1. Go to: https://www.opengraph.xyz/
2. Enter URL
3. See previews for all platforms

---

## 📱 Platform Preview Examples

### WhatsApp

```
┌──────────────────────────┐
│   [Image 1200x630]       │
└──────────────────────────┘
📝 Page Title | Jakarta Party Squad
Description text here...
🔗 jakartapartysquad.com
```

### Facebook

```
┌────────────────────────────────────┐
│   [Large Image Preview]            │
│   1200x630                          │
└────────────────────────────────────┘
JAKARTAPARTYSQUAD.COM
Page Title | Jakarta Party Squad
Description text here...
```

### Twitter

```
┌────────────────────────────────────┐
│   [Card Image]                     │
└────────────────────────────────────┘
Page Title | Jakarta Party Squad
Description text here...
🔗 jakartapartysquad.com
```

---

## 🔧 Custom OpenGraph per Page

Jika butuh custom image atau metadata per page:

```typescript
// app/custom-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Page',
  description: 'Custom description',
  openGraph: {
    title: 'Custom OG Title',
    description: 'Custom OG description',
    images: [
      {
        url: 'https://jakartapartysquad.com/assets/images/custom-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Custom alt text',
      },
    ],
    url: 'https://jakartapartysquad.com/custom-page',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Twitter Title',
    description: 'Custom Twitter description',
    images: ['https://jakartapartysquad.com/assets/images/custom-image.jpg'],
  },
};
```

---

## 📊 Image Guidelines

### Recommended Sizes

| Platform  | Width  | Height | Aspect Ratio |
| --------- | ------ | ------ | ------------ |
| Facebook  | 1200px | 630px  | 1.91:1       |
| WhatsApp  | 1200px | 630px  | 1.91:1       |
| Twitter   | 1200px | 675px  | 16:9         |
| LinkedIn  | 1200px | 627px  | 1.91:1       |
| Instagram | 1080px | 1080px | 1:1          |

### File Requirements

- ✅ Format: JPEG, PNG, or GIF
- ✅ Max size: 8MB (WhatsApp limit)
- ✅ Min size: 200x200px
- ✅ Must be absolute URL (https://)
- ✅ Publicly accessible

---

## 🎯 SEO Impact

**Before OpenGraph:**

- Plain text links in social media
- No image preview
- Lower engagement

**After OpenGraph:**

- ✅ Rich previews with images
- ✅ Higher click-through rate
- ✅ Better brand visibility
- ✅ Professional appearance
- ✅ Increased social shares

---

## 📞 Support

**Issues dengan OpenGraph?**

1. **Preview tidak muncul:**
   - Check image URL accessible
   - Validate with Facebook Debugger
   - Wait for WhatsApp cache (7 days)

2. **Preview salah:**
   - Clear Facebook cache: "Scrape Again"
   - Update metadata in code
   - Redeploy website

3. **Image tidak load:**
   - Check image size < 8MB
   - Verify CORS headers
   - Use absolute URL

**Contact:** JPS Development Team

---

**Quick Links:**

- 📚 Full Docs: `OPENGRAPH_SETUP.md`
- 🧪 Test Script: `node scripts/test-opengraph.js`
- 🔍 Facebook Debugger: https://developers.facebook.com/tools/debug/
- 🐦 Twitter Validator: https://cards-dev.twitter.com/validator
