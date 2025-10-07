/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1A2B42',
        'brand-blue': '#3B82F6',
        'brand-green': '#10B981',
        'brand-light-gray': '#F8F9FA',
        'brand-text': '#1F2937',
        'brand-text-secondary': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
