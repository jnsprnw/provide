const autoprefixer = require("autoprefixer");
const extend = require("postcss-extend");
const nested = require("postcss-nested");
const customMedia = require("postcss-custom-media");
const each = require("postcss-each");

const config = {
	plugins: [autoprefixer, extend, nested, customMedia, each],
};

module.exports = config;
