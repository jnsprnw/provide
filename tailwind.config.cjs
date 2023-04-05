const themeLight = require('./src/styles/theme/json/theme-light.json');
const plugin = require('tailwindcss/plugin');

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
      dashArray: {
        2: '2',
        '2-3': '2 3',
        '1.5-3': '1.5 3',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        '.text-anchor-start': {
          'text-anchor': 'start',
        },
        '.text-anchor-end': {
          'text-anchor': 'end',
        },
        '.text-anchor-middle': {
          'text-anchor': 'middle',
        },
      });

      matchUtilities(
        {
          'stroke-dasharray': (value) => ({ 'stroke-dasharray': value }),
        },
        { values: theme('dashArray') }
      );
    }),
  ],
};
