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
      <ul>
        <ListLink {currentPath} link="explore/impacts" loc="location">
          <h2>Explore Impacts</h2>
          <span>Select scenarios and explore impacts</span>
        </ListLink>
        <ListLink {currentPath} link="explore/scenarios" loc="location" disabled={true}>
          <h2>Explore Scenarios</h2>
          <span>Set an impact threshold and explore scenarios</span>
        </ListLink>
      </ul>
    </div>
  </nav>
  {/if}
  <main class="page-main container">
    <div class="wrapper">
      <slot />
    </div>
  </main>
</ThemeProvider>

<style lang="scss">
  @import "../styles/global.scss";

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .page-menu {
    background-color: blue; // TODO
    width: 100vw;

    .wrapper {
      align-items: center; // Vertical center the menu
    }

    .menu-main {
      display: flex;
      gap: 1rem; // TODO
    }
  }

  .explore-menu {
    margin-top: 2rem; // TODO

    ul {
      display: flex;
      gap: 1rem; // TODO
    }
  }

  .page-main {
    margin-top: 2rem; // TODO
  }
</style>
