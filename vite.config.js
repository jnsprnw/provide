import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
//import removeConsole from "vite-plugin-svelte-console-remover";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $src: path.resolve('./src'),
      $styles: path.resolve('./src/styles'),
      $lib: path.resolve('./src/lib'),
      $utils: path.resolve('./src/lib/utils'),
      $stores: path.resolve('./src/stores'),
      $helper: path.resolve('./src/lib/helper'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
  },
};

export default config;
