import preprocess from 'svelte-preprocess';

import adapterNetlify from '@sveltejs/adapter-netlify';
import adapterStatic from '@sveltejs/adapter-static';

const isStatic = process.env.BUILD_ENV === 'static';
const adapter = isStatic ? adapterStatic : adapterNetlify;

console.log(
  `VITE_MAPBOX_ACCESS_TOKEN: ${process.env.VITE_MAPBOX_ACCESS_TOKEN}\n`,
  `VITE_MAPBOX_STYLE_LIGHT: ${process.env.VITE_MAPBOX_STYLE_LIGHT}\n`,
  `VITE_DATA_API_URL: ${process.env.VITE_DATA_API_URL}\n`,
  `VITE_STRAPI_LOCALE: ${process.env.VITE_STRAPI_LOCALE}\n`,
  `VITE_HEROKU_URL: ${process.env.VITE_HEROKU_URL}\n`,
  `VITE_SCREENSHOT_URL: ${process.env.VITE_SCREENSHOT_URL}\n`,
  `VITE_APP_URL: ${process.env.VITE_APP_URL}\n`
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
