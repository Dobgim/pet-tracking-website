/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#f97362',
          dark: '#e85a48',
          light: '#ffc9b9',
          light2: '#ffb3a5',
        },
        teal: {
          DEFAULT: '#0f766e',
          dark: '#0b4f4a',
          darkdeep: '#08332f',
          mid: '#14968b',
          tint: '#cfe3df',
          muted: '#9ccfc7',
        },
        cream: '#fff8f1',
        ink: '#17302d',
        soft: '#5d716e',
        line: '#e3ddd3',
        tint: '#fff8f1',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Nunito', 'system-ui', 'sans-serif'],
        fredoka: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 0 0 rgba(124, 243, 194, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(124, 243, 194, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(124, 243, 194, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.8s infinite',
        'float-slow': 'float 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

