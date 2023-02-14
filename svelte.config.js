import preprocess from 'svelte-preprocess';
// import adapter from "@sveltejs/adapter-auto";
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },

  vitePlugin: {
    experimental: {
      inspector: { toggleKeyCombo: 'alt-shift', holdMode: true },
    },
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
