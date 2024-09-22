/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/**/*.{js,ts,jsx,tsx,mdx, svg}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx,css,}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      opacity: {
        12: '0.12',
        4: '0.04'
      },
      borderColor: {
        default: '#1211271F'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    fontSize: {
      'heading-05': '1.875rem', // 30px
      'heading-04': '2.25rem', // 36px
      'heading-03': '3rem', // 48px
      'heading-02': '3.75rem', // 60px
      'heading-01': '4.5rem', // 72px

      'body-tiny': ['0.625rem', { lineHeight: '0.625rem' }], // 10px
      'body-small': ['0.75rem', { lineHeight: '0.85rem' }], // 12px
      'body-base': ['0.875rem', { lineHeight: '0.875rem' }], // 14px
      'body-medium': ['1rem', { lineHeight: '1rem' }], // 16px
      'body-large': ['1.125rem', { lineHeight: '1.125rem' }], // 18px
      'body-xl': ['1.25rem', { lineHeight: '1.25rem' }], // 20px
      'body-2xl': ['1.5rem', { lineHeight: '1.5rem' }], // 24px
      'body-3xl': ['1.75rem', { lineHeight: '1.75rem' }] // 28px
    },
    colors: {
      primary: {
        900: '#4C1D95',
        800: '#5B21B6',
        700: '#6D28D9',
        600: '#7C3AED',
        500: '#8B5CF6',
        400: '#A78BFA',
        300: '#C4B5FD',
        200: '#DDD6FE',
        100: '#EDE9FE',
        50: '#F5F3FF'
      },
      warning: {
        900: '#F25722',
        800: '#FC7125',
        700: '#FF8127',
        600: '#FF9129',
        500: '#FF9E2A',
        400: '#FFAC3D',
        300: '#FFBC5D',
        200: '#FFD89F',
        100: '#FFE7C7',
        50: '#FFF4E6'
      },
      success: {
        900: '#064E3B',
        800: '#065F46',
        700: '#047857',
        600: '#059669',
        500: '#10B981',
        400: '#34D3',
        300: '#6EE7B7',
        200: '#A7F3D0',
        100: '#D1FAE5',
        50: '#ECFDF5',
        DEFAULT: '#10B981'
      },
      error: {
        900: '#7F1D1D',
        800: '#991B1B',
        700: '#B91C1C',
        600: '#DC2626',
        500: '#EF4444',
        400: '#F87171',
        300: '#FCA5A5',
        200: '#FECACA',
        100: '#FEE2E2',
        50: '#FEF2F2',
        DEFAULT: '#EF4444'
      },
      indigo: {
        900: '#1E149D',
        800: '#2D2CB0',
        700: '#3638BC',
        600: '#3F43C8',
        500: '#444BD3',
        400: '#6068DB',
        300: '#878DE8',
        200: '#B4B7F0',
        100: '#DEE0FA',
        50: '#F2F3FF',
        DEFAULT: '#444BD3'
      },
      blue: {
        900: '#3E399B',
        800: '#4559BD',
        700: '#496AD0',
        600: '#4C7CE5',
        500: '#4E8AF4',
        400: '#599BF9',
        300: '#6EADFC',
        200: '#94C5FF',
        100: '#BDE3FF',
        50: '#E1F5FF',
        DEFAULT: '#4E8AF4'
      },
      cyan: {
        900: '#2A7576',
        800: '#339AA2',
        700: '#38AEBA',
        600: '#3EC4D5',
        500: '#43D6E8',
        400: '#4EDCEB',
        300: '#67E4EF',
        200: '#90ECF4',
        100: '#BBF3F7',
        50: '#E4FAFC',
        DEFAULT: '#43D6E8'
      },
      pink: {
        900: '#831843',
        800: '#9D174D',
        700: '#BE185D',
        600: '#DB2777',
        500: '#EC4899',
        400: '#F472B6',
        300: '#F9A8D4',
        200: '#FBCFE8',
        100: '#FCE7F3',
        50: '#FDF2F8',
        DEFAULT: '#EC4899'
      },
      gray: {
        900: '#121127',
        800: '#201F37',
        700: '#383751',
        600: '#4C4B63',
        500: '#6C6B80',
        400: '#9D9CAF',
        300: '#D1D1DB',
        200: '#E5E5EB',
        100: '#F3F3F6',
        50: '#F9F9FB',
        DEFAULT: '#6C6B80'
      },
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'transparent',
      background: '#F5F6FA',
      disabled: '#1211270A',
      text: '#070E25'
    }
  },
  plugins: []
}
