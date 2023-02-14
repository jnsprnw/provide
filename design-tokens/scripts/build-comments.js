const StyleDictionaryPackage = require("style-dictionary");

function getStyleDictionaryConfig() {
	return {
		source: [`01_intermediate/namespaced-*.json`],
		platforms: {
			comments: {
				transformGroup: "comments",
				buildPath: `02_output/json/`,
				files: [
					{
						destination: `comments.json`,
						format: "comments",
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
	parse: ({ filePath, contents }) => {
		return JSON.parse(contents.replaceAll('"description":', '"comment":'));
	},
});

function flattenObject(ob) {
	var toReturn = {};

	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;

		if (typeof ob[i] == "object" && ob[i] !== null) {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				toReturn[i + "." + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
}

StyleDictionaryPackage.registerTransformGroup({
	name: "comments",
	transforms: [],
});

StyleDictionaryPackage.registerFormat({
	name: "comments",
	formatter: function ({ dictionary, platform, options, file }) {
		const dict = flattenObject(dictionary.tokens);
		const result = Object.entries(dict)
			.filter(([key, value]) => key.includes("comment") && !key.includes(".original"))
			.map(([key, value]) => [key.replace(".comment", ""), value]);

		return JSON.stringify(Object.fromEntries(result), null, 2);
	},
});

// run build

console.log("Build started...");

console.log("\n==============================================");
console.log(`\nProcessing: [RAW]`);

StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildAllPlatforms();

console.log("\nEnd processing");
