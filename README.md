# Provide project

Live **development** version: [`https://stellular-kashata-43537c.netlify.app/explore/impacts`](https://stellular-kashata-43537c.netlify.app/explore/impacts).

Live **production** version: [`https://sparkling-palmier-e94c2b.netlify.app/`](https://sparkling-palmier-e94c2b.netlify.app/).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Naming convention

Files containing svelte components have a camel case name starting with an uppercase letter

Other files have a kebap case name

Folders that contain one primary svelte component are named after this component e.g. `LineChart/LineChart.svelte`. Other components and files can be in the same folder but they are normally not used directly from the outside but are only used by the primary component.

Folders containing multiple components or other files get a kebap case name e.g. `explore-impacts/`.

These naming rules don't apply to the `routes` folder.
