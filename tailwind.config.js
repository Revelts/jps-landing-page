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
        // Premium Cyber-Punk Color Palette
        // Primary: Deep Blue (main brand color)
        primary: {
          DEFAULT: '#0A2463', // Deep Navy Blue
          50: '#E6EBF5',
          100: '#C2D0E8',
          200: '#9DB4DA',
          300: '#7897CD',
          400: '#537BC0',
          500: '#2E5FB3',
          600: '#1E4A8F',
          700: '#14356B',
          800: '#0A2463', // Main
          900: '#061740',
          950: '#030B20',
        },
        
        // Secondary: Light Blue (cyber accents)
        secondary: {
          DEFAULT: '#3BCEEF', // Bright Cyan Blue
          50: '#EDFBFE',
          100: '#D4F4FC',
          200: '#AEEDFA',
          300: '#88E6F8',
          400: '#62DFF6',
          500: '#3BCEEF', // Main
          600: '#1FB5E0',
          700: '#1790B5',
          800: '#106B8A',
          900: '#0A465F',
          950: '#052334',
        },
        
        // Accent: Soft Purple/Violet (premium accents)
        accent: {
          DEFAULT: '#A78BFA', // Soft Purple
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA', // Main
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        
        // Background: Dark Navy & Near-Black
        'bg-primary': '#030712',     // Near-black (Deepest)
        'bg-secondary': '#0F172A',   // Dark Navy
        'bg-tertiary': '#1E293B',    // Card backgrounds
        'bg-elevated': '#334155',    // Elevated elements
        
        // Surface colors for cards/panels
        surface: {
          DEFAULT: '#1E293B',
          dark: '#0F172A',
          light: '#334155',
        },
        
        // Glow colors (low opacity usage)
        glow: {
          blue: '#3BCEEF',
          purple: '#A78BFA',
          'blue-soft': 'rgba(59, 206, 239, 0.15)',
          'purple-soft': 'rgba(167, 139, 250, 0.15)',
        },
        
        // Text colors for dark mode
        'text-primary': '#F8FAFC',
        'text-secondary': '#CBD5E1',
        'text-tertiary': '#94A3B8',
        'text-muted': '#64748B',
        
        // Border colors
        'border-primary': '#1E293B',
        'border-secondary': '#334155',
        'border-glow': '#3BCEEF',
        
        // Legacy support (keeping for backwards compatibility)
        cyan: {
          DEFAULT: '#3BCEEF',
          50: '#EDFBFE',
          100: '#D4F4FC',
          200: '#AEEDFA',
          300: '#88E6F8',
          400: '#62DFF6',
          500: '#3BCEEF',
          600: '#1FB5E0',
          700: '#1790B5',
          800: '#106B8A',
          900: '#0A465F',
        },
        purple: {
          DEFAULT: '#A78BFA',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
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
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
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
        glowPulse: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(25px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      // Button transition durations
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      
      // Premium Box Shadows & Glows
      boxShadow: {
        // Button shadows
        'btn-hover': '0 4px 12px rgba(59, 206, 239, 0.3)',
        'btn-active': '0 2px 6px rgba(59, 206, 239, 0.3)',
        
        // Glow effects (cyber-punk accents)
        'glow-sm': '0 0 10px rgba(59, 206, 239, 0.3)',
        'glow': '0 0 20px rgba(59, 206, 239, 0.4)',
        'glow-lg': '0 0 30px rgba(59, 206, 239, 0.5)',
        'glow-purple-sm': '0 0 10px rgba(167, 139, 250, 0.3)',
        'glow-purple': '0 0 20px rgba(167, 139, 250, 0.4)',
        'glow-purple-lg': '0 0 30px rgba(167, 139, 250, 0.5)',
        
        // Premium card shadows
        'card-premium': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 48px rgba(59, 206, 239, 0.2)',
        
        // Glassmorphism depth
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      
      // Backdrop blur for glassmorphism
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
