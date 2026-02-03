# 🚀 Responsive Design Quick Start Guide

## ✅ What's Already Implemented

Your responsive design system is now **production-ready** with these new utilities:

### 1️⃣ **Media Query Hook** (`hooks/useMediaQuery.ts`)

```typescript
import { useIsMobile, useIsDesktop, useBreakpoint } from '@/hooks/useMediaQuery';

function MyComponent() {
  const isMobile = useIsMobile();
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  return (
    <>
      {isMobile ? <MobileView /> : <DesktopView />}
    </>
  );
}
```

### 2️⃣ **Responsive Image Component** (`components/ui/ResponsiveImage.tsx`)

```typescript
import { ResponsiveImage, HeroImage, AvatarImage } from '@/components/ui/ResponsiveImage';

// Standard responsive image
<ResponsiveImage
  src="/path/to/image.jpg"
  alt="Description"
  aspectRatio="video"
  priority={false}
/>

// Hero section image with overlay
<HeroImage
  src="/hero.jpg"
  alt="Hero"
  overlay={true}
  overlayOpacity={0.4}
/>

// Avatar/Profile picture
<AvatarImage
  src="/avatar.jpg"
  alt="User"
  size="md"
/>
```

### 3️⃣ **Responsive Grid Layouts** (`components/ui/GridResponsive.tsx`)

```typescript
import { GridResponsive, GridHero, FlexCluster, Stack } from '@/components/ui/GridResponsive';

// Auto-responsive grid (no media queries needed!)
<GridResponsive minWidth={280} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</GridResponsive>

// Hero section grid (text + media)
<GridHero gap="xl">
  <div>
    <h1>Hero Title</h1>
    <p>Hero description</p>
  </div>
  <ResponsiveImage src="/hero.jpg" alt="Hero" />
</GridHero>

// Button group / tag cluster
<FlexCluster gap="sm" justify="center">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</FlexCluster>

// Vertical stack
<Stack gap="lg">
  <Card>Section 1</Card>
  <Card>Section 2</Card>
</Stack>
```

---

## 🎯 How to Use in Your Pages

### Example 1: Homepage Hero Section

```typescript
// app/page.tsx
import { Container } from '@/components/ui/Container';
import { GridHero } from '@/components/ui/GridResponsive';
import { HeroImage } from '@/components/ui/ResponsiveImage';

export default function HomePage() {
  return (
    <section className="section-padding">
      <Container>
        <GridHero gap="xl">
          {/* Content side */}
          <div className="stack-component">
            <h1 className="text-display gradient-text">
              Welcome to Jakarta Party Squad
            </h1>
            <p className="text-body-optimized">
              Experience the best nightlife in Jakarta
            </p>
            <FlexCluster gap="md">
              <Button size="lg">Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </FlexCluster>
          </div>

          {/* Image side */}
          <HeroImage
            src="/assets/images/header.jpg"
            alt="Party atmosphere"
            aspectRatio="video"
          />
        </GridHero>
      </Container>
    </section>
  );
}
```

### Example 2: Card Grid (Auto-Responsive)

```typescript
// app/events/page.tsx
import { GridResponsive } from '@/components/ui/GridResponsive';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Card } from '@/components/ui/Card';

export default function EventsPage() {
  return (
    <Container>
      <GridResponsive minWidth={320} gap="xl">
        {events.map((event) => (
          <Card key={event.id} hoverable>
            <ResponsiveImage
              src={event.image}
              alt={event.title}
              aspectRatio="4:3"
            />
            <div className="stack-sm mt-4">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <Button fullWidth>Learn More</Button>
            </div>
          </Card>
        ))}
      </GridResponsive>
    </Container>
  );
}
```

### Example 3: Conditional Rendering (Mobile vs Desktop)

```typescript
// components/layout/Navigation.tsx
import { useIsMobile } from '@/hooks/useMediaQuery';

export function Navigation() {
  const isMobile = useIsMobile();

  return (
    <nav>
      {isMobile ? (
        <MobileMenu /> // Optimized for touch
      ) : (
        <DesktopMenu /> // Optimized for hover
      )}
    </nav>
  );
}
```

---

## 📱 Mobile-First Best Practices

### 1. Touch Targets (Already Implemented ✅)

All buttons automatically have 44px minimum height:

