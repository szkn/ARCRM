/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arc-primary': {
        DEFAULT: '#3B82F6', // bg-blue-500 相当
        'dark': '#1E3A8A', // bg-blue-900 相当
        },
      },
    },
  },
  plugins: [],
}