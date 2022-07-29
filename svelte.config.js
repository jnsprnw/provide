import adapter from "@sveltejs/adapter-netlify";
import sveltePreprocess from "svelte-preprocess";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $lib: path.resolve("./src/lib"),
          $stores: path.resolve("./src/stores"),
        },
      },
    },
  },
};

export default config;
