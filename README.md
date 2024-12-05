# PROVIDE project

The PROVIDE project is working to build an interactive web tool that displays the impacts of exceeding a 1.5°C temperature threshold on human activities and industries. Built for everyday users and adaptation practitioners alike, the PROVIDE Climate Services Dashboard uses high-resolution modelling on a variety of spatial scales, allowing climate impacts to be explored under different global warming scenarios. The goal of the project is to allow risk thresholds to be the starting point for adaptation planning.

Find more information about the project on the Climate Analytics website:
[https://climateanalytics.org/projects/provide](https://climateanalytics.org/projects/provide)

## PROVIDE Climate Risk Dashboard

The PROVIDE Climate Risk Dashboard is a web application that allows users to explore future impacts of climate change as the world warms. It provides visualizations and data on various climate scenarios, impacts, and adaptation strategies.

## Table of Contents

- [Application Structure](#application-structure)
- [Technology stack of the website](#technology-stack-of-the-website)
- [Content](#content)
- [Data](#data)
- [File Structure](#file-structure)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
- [Pages](#pages)
- [Styling](#styling)
  - [Design Tokens](#design-tokens)
- [State](#state)
- [Concepts](#concepts)
- [Getting Started](#getting-started)
- [Naming convention](#naming-convention)

## Application Structure

The complete application for this website consists of the following components:

1. **The Frontend of the Website**: Built with [SvelteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/), and hosted in this repository.
2. **The Backend API**: Provides the necessary data and is built in [Python](https://www.python.org/). It is hosted by [Climate Analytics](https://climateanalytics.org/).
3. **Content Management**: Text content for the pages, scenario and sector descriptions, and stories are managed in [Strapi](https://strapi.io/), and hosted in [this repository](https://github.com/jnsprnw/provide-cms). It is deployed on [Heroku](https://www.heroku.com/).
4. **Screenshot Script**: A script (utilising [Puppeteer](https://pptr.dev/)) for capturing screenshots of the graphs runs on a separate server. It is hosted in [this repository](https://gitlab.com/climateanalytics/webtools/plotting-puppeteer).

## Technology stack of the website

The page is build in JavaScript/TypeScript with [Svelte](https://svelte.dev/) 4 using [SvelteKit](https://svelte.dev/docs/kit/introduction). The underlying engine is [Bun](https://bun.sh/). It uses [Tailwind CSS](https://tailwindcss.com/) for styling. The page is hosted on [Netlify](https://www.netlify.com/) while in development and on [Climate Analytics](https://climateanalytics.org/) in production. Maps are created using [Mapbox](https://www.mapbox.com/) and Charts are craeted using [D3](https://d3js.org/) and [Layercake](https://layercake.graphics/) for the charts.

### Content

Most text content is stored in [Strapi](https://strapi.io/). The content is fetched via the Strapi API ([`loadFromStrapi`](src/lib/utils/apis.js)) and displayed on the website. The content is stored in the following collections:

1. Case Studies (used on the Adaptation page)
2. Glossary (used on the Methodology page)
3. Indicators (descriptions of the indicators coming from the API, linked via the indicator ID)
4. Scenarios (descriptions of the scenarios coming from the API, linked via the scenario ID)
5. Sceanario Presets (used in the scenario selection on the Key Concepts page)
6. Stories (on the lading page)
7. Videos (on the landing page)
8. About page (used on the About page)
9. Adaptation page (used on the Adaptation intro page)
10. Case Study Outro (used on the Adaptation page)
11. Contact page
12. Disclaimer
13. ~~Issue list~~ (no longer used)
14. Methodology
15. Technical documentation

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
│ │ ├── MapboxMap/ # Components for the maps
│ │ ├── helper/ # Smaller components that are used multiple times somewhere on the site
│ │ ├── controls/ # Smaller components like select, radio buttons, and checkboxes
│ │ ├── site/ # Components like the header, footer, and the sidebar
│ │ └── utils/ # Smaller functions that are used multiple times
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

## Configuration

The main configuration files include:

- [`src/config.js`](src/config.js): Contains global configuration settings.
- `.env`: Stores environment variables (not included in the repository). The documentation for the environment variables can be found in the [Environment variables issue](https://github.com/jnsprnw/provide/issues/298)
- [`tailwind.config.cjs`](tailwind.config.cjs): Configures Tailwind CSS. Note that we also use design tokens imported from Figma. Code for this is located in [`design-tokens`](design-tokens) and [`src/styles`](src/styles).
- [`svelte.config.js`](svelte.config.js): Svelte-specific configuration.

Some configurations are:

1. Aliases for easier imports (defined in [`svelte.config.js`](svelte.config.js)).
2. Adapter configuration for [Netlify](https://www.npmjs.com/package/@sveltejs/adapter-netlify) or [static](https://www.npmjs.com/package/@sveltejs/adapter-static) builds (defined in [`svelte.config.js`](svelte.config.js))
3. [Prerendering](https://svelte.dev/docs/kit/page-options#prerender) configuration for specific routes.
4. Custom Tailwind CSS extensions for colors, fonts, and other utilities (defined in [`tailwind.config.cjs`](tailwind.config.cjs))

### Environment variables

| Variable                          | Description                                    | Value                                                 |
| --------------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| VITE_HEROKU_URL                   | URL of Strapi                                  | `https://….herokuapp.com`                             |
| VITE_DATA_API_URL                 | URL of the API                                 | `https://….climateanalytics.org/api`                  |
| VITE_STRAPI_LOCALE                | We use this as version control for the content | `en-EU`                                               |
| VITE_MAPBOX_ACCESS_TOKEN          | Access token for Mapbox                        | `pk.ey…`                                              |
| VITE_MAPBOX_STYLE_LIGHT           | Style for the regular map                      | `mapbox://styles/…`                                   |
| VITE_MAPBOX_STYLE_STUDY_LOCATIONS | Style for the study locations map              | `mapbox://styles/…`                                   |
| VITE_SCREENSHOT_URL               | URL of the service running Puppeteer           | `https://….climateanalytics.org/api/…`                |
| VITE_APP_URL                      | The location of the final dashboard            | `https://climate-risk-dashboard.climateanalytics.org` |
| VITE_IS_PUBLIC_VERSION            | Allows robots to crawl the dashboard           | `true\|false`                                         |
| VITE_MAPBOX_STYLE_SATELLITE       | Mapbox style for satellite images              | `mapbox://styles/…`                                   |
| VITE_MAPBOX_STYLE_GLOBE           | Style of the globe                             | `mapbox://styles/…`                                   |

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

## Concepts

1. Rountes located under `(default)` are the main pages of the website. Routes located under `(embed)` are used for screenshots. This layout leaves out the header and footer and only displays the graph. The url of these pages is used by the screenshot script to create the images.
2. There are many dependencies between geographies (and geography regions), indicators, and scenarios. The state is used to determine the selectable geographies, indicators, scenarios and other parameters based on the user’s input.

## Getting Started

The application is run via [Bun](https://bun.sh/). Install Bun globally on your machine.

To run this project locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up [environment variables](#environment-variables):

   - Create a `.env` file with the required variables

4. Run the development server:
   ```bash
   bun run dev
   ```
5. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

6. To build the project for production:
   ```bash
   bun run build
   ```

## Naming convention

- Files containing svelte components have a camel case name starting with an uppercase letter
- Other files have a kebap case name
- Folders that contain one primary svelte component are named after this component e.g. `LineChart/LineChart.svelte`. Other components and files can be in the same folder but they are normally not used directly from the outside but are only used by the primary component.
- Folders containing multiple components or other files get a kebap case name e.g. `explore-impacts/`.
- These naming rules don't apply to the `routes` folder.
