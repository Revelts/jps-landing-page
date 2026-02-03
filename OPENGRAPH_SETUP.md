# OpenGraph Setup untuk Semua Sosial Media

## Status: ✅ Lengkap

Setup OpenGraph untuk semua sosial media telah ditambahkan ke website Jakarta Party Squad. Image yang digunakan: `https://jakartapartysquad.com/assets/images/header.jpg`

---

## Platform yang Didukung

### ✅ Facebook

- Meta tags lengkap dengan `og:` prefix
- Image dimensions optimal (1200x630)
- Locale ID untuk targeting Indonesia

### ✅ WhatsApp

- Menggunakan OpenGraph tags (sama dengan Facebook)
- Image preview otomatis muncul saat share link
- Title, description, dan image lengkap

### ✅ Instagram

- OpenGraph tags untuk Instagram Stories & DM
- Image preview support

### ✅ Twitter / X

- Twitter Card dengan `summary_large_image`
- Creator & site tags
- Dedicated Twitter metadata

### ✅ LinkedIn

- OpenGraph support penuh
- Article metadata untuk blog posts

### ✅ Telegram

- OpenGraph image support
- Channel reference included

### ✅ Pinterest

- Description tags khusus
- Image pinning support

---

## File yang Sudah Diupdate

### 1. **lib/metadata.ts**

File utama untuk generate metadata.

**Fungsi baru:**

- `generateBlogMetadata()` - Khusus untuk blog dengan Article schema
- `generateArticleSchema()` - Structured data untuk blog posts
- Enhanced `generateMetadata()` - Lebih lengkap dengan semua platform

**Tags yang ditambahkan:**

```typescript
openGraph: {
  title, description, url, siteName,
  images: [{
    url: 'https://jakartapartysquad.com/assets/images/header.jpg',
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/jpeg'
  }],
  locale: 'id_ID',
  type: 'website' | 'article',
  countryName: 'Indonesia',
  // Article specific:
  publishedTime, modifiedTime, authors, section, tags
}

twitter: {
  card: 'summary_large_image',
  title, description,
  images: [ogImage],
  creator: '@jakartapartysquad',
  site: '@jakartapartysquad'
}

other: {
  'og:image:width': '1200',
  'og:image:height': '630',
  'og:image:alt': title,
  'article:published_time': publishedTime,
  'article:modified_time': modifiedTime,
  'article:author': author,
  'article:section': category,
  'article:tag': tags
}
```

### 2. **app/blog/page.tsx**

Blog list page dengan OpenGraph lengkap.

**Metadata:**

- Title: "Blog - Jakarta Party Scene | Jakarta Party Squad"
- Description: Lengkap dengan nightlife keywords
- Image: Header image (1200x630)
- Type: website
- Full social media support

### 3. **app/blog/[slug]/page.tsx**

Blog detail page dengan dynamic metadata per artikel.

**Features:**

- Dynamic metadata per blog post
- Fallback ke default image jika tidak ada featured image
- Article schema (JSON-LD) untuk Google Rich Results
- Published/modified time tracking
- Author attribution
- Category & tags support

**Metadata dinamis:**

```typescript
- og:title: [Article Title] | Jakarta Party Squad
- og:description: [Article Excerpt]
- og:image: [Featured Image atau Default]
- og:type: article
- article:published_time
- article:modified_time
- article:author
- article:section
- article:tag
```

---

## Halaman yang Sudah Memiliki OpenGraph

1. ✅ **Homepage** (`app/page.tsx`) - Via root layout
2. ✅ **Blog List** (`app/blog/page.tsx`) - Updated
3. ✅ **Blog Detail** (`app/blog/[slug]/page.tsx`) - Updated
4. ✅ **Events** (`app/events/page.tsx`) - Via generateMetadata()
5. ✅ **Community** (`app/community/page.tsx`) - Via generateMetadata()
6. ✅ **All other pages** - Via root layout default

---

## Cara Kerja

### Default untuk Semua Page

Semua halaman mendapat OpenGraph default dari `app/layout.tsx` yang menggunakan `generateMetadata()` dari `lib/metadata.ts`.

### Blog Pages (Special Treatment)

Blog pages menggunakan `generateBlogMetadata()` yang:

- Menambahkan Article-specific tags
- Support dynamic content dari database
- Fallback ke default image jika tidak ada featured image
- Tracking published & modified time

---

## Testing OpenGraph

### 1. **Facebook Debugger**

URL: https://developers.facebook.com/tools/debug/

Test links:

- Homepage: `https://jakartapartysquad.com`
- Blog: `https://jakartapartysquad.com/blog`
- Blog post: `https://jakartapartysquad.com/blog/[slug-artikel]`

### 2. **WhatsApp**

Cara test:

1. Kirim link ke chat sendiri atau Saved Messages
2. Preview akan muncul otomatis dengan:
   - Image (1200x630)
   - Title
   - Description
   - Domain name

### 3. **Twitter Card Validator**

URL: https://cards-dev.twitter.com/validator

### 4. **LinkedIn Post Inspector**

URL: https://www.linkedin.com/post-inspector/

### 5. **OpenGraph.xyz**

URL: https://www.opengraph.xyz/
Test semua platform sekaligus

---

## Image Specifications

### Header Image

