const StyleDictionaryPackage = require("style-dictionary");

function getStyleDictionaryConfig(theme = "dynamic") {
	return {
		source: [`./01_intermediate/typography-styles-${theme}.json`],
		platforms: {
			css: {
				buildPath: "./02_output/css/",
				files: [
					{
						destination: `typography-styles-${theme}.css`,
						format: "css/typographyClasses",
						selector: ":root",
						filter: (token) => token.type === "typography",
						options: {
							showFileHeader: false,
						},
					},
				],
			},
			// default js es6 build
			js: {
				transformGroup: "js",
				buildPath: `02_output/js/`,
				transforms: ["attribute/cti", "name/cti/pascal", "color/hex"],
				files: [
					{
						destination: `typography-styles-${theme}.js`,
						format: "javascript/es6",
						filter: (token) => token.type === "typography",
						options: {
							showFileHeader: false,
						},
					},
				],
			},
			json: {
				transformGroup: "js",
				buildPath: `02_output/json/`,
				transforms: ["attribute/cti", "name/cti/pascal", "color/hex"],
				files: [
					{
						destination: `typography-styles-${theme}.json`,
						format: "json/nested",
						filter: (token) => token.type === "typography",
						options: {
							showFileHeader: false,
						},
					},
				],
			},
		},
	};
}

const kebabize = (str) =>
	str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

function convertToVariableIfNeeded(value) {
	if (value.toString().startsWith("{") && value.toString().endsWith("}")) {
		return `var(--${kebabize(value.slice(1, -1).split(".").join("-"))})`;
	}
	return value;
}

/**
 * Format for css typography classes
 * This generates theme-independent css classes so we're fine with just using css variables here
 */

StyleDictionaryPackage.registerFormat({
	name: "css/typographyClasses",
	formatter: (dictionary, config) =>
		dictionary.allProperties
			.map(
				(prop) => `/*
  ${prop.name}
  ${prop.original.comment}
*/

.${kebabize(prop.path.join("-"))} {
  font-family: ${convertToVariableIfNeeded(prop.original.value.fontFamily)};
  font-size: ${convertToVariableIfNeeded(prop.original.value.fontSize)};
  font-weight: ${convertToVariableIfNeeded(prop.original.value.fontWeight)};
  line-height: ${convertToVariableIfNeeded(prop.original.value.lineHeight)};
  letter-spacing: ${convertToVariableIfNeeded(prop.original.value.letterSpacing)};
  text-transform: ${convertToVariableIfNeeded(prop.original.value.textCase)};
  text-decoration: ${convertToVariableIfNeeded(prop.original.value.textDecoration)};
}
`
			)
			.join("\n"),
});

// transform description attributes into comments,
// see https://github.com/six7/figma-tokens/issues/499
StyleDictionaryPackage.registerParser({
	pattern: /\.json$/,
	parse: ({ contents }) => {
		return JSON.parse(contents.replaceAll('"description"', '"comment"'));
	},
});

StyleDictionaryPackage.extend(getStyleDictionaryConfig("dynamic")).buildPlatform("css");

// ['large', 'small'].map(function (theme) {
//   console.log('\n==============================================');
//   console.log(`\nProcessing: [${theme}]`);
//   StyleDictionaryPackage.extend(
//     getStyleDictionaryConfig(theme)
//   ).buildAllPlatforms();
// });
