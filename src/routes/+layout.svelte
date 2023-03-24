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

  export let data;

  const { meta } = data;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
  GEOGRAPHIES.set(meta);
  INDICATORS.set(meta);
  SECTORS.set(meta.sectors);
  SCENARIOS.set(meta.scenarios);
  INDICATOR_PARAMETERS.set(meta.indicatorParameters);
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
