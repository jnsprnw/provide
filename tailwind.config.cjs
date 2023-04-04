const themeLight = require('./src/styles/theme/json/theme-light.json');

module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        ...themeLight.color,
      },
      boxShadow: {
        lg: '0 3px 15px -3px rgb(0 0 0 / 0.1), 0 1px 6px -4px rgb(0 0 0 / 0.1);',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
