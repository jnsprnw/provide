const StyleDictionary = require("style-dictionary").extend(
  "style-dict.config.json"
);

StyleDictionary.registerTransform({
  type: "value",
  transitive: false,
  name: "unit",
  matcher: (token) => {
    return true;
  },
  transformer: (token) => {
    const defaultUnits= {
      "sizing": "px",
      "spacing": "px",
      "fontSizes": "px",
      "letterSpacing": "em",
      "borderWidth": "px",
      "borderRadius": "px",
    }

    if (token.original.type === "letterSpacing") {
      return ((+token.original.value.replace("%", ""))/100)+"em";
    } else if (String(token.unit) == "undefined") {
      return (token.original.value + (defaultUnits[token.original.type] || ""));
    } else {
      return token.value + { pixel: "px", percent: "%" }[token.unit];
    }
  },
});

StyleDictionary.registerTransformGroup({
  name: "noop",
  transforms: [],
});

StyleDictionary.registerFormat({
  name: "noop",
  formatter: function ({ dictionary, platform, options, file }) {
    return JSON.stringify(dictionary.tokens, null, 2);
  },
});

StyleDictionary.buildAllPlatforms();
