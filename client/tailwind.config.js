/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F8FAFC',
        'bg-card': '#FFFFFF',
        'bg-card-hover': '#F1F5F9',
        'accent': '#F59E0B',
        'accent-hover': '#D97706',
        'accent-secondary': '#10B981',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'border': '#E2E8F0',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
