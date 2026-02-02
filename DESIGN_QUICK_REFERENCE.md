# 🎨 Quick Design Reference Guide

## Color Palette - Tailwind Classes

### Backgrounds

```tsx
bg - bg - primary; // #030712 - Deepest background
bg - bg - secondary; // #0F172A - Section backgrounds
bg - bg - tertiary; // #1E293B - Card backgrounds
bg - surface; // #1E293B - Same as tertiary
bg - surface / 30; // 30% opacity glassmorphism
bg - surface / 50; // 50% opacity glassmorphism
bg - surface / 70; // 70% opacity glassmorphism
```

### Text Colors

```tsx
text - text - primary; // #F8FAFC - Main text
text - text - secondary; // #CBD5E1 - Secondary text
text - text - tertiary; // #94A3B8 - Tertiary text
text - text - muted; // #64748B - Muted text
```

### Brand Colors

```tsx
// Primary (Deep Blue)
text - primary; // #0A2463
bg - primary; // #0A2463

// Secondary (Light Blue - Cyber accent)
text - secondary; // #3BCEEF
bg - secondary; // #3BCEEF
border - secondary; // #3BCEEF

// Accent (Soft Purple)
text - accent; // #A78BFA
bg - accent; // #A78BFA
```

### Borders

```tsx
border - secondary / 10; // Very subtle
border - secondary / 20; // Subtle
border - secondary / 30; // Medium
border - secondary / 40; // Strong
```

---

## Gradients

### Background Gradients

```tsx
// Blue to Purple
bg-gradient-to-r from-secondary to-accent

// Animated gradient background
bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20
animate-gradient-shift bg-[length:200%_200%]
```

### Text Gradients

```tsx
// Pre-made gradient text class
<h2 className="gradient-text">Heading</h2>

// Custom
<span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
  Text
</span>
```

---

## Glassmorphism

### Basic Glass

```tsx
<div className="glass p-6 rounded-xl">// bg-surface/50 + backdrop-blur + border</div>
```

### Strong Glass

```tsx
<div className="glass-strong p-6 rounded-xl">// bg-surface/70 + stronger blur</div>
```

### Light Glass

```tsx
<div className="glass-light p-6 rounded-xl">// bg-surface/30 + light blur</div>
```

### Custom Glassmorphism

```tsx
<div className="bg-surface/50 backdrop-blur-md border border-secondary/20">Content</div>
```

---

## Glow Effects

### Box Shadow Glows

```tsx
shadow - glow - sm; // Small glow
shadow - glow; // Medium glow
shadow - glow - lg; // Large glow

shadow - glow - purple - sm; // Purple small glow
shadow - glow - purple; // Purple medium glow
shadow - glow - purple - lg; // Purple large glow
```

### Hover Glows

```tsx
hover: shadow - glow;
hover: shadow - glow - lg;
```

### Text Glows

```tsx
<span className="glow-text-blue">Text</span>
<span className="glow-text-purple">Text</span>
```

---

## Buttons

### Primary (Gradient)

```tsx
<button className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-bg-primary font-semibold rounded-full hover:shadow-glow-lg transition-all duration-400 hover:-translate-y-0.5">
  Button
</button>
```

### Secondary (Glass)

```tsx
<button className="px-6 py-3 bg-surface/30 backdrop-blur-md text-text-primary border-2 border-secondary/30 rounded-full hover:bg-surface/50 hover:shadow-glow-sm transition-all duration-400">
  Button
</button>
```

### Outline

```tsx
<button className="px-6 py-3 bg-transparent text-secondary border-2 border-secondary/50 rounded-full hover:border-secondary hover:bg-secondary/10 hover:shadow-glow-sm transition-all duration-400">
  Button
</button>
```

### Use Component

```tsx
<Button variant="primary" size="lg">Primary</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="outline" size="lg">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

---

## Cards

### Glassmorphism Card

```tsx
<Card hoverable>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    <p>Content</p>
  </CardBody>
</Card>
```

### Elevated Card

```tsx
<Card variant="elevated" hoverable>
  Content
</Card>
```

### Custom Card

```tsx
<div className="bg-surface/50 backdrop-blur-md border border-secondary/20 rounded-xl p-6 hover:border-secondary/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
  Content
</div>
```

---

## Badges/Tags

### Cyber Badge

```tsx
<span className="badge-cyber">VIP</span>
<span className="badge-cyber">Limited</span>
<span className="badge-cyber">Exclusive</span>
```

### Custom Badge

```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border border-secondary bg-secondary/10 text-secondary">
  New
