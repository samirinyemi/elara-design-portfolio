/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aeonik', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        accent: '#2d5f8a',
        dark: '#111',
        light: '#F4F4F0',
        cream: '#EFEFEA',
        muted: '#E5E5DF',
      },
    },
  },
  plugins: [],
}
