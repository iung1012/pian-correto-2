/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        'helvetica-bold': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'brush': ['Brush Script MT', 'cursive'],
      },
      colors: {
        // Paleta personalizada PIAN
        pian: {
          yellow: '#FDD528',
          'yellow-dark': '#FCC02A',
          white: '#FFFFFF',
          red: '#C4080A',
          black: '#0E1813',
        },
        yellow: {
          50: '#fffef0',
          100: '#fffce0',
          200: '#fff9c2',
          300: '#fff394',
          400: '#ffeb5c',
          500: '#FDD528',
          600: '#FCC02A',
          700: '#e6a820',
          800: '#cc9518',
          900: '#b8851a',
        }
      }
    },
  },
  plugins: [],
};
