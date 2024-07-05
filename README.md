# Provide project

## Links

Current **development** version 2.3 (on Provide Netlify):
[https://phase-2-3--hilarious-treacle-096169.netlify.app/explore/impacts](https://phase-2-3--hilarious-treacle-096169.netlify.app/explore/impacts)

Previous **development** version 2.0 (on Provide Netliy):
[https://phase-2--hilarious-treacle-096169.netlify.app/](https://phase-2--hilarious-treacle-096169.netlify.app/)

Previous **production** version (on Provide Netlify):
[https://chimerical-baklava-ad903f.netlify.app](https://chimerical-baklava-ad903f.netlify.app)

## Developing

Once you've created a project and installed dependencies with `pnpm install` , start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tabb
npm run dev -- --open
```

## Building

To build the website you will need to create a `.env` file with the environment variables listed in issue [#298](https://github.com/jnsprnw/provide/issues/298).

The current Node version used is `21.4.0.`.

To create a production version of your app:

```bash
npm run build
```

## Styling

Styling and css happens mainly via tailwind. Color values however (maybe other values in the future as well?) come directly from figma. This happens via the [Export/Import Variables plugin](https://www.figma.com/community/plugin/1256972111705530093/Export%2FImport-Variables). For the moment only the "color-tokens" collection is exportet. It has to be stored in `/design-tokens/00_input/color-tokens.json`. To transform the tokens into a useable format run `pnpm run build` inside the `design-tokens` folder. This will create a new file `/src/styles/color-tokens-light.json`. This file is then used by `tailwind.config.cjs` as well as `ThemeProvider.svelte` to provide the correct color values across the application.

## Naming convention

Files containing svelte components have a camel case name starting with an uppercase letter

Other files have a kebap case name

Folders that contain one primary svelte component are named after this component e.g. `LineChart/LineChart.svelte`. Other components and files can be in the same folder but they are normally not used directly from the outside but are only used by the primary component.

Folders containing multiple components or other files get a kebap case name e.g. `explore-impacts/`.

These naming rules don't apply to the `routes` folder.
