/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    // Mobile-first breakpoints
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.125rem' }],      // 12px / 18px
      sm: ['0.875rem', { lineHeight: '1.375rem' }],     // 14px / 22px
      base: ['1rem', { lineHeight: '1.625rem' }],       // 16px / 26px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],      // 18px / 28px
      xl: ['1.25rem', { lineHeight: '1.875rem' }],      // 20px / 30px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px / 32px
      '3xl': ['1.875rem', { lineHeight: '2.375rem' }],  // 30px / 38px
      '4xl': ['2.25rem', { lineHeight: '2.75rem' }],    // 36px / 44px
      '5xl': ['3rem', { lineHeight: '3.5rem' }],        // 48px / 56px
      '6xl': ['3.75rem', { lineHeight: '4.25rem' }],    // 60px / 68px
      '7xl': ['4.5rem', { lineHeight: '5rem' }],        // 72px / 80px
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ec4755',
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d5',
          300: '#f7aab2',
          400: '#f27a89',
          500: '#ec4755',
          600: '#d92d3e',
          700: '#b61f2f',
          800: '#971c2a',
          900: '#811b28',
        },
        secondary: {
          DEFAULT: '#a12c34',
          50: '#faf5f5',
          100: '#f5e9ea',
          200: '#ead8da',
          300: '#d9b9bd',
          400: '#c3929a',
          500: '#a12c34',
          600: '#8f252d',
          700: '#771f26',
          800: '#631c23',
          900: '#541a21',
        },
        tertiary: {
          DEFAULT: '#99a0a3',
          50: '#f6f7f7',
          100: '#e2e4e5',
          200: '#c5c9cc',
          300: '#99a0a3',
          400: '#7a8487',
          500: '#626a6f',
          600: '#545b5f',
          700: '#484d51',
          800: '#3f4346',
          900: '#373a3d',
        },
        border: '#1a2e35',
        background: '#ffffff',
      },
      spacing: {
        // Mobile-optimized touch targets
        'touch': '44px',
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
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
};
