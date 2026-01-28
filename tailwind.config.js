/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode via class strategy
  theme: {
    // Minimal breakpoints - enhancement only
    screens: {
      sm: '640px',   // Mobile landscape / Small tablets
      md: '768px',   // Tablets
      lg: '1024px',  // Laptop
      xl: '1280px',  // Desktop
      '2xl': '1536px', // Large screens
    },
    
    // Fluid typography using clamp()
    // Format: [min-size, preferred (viewport-based), max-size]
    fontSize: {
      // Caption / Small text
      'xs': 'clamp(0.6875rem, 0.6rem + 0.4vw, 0.75rem)',     // 11px → 12px
      'sm': 'clamp(0.8125rem, 0.75rem + 0.3vw, 0.875rem)',   // 13px → 14px
      
      // Body text
      'base': 'clamp(0.9375rem, 0.875rem + 0.3vw, 1rem)',    // 15px → 16px
      'lg': 'clamp(1.0625rem, 1rem + 0.3vw, 1.125rem)',      // 17px → 18px
      
      // Subheadings
      'xl': 'clamp(1.125rem, 1rem + 0.6vw, 1.25rem)',        // 18px → 20px
      '2xl': 'clamp(1.375rem, 1.25rem + 0.6vw, 1.5rem)',     // 22px → 24px
      
      // Headings
      '3xl': 'clamp(1.75rem, 1.5rem + 1.2vw, 1.875rem)',     // 28px → 30px
      '4xl': 'clamp(2rem, 1.75rem + 1.2vw, 2.25rem)',        // 32px → 36px
      '5xl': 'clamp(2.5rem, 2rem + 2.5vw, 3rem)',            // 40px → 48px
      
      // Display (Hero titles)
      '6xl': 'clamp(3rem, 2.5rem + 2.5vw, 3.75rem)',         // 48px → 60px
      '7xl': 'clamp(3.5rem, 3rem + 2.5vw, 4.5rem)',          // 56px → 72px
      '8xl': 'clamp(4rem, 3.5rem + 2.5vw, 6rem)',            // 64px → 96px
    },
    
    extend: {
      colors: {
        // Brand colors - Blue-Purple theme
        primary: {
          DEFAULT: '#6366f1', // Indigo-500
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          DEFAULT: '#8b5cf6', // Purple-500
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        
        // Modern Cyan (Primary Action Color)
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
          DEFAULT: '#06b6d4',
        },
        
        // Vibrant Purple (Secondary Accent)
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        
        // Semantic Button Colors
        'btn-primary': '#06b6d4',        // Bright cyan
        'btn-primary-hover': '#0891b2',  // Darker cyan
        'btn-primary-active': '#0e7490', // Even darker
        'btn-secondary': 'transparent',   // Transparent background
        'btn-disabled': '#737373',       // Neutral gray
        'btn-ring': '#22d3ee',           // Bright cyan ring
        
        // Dark Mode Backgrounds (Modern Charcoal/Slate)
        'dark-bg': {
          primary: '#0a0a0a',   // Deep charcoal
          secondary: '#1a1a1a', // Dark slate
          tertiary: '#262626',  // Card backgrounds
          elevated: '#333333',  // Elevated elements
        },
        
        // Light Mode Backgrounds
        'light-bg': {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
        },
        
        border: '#1a2e35',
        background: '#ffffff',
      },
      
      // Fluid spacing system using clamp()
      spacing: {
        // Extra small
        'xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',     // 4px → 8px
        
        // Small
        'sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',      // 8px → 12px
        
        // Medium
        'md': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',       // 12px → 16px
        
        // Large
        'lg': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',           // 16px → 24px
        
        // Extra large
        'xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',         // 24px → 32px
        
        // 2X large
        '2xl': 'clamp(2rem, 1.6rem + 2vw, 3rem)',            // 32px → 48px
        
        // 3X large
        '3xl': 'clamp(3rem, 2.4rem + 3vw, 4rem)',            // 48px → 64px
        
        // 4X large
        '4xl': 'clamp(4rem, 3.2rem + 4vw, 6rem)',            // 64px → 96px
        
        // Touch target (minimum 44px for accessibility)
        'touch': '44px',
        'touch-lg': '48px',
      },
      
      // Fluid max-width for containers
      maxWidth: {
        // Content containers
        'content-sm': 'clamp(20rem, 85vw, 42rem)',   // 320px → 672px
        'content': 'clamp(20rem, 90vw, 48rem)',      // 320px → 768px
        'content-lg': 'clamp(20rem, 90vw, 56rem)',   // 320px → 896px
        
        // Page containers
        'container-sm': 'clamp(20rem, 85vw, 64rem)', // 320px → 1024px
        'container': 'clamp(20rem, 90vw, 80rem)',    // 320px → 1280px
        'container-lg': 'clamp(20rem, 90vw, 96rem)', // 320px → 1536px
        
        // Wide containers
        'wide': 'clamp(20rem, 95vw, 120rem)',        // 320px → 1920px
      },
      
      // Line height scale (relative to font size)
      lineHeight: {
        'tight': '1.15',
        'snug': '1.3',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '1.75',
      },
      
      // Fluid border radius
      borderRadius: {
        'fluid-sm': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem)',  // 4px → 6px
        'fluid': 'clamp(0.375rem, 0.3rem + 0.4vw, 0.5rem)',       // 6px → 8px
        'fluid-md': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',     // 8px → 12px
        'fluid-lg': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',      // 12px → 16px
        'fluid-xl': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',          // 16px → 24px
      },
      
      // Fluid padding for inline elements
      padding: {
        'fluid-xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',
        'fluid-md': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Button transition durations
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      
      // Box shadow for elevated buttons (only on capable devices)
      boxShadow: {
        'btn-hover': '0 4px 12px rgba(2, 132, 199, 0.3)',
        'btn-active': '0 2px 6px rgba(2, 132, 199, 0.3)',
      },
    },
  },
  plugins: [],
};
