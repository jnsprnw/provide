# Figma-tokens-example (single theme)

This example illustrates how you can transform your tokens stored on Figma Tokens (with GitHub sync enabled) to be automatically transformed with token-transformer and Style Dictionary.

Change your tokens in `00_input/tokens.json` (either directly or with the Figma Tokens plugin in Figma). The GitHub action will automatically generate tokens to the `01_intermediate/` directory that can then be read by Style Dictionary, which will output tokens into `02_output/` to the formats you defined in `config.json`

# How to use the tokens in Figma

First, install the [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens).

- Option 1: Download [/00_input/figma-tokens.json](/00_input/figma-tokens.json) and import it in Figma Tokens plugin (bottom right of plugin panel: Load > File).
- Option 2: Set up automatic syncing with this repository: Settings > Token storage > Github
  <img width="527" alt="image" src="https://user-images.githubusercontent.com/216044/199942306-8f61354f-fc93-4f46-b6bd-69a1709150a0.png">
  (see https://docs.tokens.studio/sync/github for more details)
