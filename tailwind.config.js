/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PlusJakartaSans'],
      },
      colors: {
        charcoal: '#0F172A',
        green: '#0F9F59',
        gray: '#475569',
      },
    },
  },
  plugins: [],
};
