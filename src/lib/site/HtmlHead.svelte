<script>
  import { page } from '$app/stores';
  import { generatePageTitle } from '$utils/meta.js';
  import { IS_STAGING_VERSION } from '$src/config.js';
  const url = 'https://climate-risk-dashboard.climateanalytics.org/';
  const author =
    'PROVIDE consortium under direction of Climate Analytics with Jonas Parnow and Flavio Gortana';
  const keywords =
    'climate impacts,climate change,climate modelling,climate scenarios,local impacts,temperature overshoot, adaptation, emissions pathways';
  const description =
    'Explore future impacts from climate change as the world warms.';
  $: title = $page.data.title ?? generatePageTitle();
</script>

<svelte:head>
  <title>{ title }</title>
  <link rel="canonical" href="{url}/" />
  <meta name="author" content={author} />
  <meta name="description" content={description} />
  <meta name="news_keywords" content={keywords} />

  {#if IS_STAGING_VERSION}<meta name="robots" content="none, noimageindex, noarchive">{/if}

  <meta name="robots" content="max-image-preview:large" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={author} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content="/og-image_landscape.png" />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:title" content={title} />

  <meta property="og:description" content={description} />
  <meta property="og:image" content="/og-image_landscape.png" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={url} />
</svelte:head>
