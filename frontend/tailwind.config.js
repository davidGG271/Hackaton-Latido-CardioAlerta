/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        latido: {
          blue: {
            light: '#F4F7FB',
            medium: '#EBF2F8',
            dark: '#0F1B36',
            accent: '#2563EB',
            pastel: '#E0F2FE' // for the blue icon background
          },
          red: {
            main: '#E63956',
            pastel: '#FDE8EC' // for the pink/red icon background
          },
          green: {
            pastel: '#DCFCE7'
          },
          gray: {
            medium: '#6B7280',
            light: '#9CA3AF',
            border: '#E5E7EB',
            text: '#374151'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
