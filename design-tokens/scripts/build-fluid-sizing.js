const StyleDictionaryPackage = require("style-dictionary");

function getStyleDictionaryConfig(theme = "dynamic") {
	return {
		source: [`./01_intermediate/namespaced-size-*.json`],
		platforms: {
			css: {
				buildPath: "./02_output/css/",
				transforms: ["attribute/cti", "name/cti/kebab"],
				files: [
					{
						destination: `size-namespaced.css`,
						format: "css/variables",
						selector: ":root",
						options: {
							showFileHeader: false,
						},
					},
				],
			},
		},
	};
}

// transform description attributes into comments,
// see https://github.com/six7/figma-tokens/issues/499
StyleDictionaryPackage.registerParser({
	pattern: /\.json$/,
	parse: ({ contents }) => {
		return JSON.parse(contents.replaceAll('"description"', '"comment"'));
	},
});

StyleDictionaryPackage.extend(getStyleDictionaryConfig("dynamic")).buildPlatform("css");

console.log("\n==============================================");
console.log(`\nProcessing: [namespaced]`);
StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildAllPlatforms();
