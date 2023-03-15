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
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
