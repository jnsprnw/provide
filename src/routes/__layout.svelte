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
        <ListLink {currentPath} link="explore" startsWith={true}>Explore</ListLink>
        <ListLink {currentPath} link="about">About</ListLink>
        <ListLink {currentPath} link="faq">FAQ</ListLink>
        <ListLink {currentPath} link="methodology">Methodology</ListLink>
      </ul>
    </div>
  </nav>
  {#if currentPath.startsWith('explore')}
  <nav class="explore-menu container">
    <div class="wrapper">
      <span class="explore-caption">Explore</span>
      <ul>
        <ListLink {currentPath} link="explore/impacts" loc="location" type="primary">
          <h2 class="explore-title">Explore Impacts</h2>
          <span class="explore-subtitle">Select scenarios and explore impacts</span>
        </ListLink>
        <ListLink {currentPath} link="explore/scenarios" loc="location" disabled={true} type="primary">
          <h2>Explore Scenarios</h2>
          <span>Set an impact threshold and explore scenarios</span>
        </ListLink>
      </ul>
    </div>
  </nav>
  {/if}
  <main class="page-main container">
    <slot />
  </main>
</ThemeProvider>

<style lang="scss">
  @import "../styles/global.scss";

  .explore-caption {
    font-size: var(--font-size-large-s);
    text-transform: var(--font-text-case-uppercase);
    letter-spacing: var(--font-letter-spacing-looser);
    color: var(--color-light-blue600);
  }

  .explore-title {
    font-size: var(--font-size-large-xl);
    font-weight: var(--font-font-weight-bold);
  }

  .explore-subtitle {
    font-size: var(--font-size-large-m);
    line-height: var(--font-line-height-tightest);
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

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

  .explore-menu {
    padding-top: 2rem; // TODO
    background-color: var(--color-light-blue100);

    ul {
      display: flex;
      gap: var(--font-size-large-l);
    }
  }

  // .page-main {
  //   padding-top: 2rem; // TODO
  // }

  .explore-menu {
    .wrapper {
      border-bottom: 1px solid var(--color-light-blue300); // TODO
    }
  }
</style>
