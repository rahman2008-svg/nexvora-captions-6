import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FBF9F6',
        ink: '#1B1A17',
        moss: {
          50: '#F1F5EE',
          100: '#DEE9D6',
          200: '#BFD4AE',
          300: '#9BBD84',
          400: '#7AA562',
          500: '#5C8B47',
          600: '#476E37',
          700: '#38562C',
          800: '#2A4021',
          900: '#1D2C17',
        },
        clay: {
          50: '#FBF1EC',
          100: '#F4DACB',
          200: '#E8B79B',
          300: '#DB9270',
          400: '#CC7148',
          500: '#B6592F',
          600: '#924623',
          700: '#6E351C',
        },
        dusk: {
          50: '#F1EFF6',
          100: '#DAD5E9',
          800: '#20202D',
          900: '#131319',
          950: '#0C0C10',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        pill: '999px',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
