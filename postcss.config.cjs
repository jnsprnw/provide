const autoprefixer = require('autoprefixer');
const extend = require('postcss-extend');
const nested = require('postcss-nested');
const customMedia = require('postcss-custom-media');
const each = require('postcss-each');
const tailwind = require('tailwindcss');

const config = {
  parser: 'postcss-scss',
  plugins: [nested, extend, customMedia, each, tailwind, autoprefixer],
};

module.exports = config;
