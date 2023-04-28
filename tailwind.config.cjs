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
        xl: '0 5px 23px -3px rgb(0 0 0 / 0.15), 0 2px 10px -4px rgb(0 0 0 / 0.1);',
      },
      borderWidth: {
        3: '3px',
      },
      strokeWidth: {
        default: '1',
        1: '1',
        3: '3',
        4: '4',
      },
      dashArray: {
        2: '2',
        '2-3': '2 3',
        '1.5-3': '1.5 3',
      },
      keyframes: {
        'defer-visibility': {
          '0%, 99%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        'defer-visibility': 'defer-visibility .5s',
      },
      width: {
        'screen-p': 'calc(100vw - 3rem)',
      },
    },
  },
  plugins: [
    require('@thoughtbot/tailwindcss-aria-attributes'),
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
        '.linejoin-round': {
          'stroke-linejoin': 'round',
        },
        '.linecap-round': {
          'stroke-linecap': 'round',
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