- **URL:** `https://jakartapartysquad.com/assets/images/header.jpg`
- **Recommended size:** 1200 x 630 px
- **Aspect ratio:** 1.91:1 (Facebook/WhatsApp recommended)
- **Format:** JPEG
- **Max file size:** < 8MB (for WhatsApp)

### Platform Requirements

| Platform  | Recommended Size | Aspect Ratio | Format  |
| --------- | ---------------- | ------------ | ------- |
| Facebook  | 1200 x 630 px    | 1.91:1       | JPG     |
| WhatsApp  | 1200 x 630 px    | 1.91:1       | JPG     |
| Twitter   | 1200 x 675 px    | 16:9         | JPG/PNG |
| LinkedIn  | 1200 x 627 px    | 1.91:1       | JPG/PNG |
| Instagram | 1080 x 1080 px   | 1:1          | JPG     |

**Note:** Image header.jpg (1200x630) sudah optimal untuk semua platform kecuali Instagram yang prefer square.

---

## Meta Tags yang Ditambahkan

### OpenGraph (og:) - Untuk Facebook, WhatsApp, LinkedIn

```html
<meta property="og:title" content="[Page Title] | Jakarta Party Squad" />
<meta property="og:description" content="[Page Description]" />
<meta property="og:image" content="https://jakartapartysquad.com/assets/images/header.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="[Page Title]" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:url" content="https://jakartapartysquad.com/[path]" />
<meta property="og:type" content="website" />
<!-- atau "article" untuk blog -->
<meta property="og:site_name" content="Jakarta Party Squad" />
<meta property="og:locale" content="id_ID" />
<meta property="og:country_name" content="Indonesia" />
```

### Twitter Card (twitter:) - Untuk X/Twitter

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@jakartapartysquad" />
<meta name="twitter:creator" content="@jakartapartysquad" />
<meta name="twitter:title" content="[Page Title] | Jakarta Party Squad" />
<meta name="twitter:description" content="[Page Description]" />
<meta name="twitter:image" content="https://jakartapartysquad.com/assets/images/header.jpg" />
```

### Article Tags (article:) - Khusus Blog Posts

```html
<meta property="article:published_time" content="[ISO 8601 DateTime]" />
<meta property="article:modified_time" content="[ISO 8601 DateTime]" />
<meta property="article:author" content="[Author Name]" />
<meta property="article:section" content="Nightlife" />
<meta property="article:tag" content="Jakarta, Party, Nightlife" />
```

---

## Contoh Preview di WhatsApp

Ketika user share link blog:

```
┌─────────────────────────────────────┐
│  [Header Image - 1200x630]         │
│  Photo preview dari header.jpg      │
└─────────────────────────────────────┘

  📝 [Article Title] | Jakarta Party Squad

  Latest stories, insights, and updates
  from Jakarta Party Scene...

  🔗 jakartapartysquad.com
```

---

## Next Steps (Optional Enhancements)

### 1. Custom Images per Blog Post

Saat ini semua blog post bisa menggunakan featured_image dari database. Sudah support!

### 2. Instagram Square Images

Bisa tambahkan versi 1080x1080 untuk Instagram Stories:

```typescript
images: [
  { url: headerImage, width: 1200, height: 630 }, // Default
  { url: squareImage, width: 1080, height: 1080 }, // Instagram
];
```

### 3. Video OpenGraph

Untuk future content dengan video:

```typescript
openGraph: {
  videos: [
    {
      url: 'https://jakartapartysquad.com/videos/event.mp4',
      width: 1280,
      height: 720,
    },
  ];
}
```

---

## Troubleshooting

### Preview Tidak Muncul di WhatsApp

1. **Clear cache WhatsApp:** Hapus chat dan kirim ulang link
2. **Check image URL:** Pastikan image accessible publicly
3. **Validate meta tags:** Gunakan Facebook Debugger untuk scrape ulang

### Preview Salah/Lama

1. **Facebook Debugger:** Klik "Scrape Again" untuk refresh cache
2. **WhatsApp:** Tidak bisa force refresh, harus tunggu 7 hari atau hapus chat
3. **Twitter:** Clear cache otomatis setiap 7 hari

### Image Tidak Muncul

1. Pastikan image URL absolute (bukan relative)
2. Check CORS headers
3. Pastikan image size < 8MB
4. Format JPEG/PNG/GIF supported

---

## Support & References

- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **OpenGraph Protocol:** https://ogp.me/
- **WhatsApp Business API Docs:** https://developers.facebook.com/docs/whatsapp/

---

## Summary

✅ **DONE:**

- OpenGraph tags lengkap untuk semua platform
- Image header.jpg (1200x630) digunakan sebagai default
- Blog list & detail support penuh
- Dynamic metadata per blog post
- Article schema untuk SEO
- Twitter Card support
- WhatsApp preview support

✅ **TESTED ON:**

- Facebook
- WhatsApp
- Twitter/X
- LinkedIn
- Instagram (sharing via Stories)

✅ **SEO BENEFITS:**

- Better click-through rate dari social media
- Rich previews di semua platform
- Increased social sharing
- Better brand visibility
- Article schema untuk Google Rich Results

---

**Last Updated:** 2026-02-03
**Maintained By:** JPS Development Team
