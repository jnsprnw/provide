import { sveltekit } from '@sveltejs/kit/vite';

//import removeConsole from "vite-plugin-svelte-console-remover";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
  },
};

export default config;
