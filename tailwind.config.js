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
        DEFAULT: '#e5e7eb',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      backgroundImage: {
        'login': "url('/src/assets/images/background-login.svg')",
        's-port': "url('/src/assets/images/bg-sport.svg')",
        's-port-plain': "url('/src/assets/images/bg-sport-plain.svg')",
      },
      animation : {
        'bounce-custome'  : 'bounce 3s ease-in-out infinite',
        'waved'           : 'waved_border 8s ease-in-out infinite'
      },
      keyframes : {
        bounce : {
          '0%'    : { transform: 'translateY(0)' },
          '50%'   : { transform: 'translateY(-2.4rem)' },
          '100%'  : { transform: 'translateY(0)' }
        },
        'waved_border' : {
          '0%'  : { 'border-radius' : '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%' : { 'border-radius' : '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { 'border-radius' : '60% 40% 30% 70%/60% 30% 70% 40%' }
        }
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      'circle-of-love': ['Circle Of Love','sans-serif'],
      'bubblegum-sans': ['Bubblegum Sans','sans-serif'],
      'shaky-hand': ['Shaky Hand','sans-serif'],

    },
    fontSize: {
      'heading-05': ['1.875rem', { lineHeight: '2.375rem' }], // 30px font, 38px line-height
      'heading-04': ['2.25rem', { lineHeight: '2.75rem' }],   // 36px font, 44px line-height
      'heading-03': ['3rem', { lineHeight: '3.625rem' }],     // 48px font, 58px line-height
      'heading-02': ['3.75rem', { lineHeight: '4.5rem' }],    // 60px font, 72px line-height
      'heading-01': ['4.5rem', { lineHeight: '5.375rem' }],   // 72px font, 86px line-height
    
      'body-tiny': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px font, 14px line-height
      'body-small': ['0.75rem', { lineHeight: '1rem' }],      // 12px font, 16px line-height
      'body-base': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px font, 20px line-height
      'body-medium': ['1rem', { lineHeight: '1.5rem' }],      // 16px font, 24px line-height
      'body-large': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px font, 28px line-height
      'body-xl': ['1.25rem', { lineHeight: '1.875rem' }],     // 20px font, 30px line-height
      'body-2xl': ['1.5rem', { lineHeight: '2.25rem' }],      // 24px font, 36px line-height
      'body-3xl': ['1.75rem', { lineHeight: '2.625rem' }]     // 28px font, 42px line-height
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
        50: '#F5F3FF',
        DEFAULT: '#8B5CF6'
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
        50: '#FFF4E6',
        DEFAULT: '#FF9E2A'
      },
      sucess: {
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
