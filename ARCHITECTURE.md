# Architecture Documentation

## Overview

This document explains the architectural decisions, mobile-first design principles, and SEO strategies implemented in the Jakarta Party Squad website.

## 1. Mobile-First Design Philosophy

### Why Mobile-First?

- **User Demographics**: Most users access from mobile devices (70%+)
- **Performance**: Mobile-first forces performance optimization
- **Accessibility**: Touch-friendly interfaces benefit all users
- **SEO**: Google's mobile-first indexing

### Implementation Strategy

#### Breakpoint Progression

```css
/* Base styles: Mobile (360px-640px) */
.button {
  @apply px-4 py-2 text-sm;
}

/* Tablet (768px+) */
@screen md {
  .button {
    @apply px-6 py-3 text-base;
  }
}

/* Desktop (1024px+) */
@screen lg {
  .button {
    @apply px-8 py-4 text-lg;
  }
}
```

#### Touch Targets

All interactive elements follow Apple Human Interface Guidelines and Material Design:

- **Minimum height**: 44px (iOS) / 48px (Android)
- **Spacing**: 8px minimum between targets
- **Feedback**: Visual feedback on tap (active states)

```typescript
// Example: Button component
const sizeStyles = {
  sm: 'min-h-[40px] px-4 py-2',
  md: 'min-h-[44px] px-6 py-3', // Default for mobile
  lg: 'min-h-[48px] px-8 py-4',
};
```

### Responsive Typography

Mobile-first font sizes that scale up:

```typescript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  // Progressive enhancement for larger screens
}
```

## 2. Multi-Page SEO Architecture

### Why Multi-Page vs Single-Page?

| Aspect         | Multi-Page            | Single-Page      |
| -------------- | --------------------- | ---------------- |
| SEO            | ✅ Excellent          | ❌ Limited       |
| Indexability   | ✅ Each page indexed  | ❌ One page only |
| Keywords       | ✅ Focused per page   | ❌ Diluted       |
| Load Time      | ✅ Fast initial load  | ❌ Large bundle  |
| Social Sharing | ✅ Unique OG per page | ❌ Generic       |

### Page Structure Strategy

#### 1. Homepage (`/`)

**Purpose**: Introduction and quick overview

**Primary Keywords**:

- Jakarta party squad
- Nightlife community Jakarta
- Clubbing jakarta

**Content Strategy**:

- Hero with main value proposition
- Quick about (2 cards)
- Featured partners (6 logos)
- Strong CTAs

**H1**: Jakarta Party Squad
**H2**: About Us, Featured Partners

#### 2. About Page (`/about`)

**Purpose**: Deep dive into story and team

**Primary Keywords**:

- About Jakarta Party Squad
- Party community founders
- Nightlife team Jakarta

**Content Strategy**:

- Complete story (2 detailed sections)
- Founder spotlight
- Full team grid (12 members)

**H1**: About Jakarta Party Squad
**H2**: Our Story, Founder Speech, Meet Our Team

#### 3. Community Page (`/community`)

**Purpose**: Benefits and join flow

**Primary Keywords**:

- Join Jakarta Party Squad
- Nightlife community benefits
- Clubbing membership Jakarta

**Content Strategy**:

- 4 key benefits with icons
- How to join (3 steps)
- CTA to WhatsApp community

**H1**: Join Our Community
**H2**: Benefits for Members, How to Get Started

#### 4. Partners Page (`/partners`)

**Purpose**: Showcase collaborations

**Primary Keywords**:

- Jakarta Party Squad partners
- Nightclub partnerships
- Event collaboration Jakarta

**Content Strategy**:

- All 9 partner logos with links
- Partnership description
- Partnership inquiry CTA

**H1**: Our Partners & Collaborations
**H2**: Interested in Partnership?

#### 5. Gallery Page (`/gallery`)

**Purpose**: Visual content showcase

**Primary Keywords**:

- Jakarta party photos
- Nightlife gallery
- Event photos Jakarta

**Content Strategy**:

- 4 featured albums
- 11 recent event photos
- Instagram CTA

**H1**: Event Gallery
**H2**: Photo Albums & Moments, Event Highlights

#### 6. Contact Page (`/contact`)

**Purpose**: Communication channels

**Primary Keywords**:

- Contact Jakarta Party Squad
- Partnership inquiry
- Get in touch

**Content Strategy**:

- 4 contact methods (Instagram, TikTok, Discord, WhatsApp)
- Partnership opportunities
- Location information

**H1**: Get in Touch
**H2**: Partnership Opportunities, Where to Find Us

### Internal Linking Strategy

```
Homepage
├── → About (Learn More)
├── → Partners (View All)
└── → Community (Join Now)

About
└── → Community (Join CTA)

Community
├── → Contact (Partnership)
└── → Gallery (View Events)

Partners
├── → Contact (Partnership)
└── → About (Learn More)

Gallery
└── → Community (Join)

Contact
└── → Partners (Partnerships)
```

