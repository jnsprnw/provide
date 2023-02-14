const StyleDictionaryPackage = require("style-dictionary");

const transforms = {
	web: [
		"attribute/cti",
		"name/cti/kebab",
		"sizes/px", // 'sizes/rem',
		"color/css",
		"time/seconds",
		"shadow/shorthand",
		"color/string",
	],
	js: ["attribute/cti", "name/cti/pascal", "color/hex", "color/string"],
};

function getStyleDictionaryConfig(theme = "global") {
	return {
		source: [`01_intermediate/${theme}.json`],
		platforms: {
			// default css build
			css: {
				transformGroup: "web",
				buildPath: `02_output/css/`,
				transforms: transforms.web,
				files: [
					{
						destination: `${theme}.css`,
						format: "css/variables",
						options: {
							selector: `${theme === "global" ? ":root" : `:where(.${theme})`}`,
							showFileHeader: false,
							outputReferences: true,
						},
					},
				],
			},

			// default js es6 build
			js: {
				transformGroup: "js",
				buildPath: `02_output/js/`,
				transforms: transforms.js,
				files: [
					{
						destination: `${theme}.js`,
						format: "javascript/es6",
						options: {
							showFileHeader: false,
						},
					},
				],
			},

			json: {
				transformGroup: "js",
				buildPath: `02_output/json/`,
				transforms: transforms.js,
				files: [
					{
						destination: `${theme}.json`,
						format: "json/nested",
						options: {
							showFileHeader: false,
						},
					},
				],
			},

			// noop: {
			//   transformGroup: "noop",
			//   buildPath: `02_output/json/`,
			//   files: [
			//     {
			//       destination: `raw_${theme}.json`,
			//       format: "noop",
			//     },
			//   ],
			// },
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
	name: "color/string",
	type: "value",
	matcher: function (prop) {
		return ["string"].includes(prop.original.type);
	},
	transformer: function (prop) {
		console.log("color/string", prop);
		return prop.original.value;
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

["global", "theme-dark", "theme-light", "size-large", "size-small"].map(function (theme) {
	console.log("\n==============================================");
	console.log(`\nProcessing: [${theme}]`);

	StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});

console.log("\nEnd processing");
