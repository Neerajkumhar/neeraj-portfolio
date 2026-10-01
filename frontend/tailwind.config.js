/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAFAF9',
          raised: '#FFFFFF',
          sunken: '#F5F5F4',
        },
        ink: {
          DEFAULT: '#1A1A19',
          soft: '#57534E',
          faint: '#8A8580',
        },
        rule: {
          DEFAULT: '#E7E5E4',
          strong: '#D6D3D1',
        },
        accent: {
          DEFAULT: '#9A3412',
          hover: '#7C2D12',
          bright: '#EA580C',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        label: '0.08em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionDuration: {
        150: '150ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 150ms ease-out',
      },
    },
  },
  plugins: [],
};