## 3. SOLID Principles in React

### Single Responsibility Principle (SRP)

**Rule**: One component = One responsibility

#### Example: Separation of Concerns

```typescript
// ❌ BAD: Multiple responsibilities
function HeroSection() {
  // Fetches data
  const data = useSiteConfig();

  // Handles navigation
  const navigate = useNavigate();

  // Renders UI
  return <div>...</div>;
}

// ✅ GOOD: Single responsibility per component
function Hero({ data }) {
  return <div>...</div>;  // Only renders
}

// Data fetching separated
function HomePage() {
  const data = useSiteConfig();  // Only fetches
  return <Hero data={data} />;
}
```

### Open/Closed Principle (OCP)

**Rule**: Open for extension, closed for modification

#### Example: Variant-Based Extension

```typescript
// Component is closed for modification
function Button({ variant, ...props }) {
  const styles = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    outline: 'border-2 border-primary text-primary',
    // Easy to add new variants without modifying existing code
  };

  return <button className={styles[variant]} {...props} />;
}
```

### Liskov Substitution Principle (LSP)

**Rule**: Derived components should be substitutable

#### Example: Consistent Interfaces

```typescript
// All heading levels are substitutable
<Heading level={1}>Title</Heading>
<Heading level={2}>Subtitle</Heading>
<Heading level={3}>Section</Heading>

// All text sizes are substitutable
<Text size="sm">Small text</Text>
<Text size="base">Normal text</Text>
<Text size="lg">Large text</Text>
```

### Interface Segregation Principle (ISP)

**Rule**: Small, focused interfaces

#### Example: Minimal Props

```typescript
// ❌ BAD: God interface
interface ComponentProps {
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
  onHover: () => void;
  className: string;
  style: CSSProperties;
  // Too many props!
}

// ✅ GOOD: Focused interfaces
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}
```

### Dependency Inversion Principle (DIP)

**Rule**: Depend on abstractions, not concretions

#### Example: Dependency Injection

```typescript
// ❌ BAD: Direct dependency
function Hero() {
  const data = configData.mainHero;  // Concrete dependency
  return <div>{data.title}</div>;
}

// ✅ GOOD: Dependency injection
function Hero({ data }: { data: HeroData }) {
  return <div>{data.title}</div>;
}

// Abstraction layer
function HomePage() {
  const data = siteConfig.mainHero;  // Injected
  return <Hero data={data} />;
}
```

## 4. Performance Optimization

### Server Components (Default)

```typescript
// Default: Server Component (no 'use client')
export default function AboutPage() {
  const { team } = siteConfig;  // Data fetched on server
  return <TeamGrid members={team.members} />;
}
```

### Client Components (When Needed)

```typescript
// Only when necessary: Client Component
'use client';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);  // Needs state
  return <Dialog open={isOpen}>...</Dialog>;
}
```

### Image Optimization

```typescript
<Image
  src="/assets/images/header.jpg"
  alt="Jakarta Party Squad"
  fill
  priority  // For above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"  // Responsive sizes
/>
```

### Code Splitting

```typescript
// Automatic route-based splitting with App Router
app / about / page.tsx; // Separate chunk
community / page.tsx; // Separate chunk
partners / page.tsx; // Separate chunk
```

## 5. SEO Implementation

### Metadata API (App Router)

```typescript
export const metadata: Metadata = {
  title: 'About Us | Jakarta Party Squad',
  description: '...',
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '...' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### Structured Data

```typescript
// Organization Schema
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jakarta Party Squad",
  "url": "https://jakartapartysquad.com",
  "logo": "...",
  "sameAs": [
    "https://www.instagram.com/jakartapartysquad",
    "https://www.tiktok.com/@jakarta_party_squad"
  ]
}
```

### Semantic HTML

```typescript
<article>
  <header>
    <h1>Main Title</h1>
    <p>Subtitle</p>
  </header>

  <section>
    <h2>Section Title</h2>
    <p>Content...</p>
  </section>

  <footer>
    <nav>...</nav>
  </footer>
</article>
```

## 6. Deployment Architecture

### Serverless (Vercel/Netlify)

```
User Request
    ↓
Edge Network (CDN)
    ↓
Serverless Function (SSR)
    ↓
Static Assets (Images, CSS, JS)
    ↓
Response
```

### Build Output

```
.next/
  ├── static/          # Static assets (hashed)
  ├── server/          # Server components
  └── cache/           # Build cache
```

## 7. Future Enhancements

### Progressive Web App (PWA)

- Add service worker
- Offline support
- Install prompt

### Internationalization (i18n)

- English version
- Bahasa Indonesia (current)

### Analytics

- Google Analytics 4
- Custom event tracking
- Conversion funnels

### CMS Integration

- Headless CMS (Sanity/Contentful)
- Admin panel for content
- Real-time updates

---

**Last Updated**: January 2026
**Version**: 2.0.0
