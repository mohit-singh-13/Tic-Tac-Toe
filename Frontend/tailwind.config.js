/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'bg-image': "url('/gradient-bg.jpg')"
      },
      backgroundColor: {
        'bg-glass': "rgba(255, 255, 255, 0.15)"
      },
      borderColor: {
        'border-glass': "rgba(255, 255, 255, 0.15)"
      },
      borderWidth: {
        'border-glass': "1px"
      },
      screens: {
        'max-xs': { 'max': '450px' },
        'max-sm': { 'max': '639px' },
        'max-md': { 'max': '767px' },
        'max-lg': { 'max': '1023px' },
        'max-xl': { 'max': '1279px' },
      },
    },
  },
  plugins: [],
}

