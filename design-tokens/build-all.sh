#!/bin/bash

./build-prepare-tokens.sh

node ./scripts/build-base.js
node ./scripts/build-typography.js
node ./scripts/build-fluid-sizing.js
node ./scripts/build-raw.js
node ./scripts/build-comments.js

cp -R 02_output/* ../src/styles/theme/
