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
  <main class="page-main container">
    <slot />
  </main>
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

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