</span>
```

---

## Animations

### Fade In

```tsx
<div className="animate-fade-in">Content</div>
```

### Slide Up

```tsx
<div className="animate-slide-up">Content</div>
```

### Glow Pulse

```tsx
<div className="animate-glow-pulse bg-secondary/20 rounded-full blur-3xl">Glow Orb</div>
```

### Float

```tsx
<div className="animate-float">Floating Element</div>
```

### Gradient Shift

```tsx
<div className="animate-gradient-shift bg-gradient-to-br from-secondary/20 to-accent/20 bg-[length:200%_200%]">
  Animated Gradient
</div>
```

---

## Hover Effects

### Lift + Glow

```tsx
hover:-translate-y-1 hover:shadow-glow
```

### Scale + Glow

```tsx
hover:scale-105 hover:shadow-glow-lg
```

### Color Shift

```tsx
text-text-secondary hover:text-secondary
```

### Border Glow

```tsx
border border-secondary/20 hover:border-secondary/40
```

---

## Typography

### Headings

```tsx
<h1 className="text-text-primary tracking-wide">
  Main Heading
</h1>

<h2 className="gradient-text tracking-wide">
  Gradient Heading
</h2>
```

### Body Text

```tsx
<p className="text-text-secondary leading-relaxed">Body text</p>
```

### Emphasized Text

```tsx
<strong className="text-secondary">Highlighted</strong>
<strong className="text-accent">Important</strong>
<strong className="gradient-text">Premium</strong>
```

---

## Sections

### With Background

```tsx
<section className="relative overflow-hidden py-16">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />

  {/* Glow orbs */}
  <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" />

  {/* Content */}
  <Container className="relative z-10">Content</Container>
</section>
```

### Simple Section

```tsx
<Section className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary" />

  <div className="relative z-10">Content</div>
</Section>
```

---

## Common Patterns

### Premium Image Frame

```tsx
<div className="relative rounded-2xl overflow-hidden shadow-glass border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 hover:shadow-card-hover group">
  <Image src="..." alt="..." />
  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
</div>
```

### Stats Card

```tsx
<div className="p-4 rounded-lg bg-surface/30 backdrop-blur-sm border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group">
  <div className="text-3xl font-bold gradient-text group-hover:glow-text-blue">1,000+</div>
  <p className="text-text-tertiary text-sm">Members</p>
</div>
```

### Navigation Link

```tsx
<Link
  href="/path"
  className="text-text-secondary hover:text-secondary transition-all duration-300 hover:translate-x-1"
>
  Link Text
</Link>
```

### Icon Button

```tsx
<button className="p-2 rounded-md text-text-tertiary hover:text-secondary hover:bg-secondary/10 transition-all duration-300 hover:scale-110">
  <IconComponent />
</button>
```

---

## Responsive Utilities

### Container

```tsx
<Container>
  // Max-width container with fluid padding
</Container>

<Container size="sm">
  // Smaller container
</Container>
```

### Spacing

```tsx
py-[var(--section-spacing)]      // Fluid section spacing
px-[var(--container-padding)]    // Fluid horizontal padding
gap-[var(--space-lg)]            // Fluid gap
```

---

## Accessibility

### Focus States

```tsx
focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-bg-primary
```

### Touch Targets

```tsx
min-h-[44px] min-w-[44px]  // Minimum touch target
```

### ARIA Labels

```tsx
<button aria-label="Close menu">
  <XIcon />
</button>
```

---

## Pro Tips

### 1. Combine Effects

```tsx
// Glassmorphism + Glow + Lift
<div className="glass hover:shadow-glow hover:-translate-y-1 transition-all duration-500">
  Content
</div>
```

### 2. Layer Backgrounds

```tsx
// Multiple gradients for depth
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10" />
  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
  <div className="relative z-10">Content</div>
</div>
```

### 3. Staggered Animations

```tsx
// Different animation delays
<div className="animate-glow-pulse" />
<div className="animate-glow-pulse" style={{ animationDelay: '1s' }} />
<div className="animate-glow-pulse" style={{ animationDelay: '2s' }} />
```

### 4. Gradient Borders

```tsx
// Using background trick
<div className="bg-gradient-to-r from-secondary to-accent p-[2px] rounded-xl">
  <div className="bg-bg-tertiary rounded-xl p-6">Content with gradient border</div>
</div>
```

---

## 🎨 Color Reference Card

```
Primary (Deep Blue):    #0A2463  ████████
Secondary (Cyan):       #3BCEEF  ████████
Accent (Purple):        #A78BFA  ████████

Background (Near-Black): #030712 ████████
Surface (Dark Navy):     #0F172A ████████
Card (Slate):            #1E293B ████████

Text Primary:           #F8FAFC  ████████
Text Secondary:         #CBD5E1  ████████
Text Tertiary:          #94A3B8  ████████
```

---

**Quick Reference Complete! Copy and paste these patterns for consistent premium cyber-punk styling. 🚀**
