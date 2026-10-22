/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory:    '#F7F5F0',
        charcoal: '#24231F',
        muted:    '#77746D',
        divider:  '#DFDCD4',
        surface:  '#FEFEFE',
        accent:   '#8B3A3A',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
