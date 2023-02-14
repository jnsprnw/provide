#!/bin/bash

# token-transformer params:
# input
# output
# included sets
# "silently" included sets (available during processing for resolving references, but not part of output)

# process global tokens
token-transformer \
00_input/figma-tokens.json \
01_intermediate/global.json \
global,config,_palettes,typographyTokens,typographySizes,_pageStyles,sizeLarge \
_palettes # _palettes are not part of output
# TODO: page styles should have separate build stream

# typography
token-transformer \
--resolveReferences=false \
00_input/figma-tokens.json \
01_intermediate/typography-styles-dynamic.json \
global,config,typographyTokens,typographySizes,typographyStyles,sizeLarge,_pageStyles \

# dark theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/theme-dark.json \
_palettes,themeDark \
_palettes

# light theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/theme-light.json \
_palettes,themeLight \
_palettes

# large theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/size-large.json \
config,typographyStyles,typographyTokens,typographySizes,global,sizeLarge \
config,global,typographyTokens

# small theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/size-small.json \
config,typographyStyles,typographyTokens,typographySizes,global,sizeSmall \
config,global,typographyTokens

# wrap large theme in theme name
cat ./01_intermediate/size-large.json \
| jq '{"size":{"large": .size}}' \
> ./01_intermediate/namespaced-size-large.json

# wrap small theme in theme name
cat ./01_intermediate/size-small.json \
| jq '{"size":{"small": .size}}' \
> ./01_intermediate/namespaced-size-small.json

# wrap large theme in theme name
cat ./01_intermediate/theme-dark.json \
| jq '{"color":{"dark": .color}}' \
> ./01_intermediate/namespaced-theme-dark.json

# wrap small theme in theme name
cat ./01_intermediate/theme-light.json \
| jq '{"color":{"light": .color}}' \
> ./01_intermediate/namespaced-theme-light.json

# wrap small theme in theme name
cp ./01_intermediate/typography-styles-dynamic.json ./01_intermediate/namespaced-typography.json
