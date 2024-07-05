const fs = require('fs');
const _ = require('lodash');

const tokens = JSON.parse(
  fs.readFileSync('./00_input/color-tokens.json', 'utf-8')
);

const modes = Object.entries(tokens.modes).map(([id, name]) => ({ id, name }));

modes.forEach((mode) => {
  const tokensProcessed = tokens.variables.reduce((acc, variable) => {
    const value = variable.resolvedValuesByMode[mode.id];
    const rgbString = ['r', 'g', 'b', 'a']
      .map((key) =>
        Math.round(value.resolvedValue[key] * (key === 'a' ? 100 : 255))
      )
      .join(',');
    const color = `rgba(${rgbString})`;
    _.set(acc, variable.name.replace(/\//g, '.'), color);
    return acc;
  }, {});

  fs.writeFileSync(
    `../src/styles/color-tokens-${mode.name}.json`,
    JSON.stringify(tokensProcessed)
  );
});
