import { sveltekit } from '@sveltejs/kit/vite';

//import removeConsole from "vite-plugin-svelte-console-remover";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
};

export default config;
