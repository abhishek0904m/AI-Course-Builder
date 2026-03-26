/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F8F9FA',
        'bg-card': '#FFFFFF',
        'bg-card-hover': '#F3F4F6',
        'accent': '#6366F1',
        'accent-hover': '#4F46E5',
        'accent-secondary': '#10B981',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'border': '#E5E7EB',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
