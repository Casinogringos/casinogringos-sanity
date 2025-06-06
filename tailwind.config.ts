/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      green50: '#f0fdf4',
      green100: '#dcfce7',
      green500: '#22C55E',
      green600: '#16A34A',
      green200: '#bbf7d0',
      green700: '#15803d',
      green900: '#22543d',
      red600: '#DC2626',
      white: '#FFFFFF',
      red200: '#fecaca',
      red700: '#b91c1c',
      black: '#000000',
      slate50: '#f8fafc',
      slate100: '#F1F5F9',
      slate300: '#cbd5e1',
      gray50: '#f9fafb',
      gray100: '#F4F4F5',
      gray200: '#E4E4E7',
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      gray500: '#6b7280',
      gray600: '#4b5563',
      gray700: '#374151',
      blue50: '#eff6ff',
      blue100: '#dbeafe',
      blue400: '#60a5fa',
      blue500: '#3b82f6',
      blue600: '#2563eb',
      sky400: '#38bdf8',
      yellow400: '#fbbf24',
      slate200: '#e2e8f0',
      slate400: '#94a3b8',
      slate500: '#64748b',
      slate600: '#475569',
      slate700: '#334155',
      slate900: '#0f172a',
      zinc300: '#d4d4d8',
      zinc400: '#a1a1aa',
      indigo600: '#4f46e5',
    },
    extend: {
      transitionProperty: {
        mh: 'max-height',
      },
      colors: {
        success: '#0070f3',
        cyan: '#79FFE1',
        primary: '#fea49f',
        dark: '#090b3c',
        normal: '#222452',
        light: '#272960',
        darklight: '#111357',
        text: '#333',
        button: '#00852c',
        buttonHover: '#093',
        menu: '#0d3054',
        lightBlue: '#798bab',
        lightBlue2: '#7caef521',
        heading: '#333',
        hero: '#eff6ff',
      },
      backgroundImage: {
        'hero-image': "url('/casino-online.webp')",
      },
      container: {
        maxWidth: '1100px',
      },
      boxShadow: {
        '2xl': '0 4px 40px rgba(51,51,51,.1)',
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        jakarta: ['var(--font-jakarta)'],
      },
      spacing: {
        28: '7rem',
      },
      height: {
        100: '525px',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        xs3: '9px',
        xs2: '10px',
        xs: '12px',
        nav: '13px',
        '7xl': '3.25rem',
        '8xl': '6.25rem',
      },
      typography: {
        lg: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
              borderRadius: '12px',
            },
            strong: {
              fontWeight: '700',
            },
          },
        },
        DEFAULT: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
              borderRadius: '12px',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
