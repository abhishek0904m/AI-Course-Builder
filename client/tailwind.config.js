/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A1122',
        'bg-card': '#161F32',
        'bg-card-hover': '#1E293B',
        'accent': '#F59E0B',
        'accent-hover': '#D97706',
        'accent-secondary': '#10B981',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
        'border': '#1E293B',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
