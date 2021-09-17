module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    safelist: ['float-right']
  },
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
