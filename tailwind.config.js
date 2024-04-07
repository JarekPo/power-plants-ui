/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        veryDarkGreen: '#172D13',
        paleGreen: '#5C6E58',
        lightBlue: '#00A9D8',
        sandYellow: '#F2D349',
        darkOrange: '#FB9039',
      },
    },
  },
  plugins: [],
};
