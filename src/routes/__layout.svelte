<script>
  import ThemeProvider from '../styles/ThemeProvider.svelte';
  import '../styles/app.scss';
  import { page } from '$app/stores';
  import ListLink from '$lib/helper/ListLink.svelte';
  import Banner from '$lib/helper/Banner.svelte';

  const url = 'https://climate-risk-dashboard.climateanalytics.org/';
  const author =
    'PROVIDE consortium under direction of Climate Analytics with Jonas Parnow and Flavio Gortana';
  const keywords =
    'climate impacts,climate change,climate modelling,climate scenarios,local impacts,temperature overshoot, adaptation, emissions pathways';
  const description =
    'Explore future impacts from climate change as the world warms.';
  const title = 'Climate Risk Dashboard — PROVIDE';

  $: currentPath = $page.routeId || '';
</script>

<svelte:head>
  <link rel="canonical" href="{url}/" />
  <meta name="author" content={author} />
  <meta name="description" content={description} />
  <meta name="news_keywords" content={keywords} />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <meta name="robots" content="max-image-preview:large" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={author} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content="/og-image_landscape.png" />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:title" content={title} />

  <meta property="og:description" content={description} />
  <meta property="og:image" content="{url}/og-image_landscape.png" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={url} />
</svelte:head>

<ThemeProvider>
  <Banner />
  <nav class="page-menu container">
    <div class="wrapper grid">
      <h1 class="site-logo">Provide<span class="beta-badge">Beta</span></h1>
      <ul class="menu-main">
        <ListLink {currentPath} link="">Home</ListLink>
        <ListLink {currentPath} link="explore/impacts" startsWith={true}>
          Explore
        </ListLink>
        <ListLink {currentPath} link="about">About</ListLink>
        <ListLink {currentPath} link="methodology">Methodology</ListLink>
        <ListLink {currentPath} link="glossary">Glossary</ListLink>
        <ListLink {currentPath} link="contact">Contact</ListLink>
      </ul>
    </div>
  </nav>
  <main class="page-main container">
    <slot />
  </main>
  <footer class="page-footer container">
    <div class="wrapper grid">
      <div class="page-author">
        <strong class="page-name">Provide</strong>
        <span>Climate Analytics 2022</span>
      </div>
      <nav class="page-sitemap">
        <ul>
          <li><a href="/about" {currentPath}>About</a></li>
          <li><a href="/methodology" {currentPath}>Methodology</a></li>
          <li><a href="/glossary" {currentPath}>Glossary</a></li>
          <li><a href="/contact" {currentPath}>Contact</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</ThemeProvider>

<style lang="scss">
  .page-menu {
    background-color: var(--color-background-stronger);
    width: 100vw;
    padding: var(--space-xl);

    .wrapper {
      align-items: center; // Vertical center the menu
      gap: var(--space-xxl);
      grid-template-columns: auto 1fr;
      padding-bottom: var(--space-xl);
      border-bottom: 1px solid var(--color-foreground-weaker);

      h1 {
        font-weight: var(--font-weight-extrabold);
        text-transform: uppercase;
        color: var(--color-brand-stronger);
        // color: var(--color-background-base);
      }
    }

    .menu-main {
      display: flex;
      gap: var(--space-m);
      white-space: nowrap;
    }

    .site-logo {
      position: relative;
    }

    .beta-badge {
      font-size: var(--font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: var(--color-functional-warn);
      vertical-align: super;
      display: inline-block;
      line-height: 1em;
      padding: 2px 3px;
      transform: translate(2px, -2px);
    }
  }

  .page-footer {
    margin: var(--space-xxxl) 0 var(--space-xl);
    padding-top: var(--space-xxl);
    padding-bottom: var(--space-xl);
    border-top: 1px solid var(--color-foreground-weakest); // TODO

    .page-author {
      grid-column: 1 / span 8;

      & > * {
        display: block;
      }
    }

    .page-sitemap {
      grid-column: 9 / span 4;

      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: var(--font-size-xs); // TODO
      }

      a {
        color: var(--color-text-base);
      }
    }

    .page-name {
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
</style>
