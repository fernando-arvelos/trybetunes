/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        1: '1px',
        2: '2px',
        9: '9px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        65: '65px',
        80: '80px',
        128: '128px',
        105: '105px',
        187: '187px',
        400: '400px',
        450: '450px',
        750: '750px',
      },
      backgroundImage: {
        fundo: 'url(\'./img/fundo.png\')',
      },
    },
  },
  plugins: [],
};
