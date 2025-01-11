/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        cardHover: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
      },
      colors: {
        facebook: '#1877f2',
        twitter: '#1da1f2',
        instagram: '#e4405f',
        whatsapp: '#25d366',
      },
      animation: {
        flip: 'flip 1s infinite',
        'bg-pos': 'bg-pos 0.3s ease-in-out both',
        overflow: 'overflow-toggle 0.7s',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'bg-pos': {
          '0%': { top: '100%' },
          '100%': { top: '0%' },
        },
        'overflow-toggle': {
          '0%': { overflow: 'hidden' },
          '100%': { overflow: 'visible' },
        },
      },
    },
  },
  plugins: [],
};
