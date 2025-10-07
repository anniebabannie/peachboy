/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        brand: {
          DEFAULT: '#f59e0b',
          light: '#fcd34d',
          dark: '#b45309'
        }
      }
    },
  },
  plugins: [],
};
