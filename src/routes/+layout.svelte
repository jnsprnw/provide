<script>
  import '$styles/app.postcss';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
  import Header from '$lib/site/Header.svelte';
  import Banner from '$lib/site/Banner.svelte';
  import HtmlHead from '$lib/site/HtmlHead.svelte';
  import Footer from '$lib/site/Footer.svelte';
</script>

<HtmlHead />

<ThemeProvider>
  <!-- <Banner /> -->
  <Header />
  <main class="page-main container">
    <slot />
  </main>
  <Footer />
</ThemeProvider>

<style lang="postcss">
  .page-menu {
    width: 100vw;
    padding: var(--space-xl);
  }

  .wrapper {
    align-items: center;
    gap: var(--space-xxl);
    grid-template-columns: auto 1fr;
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-foreground-weaker);

    h1 {
      font-weight: var(--font-weight-extrabold);
      text-transform: uppercase;
      color: var(--color-brand-stronger);
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

  .page-footer {
    margin: var(--space-xxxl) 0 var(--space-xl);
    padding-top: var(--space-xxl);
    padding-bottom: var(--space-xl);
    border-top: 1px solid var(--color-foreground-weakest);

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
        grid-gap: var(--font-size-xs);
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
