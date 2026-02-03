'use client';

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ 
  size = 'md', 
  text, 
  fullScreen = false,
  className = '' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Spinner */}
      <div
        className={`${sizeClasses[size]} border-secondary/30 border-t-secondary rounded-full animate-spin`}
      />
      
      {/* Loading text */}
      {text && (
        <p className={`${textSizes[size]} text-text-secondary font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/95 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}

// Skeleton loading components
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-48 bg-surface/50 rounded-t-xl" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-surface/50 rounded w-1/4" />
        <div className="h-6 bg-surface/50 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-surface/50 rounded" />
          <div className="h-4 bg-surface/50 rounded w-5/6" />
        </div>
        <div className="h-10 bg-surface/50 rounded w-32" />
      </div>
    </div>
  );
}

export function SkeletonText({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string;
}) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-surface/50 rounded ${
            i === lines - 1 ? 'w-4/5' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ 
  className = '',
  aspectRatio = 'aspect-video'
}: { 
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={`animate-pulse ${aspectRatio} bg-surface/50 rounded-xl ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-text-tertiary/30"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

// Page-level loading component
export function PageLoading({ 
  text = 'Loading...',
  size = 'lg'
}: { 
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size={size} text={text} />
    </div>
  );
}
