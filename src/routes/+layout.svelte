<script>
  import '$styles/app.postcss';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
  import Header from '$lib/site/Header.svelte';
  import HtmlHead from '$lib/site/HtmlHead.svelte';
  import Footer from '$lib/site/Footer.svelte';
  import { page } from '$app/stores';
  import _ from 'lodash';

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\{=(.+?)\}\}/g,
  };

  $: isEmbed = $page.route.id.startsWith('/embed');
</script>

<HtmlHead />

<ThemeProvider>
  {#if !isEmbed}<Header />{/if}
  <main>
    <slot />
  </main>
  {#if !isEmbed}<Footer />{/if}
</ThemeProvider>
