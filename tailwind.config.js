/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FCEFDF',
        text: {
          500: '#333333',
        },
        red: {
          300: '#FF725E',
          400: '#FF725E',
          500: '#C04B46',
        },
      },
    },
  },
  plugins: [],
};
