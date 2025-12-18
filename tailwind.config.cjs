/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7FAF7',
        surface: '#FFFFFF',
        text: {
          primary: '#0F1F14',
        },
        primary: {
          DEFAULT: '#1F6B3B',
          dark: '#16502C',
          light: '#3E8B57',
        },
        secondary: {
          DEFAULT: '#A8D5BA',
          accent: '#C97A4A',
        },
        divider: '#E3EDE3',
      },
      borderRadius: {
        lg: '16px',
      },
    },
  },
  plugins: [],
};