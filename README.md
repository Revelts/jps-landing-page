# Jakarta Party Squad - Landing Page

A mobile-first, SEO-optimized, multi-page web application built with Next.js 14 App Router.

## 🎯 Project Overview

Jakarta Party Squad is a comprehensive web platform showcasing Indonesia's premier nightlife community. This application emphasizes:

- **Mobile-First Design**: Optimized for 360px-430px viewports with touch-friendly interfaces
- **Multi-Page Architecture**: SEO-focused page structure for better discoverability
- **SOLID Principles**: Clean, maintainable, and scalable codebase
- **Performance**: Optimized Core Web Vitals and serverless architecture

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Headless UI
- **Icons**: Heroicons 2.0
- **Animations**: Framer Motion
- **Deployment**: Serverless (Vercel/similar platforms)

### Folder Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── community/           # Community & benefits page
│   ├── partners/            # Partners page
│   ├── gallery/             # Gallery page
│   ├── contact/             # Contact page
│   ├── privacy/             # Privacy policy
│   └── terms/               # Terms of service
│
├── components/              # React components
│   ├── ui/                  # Base UI components (Button, Card, etc.)
│   ├── layout/              # Layout components (Header, Footer, etc.)
│   └── sections/            # Page sections (Hero, FeaturedPartners, etc.)
│
├── lib/                     # Utility functions and helpers
│   ├── config.ts            # Configuration loader
│   ├── metadata.ts          # SEO metadata generator
│   └── utils.ts             # Utility functions
│
├── types/                   # TypeScript type definitions
│   └── index.ts             # Global types
│
├── config/                  # Configuration files
│   └── index.json           # Site content and configuration
│
├── public/                  # Static assets
│   └── assets/              # Images and media
│
└── src/                     # Legacy source (deprecated)
    └── styles/              # Global styles
```

## 🎨 Design System

### Mobile-First Breakpoints

```typescript
'xs': '360px',   // Small phones
'sm': '640px',   // Large phones
'md': '768px',   // Tablets
'lg': '1024px',  // Desktops
'xl': '1280px',  // Large desktops
'2xl': '1536px', // Extra large screens
```

### Color Palette

```typescript
// Primary Red - Brand color
primary: {
  DEFAULT: '#ec4755',
  50: '#fef2f3',
  ...
  900: '#811b28',
}

// Secondary Dark Red
secondary: {
  DEFAULT: '#a12c34',
  ...
}

// Tertiary Gray
tertiary: {
  DEFAULT: '#99a0a3',
  ...
}
```

### Touch Targets

All interactive elements have a minimum touch target of **44px** (height) to ensure mobile usability.

## 🧩 SOLID Principles Implementation

### Single Responsibility Principle (SRP)

Each component has ONE clear responsibility:

```typescript
// ✅ Good: Single responsibility
<Button /> // Only handles button rendering
<Heading /> // Only handles heading display
<Section /> // Only handles section layout

// ❌ Bad: Multiple responsibilities
<HeaderWithNavigationAndUserMenu /> // Too many concerns
```

### Open/Closed Principle (OCP)

Components are extendable without modification through variants:

```typescript
<Button variant="primary" /> // Can extend with new variants
<Button variant="secondary" />
<Button variant="outline" />
```

### Liskov Substitution Principle (LSP)

Components with similar interfaces are interchangeable:

```typescript
// All text components share common props
<Text size="lg" />
<Heading level={1} />
```

### Interface Segregation Principle (ISP)

Components have focused, minimal prop interfaces:

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // No unnecessary props
}
```

### Dependency Inversion Principle (DIP)

Components depend on abstractions (hooks, utilities) not concrete implementations:

```typescript
// Uses utility functions, not direct implementations
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
```

## 🚀 SEO Optimization

### Page Structure

Each page has:

1. **Unique title and meta description**
2. **Proper heading hierarchy (H1 → H2 → H3)**
3. **Semantic HTML5 elements**
4. **Optimized images with next/image**
5. **Structured data (JSON-LD)**

### Metadata Example

```typescript
export const metadata: Metadata = genMeta({
  title: 'About Us - Our Story & Team',
  description: 'Learn about Jakarta Party Squad...',
  keywords: 'about jakarta party squad, team, founders...',
  canonical: '/about',
});
```

### Structured Data

- Organization Schema
- WebSite Schema
- Social Profile Links

## 📱 Mobile-First Features

### Navigation

- **Mobile**: Slide-out hamburger menu with smooth animations
- **Desktop**: Horizontal navigation bar

### Touch-Friendly UI

- Minimum 44px touch targets
- Proper spacing between interactive elements
- Easy thumb reach for primary actions

### Performance

- Lazy loading images
- Optimized font loading (Inter)
- Server components by default
- Minimal client-side JavaScript

## 🔧 Development

### Prerequisites

```bash
Node.js 22.x
npm 10.x
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "build-types": "tsc --noEmit --pretty"
}
```

## 📄 Pages Overview

### 1. Homepage (`/`)

- Hero section with CTAs
- Quick about overview
- Featured partners

**Primary Keywords**: Jakarta party squad, nightlife community, clubbing jakarta

### 2. About (`/about`)

- Full story and mission
- Founder speech
- Complete team profiles

**Primary Keywords**: about jakarta party squad, team, founders

### 3. Community (`/community`)

- Member benefits
- How to join
- Community value propositions

**Primary Keywords**: join community, nightlife benefits, clubbing community

### 4. Partners (`/partners`)

- All venue partnerships
- Collaboration details
- Partnership opportunities

**Primary Keywords**: venue partners, collaboration, event partners

### 5. Gallery (`/gallery`)

- Event photo albums
- Event highlights
- Community moments

**Primary Keywords**: event photos, party gallery, nightlife photos

### 6. Contact (`/contact`)

- Social media links
- Partnership inquiries
- Contact methods

**Primary Keywords**: contact, partnership inquiry, get in touch

## 🎯 Performance Targets

- **LCP**: < 2.5s
- **FID/INP**: < 100ms
- **CLS**: < 0.1
- **Mobile PageSpeed**: > 90
- **Desktop PageSpeed**: > 95

## 🌐 Deployment

### Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://jakartapartysquad.com
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📝 Content Management

Content is managed through `/config/index.json`:

```json
{
  "company": { ... },
  "navigation": [ ... ],
  "mainHero": { ... },
  "aboutus": { ... },
  "benefits": { ... },
  "partners": { ... },
  "albums": { ... },
  "team": { ... },
  "founderSpeech": { ... }
}
```

## 🔐 Security

- No API keys exposed
- HTTPS only
- Proper CORS configuration
- Input validation on forms

## 📊 Analytics

Integrated analytics tracking (placeholder for future implementation):

- Page views
- User interactions
- Conversion tracking
- Event participation

## 🤝 Contributing

1. Follow SOLID principles
2. Maintain mobile-first approach
3. Write TypeScript with strict mode
4. Use semantic HTML
5. Optimize for performance
6. Test on multiple devices

## 📞 Support

For questions or support:

- Instagram: [@jakartapartysquad](https://www.instagram.com/jakartapartysquad)
- TikTok: [@jakarta_party_squad](https://www.tiktok.com/@jakarta_party_squad)
- Discord: [Join Server](https://discord.gg/UshBBJkDS8)

## 📜 License

ISC License

---

**Built with ❤️ by Jakarta Party Squad**

_Party. Connect. Repeat._
