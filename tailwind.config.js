/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        square_path: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(40px, 0)' },
          '50%': { transform: 'translate(40px, 40px)' },
          '75%': { transform: 'translate(0, 40px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      },
      animation: {
        scrollX: 'scrollX 20s linear infinite',
        scrollX1: 'scrollX 15s linear infinite',
        square_spin: 'square_path 4s linear infinite',
      },
    },
  },
  plugins: [],
};
