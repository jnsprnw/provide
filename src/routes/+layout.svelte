<script>
  import '$styles/app.postcss';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
  import Header from '$lib/site/Header.svelte';
  import HtmlHead from '$lib/site/HtmlHead.svelte';
  import Footer from '$lib/site/Footer.svelte';
  import {
    SECTORS,
    INDICATORS,
    GEOGRAPHY_TYPES,
    GEOGRAPHIES,
    SCENARIOS,
    INDICATOR_PARAMETERS,
    UNITS,
  } from '$stores/meta.js';
  import { page } from '$app/stores';
  import _ from 'lodash';

  export let data;

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\{=(.+?)\}\}/g,
  };

  const { meta } = data;

  GEOGRAPHIES.set(meta);
  INDICATORS.set(meta);
  SCENARIOS.set(meta.scenarios);
  UNITS.set(meta.units);

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
