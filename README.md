# PROVIDE Climate Risk Dashboard

## Table of Contents

- [Links](#links)
- [Project Overview](#project-overview)
- [File Structure](#file-structure)
- [Configuration](#configuration)
- [Pages](#pages)
- [Components](#components)
- [Styling](#styling)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The PROVIDE Climate Risk Dashboard is a web application that allows users to explore future impacts of climate change as the world warms. It provides visualizations and data on various climate scenarios, impacts, and adaptation strategies.

## Links

Current **development** version 2.3 (on Provide Netlify):
[https://phase-2-3--hilarious-treacle-096169.netlify.app/explore/impacts](https://phase-2-3--hilarious-treacle-096169.netlify.app/explore/impacts)

Previous **development** version 2.0 (on Provide Netliy):
[https://phase-2--hilarious-treacle-096169.netlify.app/](https://phase-2--hilarious-treacle-096169.netlify.app/)

Previous **production** version (on Provide Netlify):
[https://chimerical-baklava-ad903f.netlify.app](https://chimerical-baklava-ad903f.netlify.app)

## Application Structure

The whole application for this website consists of these parts:

1. The front facing website, which build with SvelteKit and Tailwind CSS and hosted in this repository.
2. The backend API providing the data, which is build in Python and hosted by Climate Analytics.
3. The content of the text pages, the description of scenarios and sectors and the stories are stored in Strapi.
4. A script for screenshotting the graphs is also running on a separate server.

### Content

Most text content is stored in Strapi. The content is fetched via the Strapi API ([`loadFromStrapi`](src/lib/utils/apis.js)) and displayed on the website. The content is stored in the following collections:

1. Case Studies
2. FAQ
3. Glossary
4. Indicators
5. Scenarios
6. Sceanario Presets
7. Stories
8. Videos
9. About page
10. Adaptation page
11. Case Study Outro
12. Contact page
13. Disclaimer
14. Issue list
15. Methodology
16. Technical documentation

The content is either fetched as meta data ([`loadMetaData`](src/lib/utils/apis.js)) or as full content ([`loadFromStrapi`](src/lib/utils/apis.js)).

### Data

The scenario data is fetched from the Climate Analytics API ([`loadFromAPI`](src/lib/utils/apis.js)). The documentation of the different endpoints can be found in the following issues:

- [API endpoints](https://github.com/jnsprnw/provide/issues/12)
- [/impact-time](https://github.com/jnsprnw/provide/issues/72)
- [/impact-geo](https://github.com/jnsprnw/provide/issues/74)
- [/geo-shape](https://github.com/jnsprnw/provide/issues/75)
- [/unavoidable-risk](https://github.com/jnsprnw/provide/issues/76)
- [/meta](https://github.com/jnsprnw/provide/issues/89)
- [/avoiding-impacts](https://github.com/jnsprnw/provide/issues/202)
- [/avoiding-reference](https://github.com/jnsprnw/provide/issues/234)

## File Structure

The most important files and folders are:

```md
project-root/
│
├── src/
│ ├── routes/
│ │ ├── (default)/ # The main pages of the website
│ │ │ ├── about/
│ │ │ ├── adaptation/
│ │ │ ├── contact/
│ │ │ ├── impacts/
│ │ │ ├── keyconcepts/
│ │ │ ├── landing-page/
│ │ │ └── methodology/
│ │ └── +page.svelte # The landing page
│ │ └── +layout.server.js # Meta data is loaded here so that it is available on all pages
│ │ ├── (embed)/ # This is used for screenshots. This layout leaves out the header and footer and only displays the graph.
│ ├── lib/
│ │ ├── charts/ # All the components that are used for the charts
│ │ ├── MapboxMap/ # Components for the map
│ │ ├── helper/ # Smaller components that are used multiple times somewhere on the site
│ │ ├── controls/ # Smaller components like select, radio buttons, and checkboxes
│ │ ├── site/ # Components like the header, footer, and the sidebar
│ │ └── utils/ # Smaller dunctions that are used multiple times
│ │ └── workers/ # The masking of the maps is happening in a Web Worker
│ │ └── api/ # Functions that are used to fetch data from the API and Strapi
│ ├── stores/
│ │ ├── meta.js # States for the meta data
│ │ └── state.js # States like the selected scenario, indicator, and region
│ ├── styles/ # Design tokens coming from Figma and other styling
│ ├── config.js # Global configuration settings
├── static/ # Static files like the favicon, fonts, preview image and PDFs.
├── tailwind.config.cjs # Style configuration
├── package.json # Libraries used in this repository
```

## Technical aspects

The page is build in JavaScript/TypeScript with [Svelte](https://svelte.dev/) 4 using [SvelteKit](https://svelte.dev/docs/kit/introduction). The underlying engine is [Bun](https://bun.sh/). It uses [Tailwind CSS](https://tailwindcss.com/) for styling. The page is hosted on [Netlify](https://www.netlify.com/) while in development and on [Climate Analytics](https://climateanalytics.org/) in production. Maps are created using [Mapbox](https://www.mapbox.com/) and Charts are craeted using [D3](https://d3js.org/) and [Layercake](https://layercake.graphics/) for the charts.

## Configuration

The main configuration files include:

- [`src/config.js`](src/config.js): Contains global configuration settings.
- `.env`: Stores environment variables (not included in the repository). The documentation for the environment variables can be found in the [Environment variables issue](https://github.com/jnsprnw/provide/issues/298)
- [`tailwind.config.cjs`](tailwind.config.cjs): Configures Tailwind CSS. Note that we also use design tokens imported from Figma. Code for this is located in [`design-tokens`](design-tokens) and [`src/styles`](src/styles).
- [`svelte.config.js`](svelte.config.js): Svelte-specific configuration.

Some configurations are:

1. Aliases for easier imports (defined in [`svelte.config.js`](svelte.config.js)).
2. Adapter configuration for Netlify or static builds (defined in [`svelte.config.js`](svelte.config.js))
3. [Prerendering](https://svelte.dev/docs/kit/page-options#prerender) configuration for specific routes.
4. Custom Tailwind CSS extensions for colors, fonts, and other utilities (defined in [`tailwind.config.cjs`](tailwind.config.cjs))

## Pages

The main pages of the application include:

1. Home (`/`): Landing page with an overview of the dashboard.
2. Explore (`/impacts/explore`): Allows users to explore future climate impacts, by first selecting a scenario and then exploring matching impacts.
3. Avoid (`/impacts/avoid`): Focuses on avoiding future climate impacts, by first selecting an impact level and then exploring matching scenarios
4. Adaptation (`/adaptation`): Provides information on climate adaptation strategies, by giving three case studies from Nassau, Lisbon and Islamabad.
5. Methodology (`/methodology`): Details the methodology and models used on the page. The models for each data type are explained in detail.
6. Key Concepts (`/keyconcepts`): Explains important terms and concepts used in the dashboard.
7. About (`/about`): Provides information about the project and its contributors.
8. Contact (`/contact`): Contains contact information and a form for user feedback.

## Styling

The project uses Tailwind CSS for styling, with custom configurations:

1. Custom color tokens are imported from Figma using a build script in the `design-tokens` folder. See further down for details.
2. The main styling file is `src/styles/app.postcss`.
3. A `ThemeProvider` component manages theme-related styling.
4. Custom Tailwind plugins and extensions are defined in `tailwind.config.cjs`.

### Design Tokens

Color values however come directly from Figma. This happens via the [Export/Import Variables plugin](https://www.figma.com/community/plugin/1256972111705530093/Export%2FImport-Variables). For the moment only the `color-tokens` collection is exportet. It has to be stored in `/design-tokens/00_input/color-tokens.json`. To transform the tokens into a useable format run `pnpm run build` inside the `design-tokens` folder. This will create a new file `/src/styles/color-tokens-light.json`. This file is then used by `tailwind.config.cjs` as well as `ThemeProvider.svelte` to provide the correct color values across the application.

## State

The most important state management is done in [`src/stores/state.js`](src/stores/state.js). The store is used to determine the available geographies, indicators, scenarios and other parameters based on the user’s input.

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Set up environment variables:

   - Create a `.env` file with the required variables (see issue [#298](https://github.com/jnsprnw/provide/issues/298) for details)

4. Run the development server:
   ```
   bun run dev
   ```
5. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

6. To build the project for production:
   ```
   bun run build
   ```

## Naming convention

- Files containing svelte components have a camel case name starting with an uppercase letter
- Other files have a kebap case name
- Folders that contain one primary svelte component are named after this component e.g. `LineChart/LineChart.svelte`. Other components and files can be in the same folder but they are normally not used directly from the outside but are only used by the primary component.
- Folders containing multiple components or other files get a kebap case name e.g. `explore-impacts/`.
- These naming rules don't apply to the `routes` folder.
