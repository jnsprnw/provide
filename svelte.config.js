import adapterNetlify from '@sveltejs/adapter-netlify';
import adapterStatic from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';
import { sequence } from './sequence.js';
import importAssets from 'svelte-preprocess-import-assets';

// sequence([sveltePreprocess(), importAssets()]),

const isStatic = process.env.BUILD_ENV === 'static';
const adapter = isStatic ? adapterStatic : adapterNetlify;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      default: isStatic,
    },
    vite: {
      experimental: {
        useVitePreprocess: true,
      },

      resolve: {
        alias: {
          $lib: path.resolve('./src/lib'),
          $stores: path.resolve('./src/stores'),
          $styles: path.resolve('./src/styles'),
          $helper: path.resolve('./src/lib/helper'),
        },
      },
    },
  },
};

export default config;
