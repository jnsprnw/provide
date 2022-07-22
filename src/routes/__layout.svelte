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
        <ListLink {currentPath} link="faq">FAQ</ListLink>
        <ListLink {currentPath} link="methodology">Methodology</ListLink>
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
  @import "../styles/global.scss";

  .page-menu {
    background-color: var(--color-light-blue700);
    width: 100vw;
    padding: var(--font-size-large-l);

    .wrapper {
      align-items: center; // Vertical center the menu
    }

    .menu-main {
      display: flex;
      gap: var(--font-size-large-l);
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

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
