import preprocess from 'svelte-preprocess';

import adapterNetlify from '@sveltejs/adapter-netlify';
import adapterStatic from '@sveltejs/adapter-static';

const isStatic = process.env.BUILD_ENV === 'static';
const adapter = isStatic ? adapterStatic : adapterNetlify;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      $src: 'src',
      $config: 'src/config.js',
      $styles: 'src/styles',
      $lib: 'src/lib',
      $utils: 'src/lib/utils',
      $stores: 'src/stores',
      $helper: 'src/lib/helper',
      $routes: 'src/routes'
    },
    adapter: adapter(),
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