```typescript
<Button size="md">Touch-friendly</Button> // min-height: 44px
<Button size="lg">Extra comfortable</Button> // min-height: 48px
```

### 2. Fluid Typography (Already Implemented ✅)

Text automatically scales:

```typescript
<h1>This scales from 40px to 48px</h1>
<p className="text-body">This scales from 15px to 16px</p>
```

### 3. Responsive Spacing (Already Implemented ✅)

Use CSS variables for auto-scaling spacing:

```typescript
<div className="p-[var(--space-lg)]"> // 16px → 24px
<div className="gap-[var(--space-md)]"> // 12px → 16px
```

### 4. Prevent Horizontal Scroll (Already Implemented ✅)

All images and media automatically respect containers.

---

## 🎨 CSS Utilities You Can Use Now

### Typography Classes

```css
.text-display       /* Hero titles */
.text-heading       /* Section headings */
.text-subheading    /* Subsections */
.text-body          /* Body text */
.text-caption       /* Small text */
.text-body-optimized /* Enhanced readability */
```

### Layout Classes

```css
.container-fluid       /* Standard container */
.container-fluid-sm    /* Narrow container */
.container-fluid-lg    /* Wide container */
.content-container     /* For text-heavy content (optimal line length) */
```

### Spacing Classes

```css
.section-padding       /* Section vertical spacing */
.section-padding-sm    /* Smaller section spacing */
.section-padding-lg    /* Larger section spacing */

.stack-sm              /* Vertical spacing (small) */
.stack                 /* Vertical spacing (medium) */
.stack-lg              /* Vertical spacing (large) */

.gap-fluid-sm          /* Flex/grid gap (small) */
.gap-fluid             /* Flex/grid gap (medium) */
.gap-fluid-lg          /* Flex/grid gap (large) */
```

### Grid Classes

```css
.grid-auto-fit         /* Auto-responsive grid */
.grid-auto-fit-sm      /* Smaller grid items */
.grid-auto-fit-lg      /* Larger grid items */
```

---

## ⚡ Performance Features

### 1. Reduced Motion Support (Already Implemented ✅)

Users with `prefers-reduced-motion` automatically get:

- No animations
- No expensive backdrop-blur effects
- Solid backgrounds instead of glassmorphism

### 2. Image Optimization (Now Available ✅)

```typescript
// Lazy load images
<ResponsiveImage src="..." loading="lazy" />

// Priority load (above fold)
<ResponsiveImage src="..." priority={true} />

// Blur placeholder
<ResponsiveImage
  src="..."
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### 3. Conditional Rendering (Now Available ✅)

```typescript
const isMobile = useIsMobile();

// Only render heavy components when needed
{!isMobile && <ExpensiveDesktopComponent />}
```

---

## 🧪 Testing Checklist

### Device Sizes to Test

- [ ] **320px** - iPhone SE (oldest common)
- [ ] **375px** - iPhone 12/13
- [ ] **390px** - iPhone 14/15
- [ ] **768px** - iPad
- [ ] **1024px** - iPad Pro / Small laptop
- [ ] **1280px** - Desktop
- [ ] **1920px** - Large desktop

### Test in Dev Tools

```bash
1. Open Chrome DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Test different screen sizes
4. Check for:
   - Horizontal scroll (should be NONE)
   - Text readability
   - Touch target sizes (44px minimum)
   - Image loading
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This:

```typescript
// Hard-coded sizes
<div className="w-[400px]">...</div>

// Pixel-based spacing
<div className="mt-8">...</div>

// Desktop-only interactions
<div onHover={...}>...</div>
```

### ✅ Do This Instead:

```typescript
// Fluid sizes
<div className="w-full max-w-container">...</div>

// Fluid spacing
<div className="mt-[var(--space-lg)]">...</div>

// Touch-friendly interactions
<button onClick={...}>...</button>
```

---

## 📚 Next Steps

1. **Review** the full enhancement plan: `RESPONSIVE_ENHANCEMENT_PLAN.md`
2. **Test** your pages with new utilities
3. **Migrate** existing components gradually
4. **Monitor** performance with Lighthouse

---

## 🎉 You're Ready!

Your responsive design system is now:

- ✅ Fluid typography
- ✅ Auto-responsive grids
- ✅ Touch-friendly
- ✅ Performance-optimized
- ✅ Accessible
- ✅ Production-ready

**Happy coding!** 🚀
