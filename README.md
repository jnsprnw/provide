# Provide project

## Links

Current **development** version 2.3 (on Provide Netlify):
[https://phase-2-3--hilarious-treacle-096169.netlify.app/explore/impacts](https://phase-2-3--hilarious-treacle-096169.netlify.app/explore/impacts)

Previous **development** version 2.0 (on Provide Netliy):
[https://phase-2--hilarious-treacle-096169.netlify.app/](https://phase-2--hilarious-treacle-096169.netlify.app/)

Previous **production** version (on Provide Netlify):
[https://chimerical-baklava-ad903f.netlify.app](https://chimerical-baklava-ad903f.netlify.app)

### Old versions

Live **development** version: [`https://stellular-kashata-43537c.netlify.app/explore/impacts`](https://stellular-kashata-43537c.netlify.app/explore/impacts).

Live **production** version: [`https://sparkling-palmier-e94c2b.netlify.app/`](https://sparkling-palmier-e94c2b.netlify.app/).

Live **staging** version: [`https://sprightly-lolly-2c7b5a.netlify.app`](https://sprightly-lolly-2c7b5a.netlify.app).

## Developing

Once you've created a project and installed dependencies with `pnpm install` , start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tabb
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Styling

Styling and css happens mainly via tailwind. Color values however (maybe other values in the future as well?) come directly from figma. This happens via the [Export/Import Variables plugin](https://www.figma.com/community/plugin/1256972111705530093/Export%2FImport-Variables). For the moment only the "color-tokens" collection is exportet. It has to be stored in `/design-tokens/00_input/color-tokens.json`. To transform the tokens into a useable format run `pnpm run build` inside the `design-tokens` folder. This will create a new file `/src/styles/color-tokens-light.json`. This file is then used by `tailwind.config.cjs` as well as `ThemeProvider.svelte` to provide the correct color values across the application.

## Naming convention

Files containing svelte components have a camel case name starting with an uppercase letter

Other files have a kebap case name

Folders that contain one primary svelte component are named after this component e.g. `LineChart/LineChart.svelte`. Other components and files can be in the same folder but they are normally not used directly from the outside but are only used by the primary component.

Folders containing multiple components or other files get a kebap case name e.g. `explore-impacts/`.

These naming rules don't apply to the `routes` folder.

## Folder structure

```
data // Temporäre Datenablage
  impact-time.json
  emojis-countries.json

lib
  api
  explore-impacts //Components für die Explore-Impacts Seite
  utils
  helper //Allgemeine Components. Z.B. Tabs und Icons
  faq //Components für die FAQ-Seite

routes //Einzelne Seiten
  api //SvelteKit API Anfragen für einzelne Seiten
  explore
  impacts
  scenarios

stores
  store.js //Allgemeiner Store
  meta.js //Store für alle Meta daten
store-utilities.js //Funktionen für den Storer
```

## restart metadata test niklas
