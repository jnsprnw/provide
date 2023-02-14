const StyleDictionaryPackage = require("style-dictionary");

const transforms = {
	web: [
		"attribute/cti",
		"name/cti/kebab",
		"sizes/px", // 'sizes/rem',
		"color/css",
		"time/seconds",
		"shadow/shorthand",
	],
	js: ["attribute/cti", "name/cti/pascal", "color/hex"],
};

function getStyleDictionaryConfig() {
	return {
		source: [`01_intermediate/namespaced-*.json`],
		platforms: {
			// default css build

			json: {
				transformGroup: "js",
				buildPath: `02_output/json/`,
				transforms: transforms.js,
				files: [
					{
						destination: `tokens-complete.json`,
						format: "json/nested",
						options: {
							showFileHeader: false,
						},
					},
				],
			},

			noop: {
				transformGroup: "noop",
				buildPath: `02_output/json/`,
				files: [
					{
						destination: `raw_tokens-complete.json`,
						format: "noop",
					},
				],
			},
		},
	};
}

/*

  Custom transforms
 
*/

StyleDictionaryPackage.registerTransform({
	name: "sizes/px",
	type: "value",
	matcher: function (prop) {
		// You can be more specific here if you e.g. only want 'em' units for font sizes
		return [
			"fontSize",
			"fontSizes",
			"spacing",
			"borderRadius",
			"borderWidth",
			"sizing",
			"breakpoint",
			"space",
			"x",
			"y",
			"blur",
			"spread",
		].includes(prop.original.type);
	},
	transformer: function (prop) {
		return parseFloat(prop.original.value) + "px";
	},
});

StyleDictionaryPackage.registerTransform({
	name: "sizes/rem",
	type: "value",
	matcher: function (prop) {
		// You can be more specific here if you e.g. only want 'em' units for font sizes
		return [
			"fontSize",
			"fontSizes",
			"spacing",
			"borderRadius",
			"borderWidth",
			"sizing",
			"breakpoint",
			"space",
			"x",
			"y",
			"blur",
			"spread",
		].includes(prop.original.type);
	},
	transformer: function (prop) {
		return parseFloat(prop.original.value) / 16 + "rem";
	},
});

/**
 * Transform shadow shorthands for css variables
 */

/**
 * This currently works fine if every value uses an alias, but if any one of these use a raw value, it will not be transformed.
 */

function transformShadow(shadow) {
	const { x, y, blur, spread, color } = shadow;
	return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

StyleDictionaryPackage.registerTransform({
	name: "shadow/shorthand",
	type: "value",
	transitive: true,
	matcher: (token) => ["boxShadow"].includes(token.type),
	transformer: (token) => {
		return Array.isArray(token.original.value)
			? token.original.value.map((single) => transformShadow(single)).join(", ")
			: transformShadow(token.original.value);
	},
});

// transform description attributes into comments,
// see https://github.com/six7/figma-tokens/issues/499
StyleDictionaryPackage.registerParser({
	pattern: /\.json$/,
	parse: ({ filePath, contents }) => {
		return JSON.parse(contents.replaceAll('"description":', '"comment":'));
	},
});

StyleDictionaryPackage.registerTransformGroup({
	name: "noop",
	transforms: [],
});

StyleDictionaryPackage.registerFormat({
	name: "noop",
	formatter: function ({ dictionary, platform, options, file }) {
		return JSON.stringify(dictionary.tokens, null, 2);
	},
});

// run build

console.log("Build started...");

console.log("\n==============================================");
console.log(`\nProcessing: [RAW]`);

StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildAllPlatforms();

console.log("\nEnd processing");
