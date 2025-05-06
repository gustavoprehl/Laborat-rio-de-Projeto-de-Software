/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royalIndigo: '#4B3F72',
        goldenAmber: '#F9A825',
        skyMist: '#E0F7FA',
        mintProgress: '#A3D9B1',
        slateGraphite: '#2E2E2E',
      },
      fontFamily: {
        sans: ['Open Sans', 'Inter', 'sans-serif'],
        title: ['Poppins', 'Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
