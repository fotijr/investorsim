module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      opacity: {
        '98': '0.98',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
