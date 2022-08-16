<script>
  import ThemeProvider from "../styles/ThemeProvider.svelte";
  import "../styles/app.scss";
  import { page } from '$app/stores';
  import ListLink from "$lib/helper/ListLink.svelte";

  $: currentPath = $page.routeId || '';
</script>

<ThemeProvider>
  <nav class="page-menu container">
    <div class="wrapper grid">
      <h1>Provide</h1>
      <ul class="menu-main">
        <ListLink {currentPath} link="">Home</ListLink>
        <ListLink {currentPath} link="explore/impacts" startsWith={true}>Explore</ListLink>
        <ListLink {currentPath} link="about">About</ListLink>
        <ListLink {currentPath} link="technical-documentation">Technical Documentation</ListLink>
        <ListLink {currentPath} link="contact-imprint">Contact and Imprint</ListLink>
      </ul>
    </div>
  </nav>
  <main class="page-main container">
    <slot />
  </main>
  <footer class="page-footer container">
    <div class="wrapper grid">
      <div class="page-author">
        <strong>Provide</strong>
        <span>Climate Analytics 2022</span>
      </div>
      <nav class="page-sitemap">
        <ul>
          <li>FAQ</li>
          <li>Glossary</li>
          <li>Methodology</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  </footer>
</ThemeProvider>

<style lang="scss">
  .page-menu {
    // background-color: var(--color-light-brand-stronger);
    background-color: var(--color-light-blue100);
    width: 100vw;
    padding: var(--size-space-large-xl);

    .wrapper {
      align-items: center; // Vertical center the menu
      gap: var(--size-space-large-xxl);
      grid-template-columns: auto 1fr;
      padding-bottom: var(--size-space-large-xl);
      border-bottom: 1px solid var(--color-light-blue200);

      h1 {
        font-weight: var(--font-weight-extrabold);
        text-transform: uppercase;
        color: var(--color-light-brand-stronger);
        // color: var(--color-light-background-base);
      }
    }

    .menu-main {
      display: flex;
      gap: var(--size-space-large-m);
      white-space: nowrap;
    }
  }

  .page-footer {
    margin: var(--font-size-large-xxl) 0; // TODO
    padding-top: var(--font-size-large-xxl);
    border-top: 1px solid var(--color-light-blue300); // TODO

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
        grid-gap: var(--font-size-large-xs); // TODO
      }
    }
  }
</style>
