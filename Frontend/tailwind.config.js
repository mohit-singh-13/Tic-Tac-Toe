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
      }
    },
  },
  plugins: [],
}

