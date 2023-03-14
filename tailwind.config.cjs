const themeLight = require('./src/styles/theme/json/theme-light.json');

module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    fontFamily: {
      sans: ['Gudea', 'sans-serif'],
    },
    extend: {
      colors: {
        ...themeLight.color,
      },
    },
  },
  plugins: [],
};
