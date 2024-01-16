<script>
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
  import { generatePageTitle } from '$utils/meta.js';
  const url = 'https://climate-risk-dashboard.climateanalytics.org/';
  const author = 'PROVIDE consortium under direction of Climate Analytics with Jonas Parnow and Flavio Gortana';
  const keywords = 'climate impacts,climate change,climate modelling,climate scenarios,local impacts,temperature overshoot, adaptation, emissions pathways';
  const description = 'Explore future impacts from climate change as the world warms.';
  $: title = $page.data.title ?? generatePageTitle();
  const isPublic = import.meta.env.VITE_IS_PUBLIC_VERSION;
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  <meta name="author" content={author} />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  {#if isPublic}
    <meta name="robots" content="noimageindex" />
  {:else}
    <meta name="robots" content="none, noimageindex, noarchive" />
  {/if}

  {#if !dev}
    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="04f9b973-92eb-4fac-89e0-6d1885d5282b" data-blockingmode="auto" type="text/javascript"></script>
  {/if}

  <meta name="robots" content="max-image-preview:large" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={author} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content="/og-image_landscape.png" />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:title" content={title} />

  <meta property="og:description" content={description} />
  <meta property="og:image" content="/og-image_landscape.png" />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={url} />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
</svelte:head>
