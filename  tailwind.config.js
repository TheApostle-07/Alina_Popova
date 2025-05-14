/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: { sans: ['Poppins','sans-serif'] },
        colors: {
          richblack:    '#00171F',  // <- Add this
          cerulean:     '#007EA7',
          'cerulean-light': '#4AB3E8',
          softgray:     '#F2F4F6',  // <- And this
        },
      },
    },
    plugins: [],
  };