import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';
import preprocess from 'svelte-preprocess';
import adapterNetlify from '@sveltejs/adapter-netlify';
import adapterStatic from '@sveltejs/adapter-static';
const isStatic = process.env.BUILD_ENV === 'static';
const adapter = isStatic ? adapterStatic : adapterNetlify;

/** @type {import('@sveltejs/kit').Config}*/
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
      $routes: 'src/routes',
      $workers: 'src/lib/workers',
      $formatting: 'src/lib/utils/formatting.js',
    },
    adapter: adapter(),
    version: {
      name: process.env.npm_package_version,
    },
    prerender: {
      handleMissingId: 'warn',
      entries: ['/', '/about', '/adaptation', '/contact', '/impacts/avoid', '/impacts/explore', '/keyconcepts', '/methodology', '/embed/impact-time', '/embed/impact-geo', '/embed/unavoidable-risk'],
    },
  },
  preprocess: sequence([
    preprocess({
      postcss: true,
    }),
    preprocessMeltUI(),
  ]),
};
export default config;
