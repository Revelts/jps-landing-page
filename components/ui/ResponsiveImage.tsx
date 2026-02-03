/**
 * ResponsiveImage Component
 * 
 * Optimized image component with:
 * - Automatic aspect ratio handling
 * - Responsive sizes
 * - Lazy loading
 * - Blur placeholder support
 * - Next.js Image optimization
 * 
 * @example
 * <ResponsiveImage 
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   aspectRatio="video"
 *   priority={false}
 * />
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | '4:3' | '3:2' | '21:9';
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill';
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = 'video',
  priority = false,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  objectFit = 'cover',
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL
}: ResponsiveImageProps) {
  const aspectClasses = {
    video: 'aspect-video',         // 16:9
    square: 'aspect-square',        // 1:1
    portrait: 'aspect-portrait',    // 3:4
    '4:3': 'aspect-[4/3]',         // 4:3
    '3:2': 'aspect-[3/2]',         // 3:2
    '21:9': 'aspect-[21/9]'        // Ultra-wide
  };
  
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        'rounded-[var(--radius-lg)]',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={objectFitClass[objectFit]}
        priority={priority}
        quality={quality}
        loading={priority ? 'eager' : loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}

/**
 * HeroImage - Optimized for hero sections
 */
interface HeroImageProps extends Omit<ResponsiveImageProps, 'sizes' | 'priority'> {
  overlay?: boolean;
  overlayOpacity?: number;
}

export function HeroImage({
  overlay = true,
  overlayOpacity = 0.4,
  ...props
}: HeroImageProps) {
  return (
    <div className="relative w-full h-full">
      <ResponsiveImage
        {...props}
        sizes="100vw"
        priority={true}
        quality={90}
        className={cn('w-full h-full', props.className)}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/40 to-bg-primary"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

/**
 * AvatarImage - Optimized for avatars/profile pictures
 */
interface AvatarImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarImage({
  src,
  alt,
  size = 'md',
  className
}: AvatarImageProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-full',
        'ring-2 ring-secondary/20',
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 96px, 128px"
        className="object-cover"
        quality={90}
      />
    </div>
  );
}

/**
 * GalleryImage - Optimized for image galleries
 */
interface GalleryImageProps extends Omit<ResponsiveImageProps, 'sizes'> {
  onClick?: () => void;
}

export function GalleryImage({
  onClick,
  ...props
}: GalleryImageProps) {
  return (
    <div 
      className={cn(
        'group cursor-pointer',
        onClick && 'hover:scale-105 transition-transform duration-300'
      )}
      onClick={onClick}
    >
      <ResponsiveImage
        {...props}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={cn(
          'transition-all duration-300',
          onClick && 'group-hover:shadow-glow',
          props.className
        )}
      />
    </div>
  );
}
