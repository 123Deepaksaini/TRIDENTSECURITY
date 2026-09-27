/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Bright Royal Blue
          600: '#2563eb', // Primary Core Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        pinkTheme: {
          50: '#fce8f0', // Beautiful Distinct Baby Pink
          100: '#fbcfe8', // Soft Baby Pink Tone
          200: '#f9a8d4', // Baby Pink Accent Border
          300: '#f472b6',
          400: '#ec4899',
          500: '#db2777',
          600: '#be185d',
          700: '#9d174d',
          800: '#831843',
          900: '#701a75',
          950: '#4a044e'
        },
        navy: {
          800: '#0f172a',
          900: '#090d16',
          950: '#04070f'
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'glow': '0 0 25px rgba(37, 99, 235, 0.35)',
        'glow-blue': '0 0 25px rgba(37, 99, 235, 0.4)',
        'glow-pink': '0 0 25px rgba(236, 72, 153, 0.3)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'card-light': '0 10px 30px -10px rgba(236, 72, 153, 0.08)'
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        'grid-pattern-light': "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)"
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
